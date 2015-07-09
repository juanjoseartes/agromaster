/**
* DiarioController
*
* @description :: Server-side logic for managing diarios
* @help        :: See http://links.sailsjs.org/docs/controllers
*/

module.exports = {

	create: function(req, res) {
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		//console.log('Params: ' + JSON.stringify(req.allParams()));
		sails.models['tipodiario'].findOne({id: req.param('tipo')})
		.exec(function(error, tipoDia) {
			if (error) return res.negotiate(error);

			var tipoName = tipoDia.name;
			sails.models['partecult'].findOrCreate(
				{fecha: {$gt: d, $lte: hoy}, ejercicio: req.param('ejerc'), tipo: req.param('tipo')},
				{fecha: hoy, ejercicio: req.param('ejerc'), finca: req.param('finca'), tipo: req.param('tipo'), ejercId: req.param('ejerc'), tipoName: tipoName, nparc: 0, totalparc: 0, nmobra: 0, totalmobra: 0, totalmat: 0, nmat: 0, totalmaq: 0, nmaq: 0, totalotros: 0, notros: 0})
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					//console.log('Model Created: ' + JSON.stringify(model));
					sails.models['partecult'].publishCreate(model);
					res.json(model);
				});
		})

		},

		destroy: function(req, res) {
			sails.models['partecult'].destroy({id: req.param('id')})
			.exec(function (err) {
				if (err) return res.negotiate(err);

				sails.models['partecult'].publishDestroy(req.param('id'));
			});
		},

		getTotalbyDate: function(req, res) {
			var ejercicio = req.param('ejerc');
			var tipo = req.param('tipo');
			var hoy = new Date();
			var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);

			//Totalizo en el parte de cultivo los costes de mano de obra
			sails.models['partecult'].find({ejercicio: ejercicio, fecha: {$gt: d, $lte: hoy}})
			.exec(function(error, hoyPartes) {
				if (error) return res.negotiate(error);

				for (var h=0; h<hoyPartes.length; h++) {
					var pCurso = hoyPartes[h].id;
					//console.log('ParteCurso: ' + pCurso);
					sails.models['mocultivo'].find({partecultivo: pCurso})
					.exec(function(error, mobra) {
						if (error) return res.negotiate(error);

						var tMObra = mobra.reduce(function(memo, resp) {
							return memo + (resp.coef*resp.precio)
						}, 0);
						var nMObra = mobra.reduce(function(memo, resp) {
							return memo + resp.coef
						}, 0);
						//console.log('Mobra ParteCult: ' + mobra[0].partecultivo + ' TotalMObra: ' + tMObra + ' nMObra: ' + nMObra);
						if (mobra.length>0) {
							sails.models['partecult'].update({id: mobra[0].partecultivo}, {totalmobra: tMObra, nmobra: nMObra})
							.exec(function(error, parteUpd) {
								if (error) return res.negotiate(error);

								//console.log('ParteUpd: '+ JSON.stringify(parteUpd));
								//sails.models['partecult'].publishUpdate(parteUpd[0].id, parteUpd);
							});
						};


						//Hago el reparto en function de la asignacion de costes de mano de obra anterior
						sails.models['tipodiario'].findOne({name: tipo})
						.exec(function(error, tipo) {
							if (error) return res.negotiate(error);

							var tipoId = tipo.id;
							sails.models['partecult'].findOne({fecha: {$gt: d, $lte: hoy}, ejercicio: ejercicio, tipo: tipoId})
							.exec(function(error, partesHoy) {
								if (error) return res.negotiate(error);
								//console.log('ParteHoy: ' + JSON.stringify(partesHoy));
								var parteCurso = partesHoy.id;
								var totalCurso = partesHoy.totalmobra;
								sails.models['repartocult'].find({partecultivo: parteCurso, tipodiario: tipoId})
								.exec(function(error, reparto) {
									//console.log('Reparto: ' + JSON.stringify(reparto));
									if(error) return res.negotiate(error);

									var totalCurso1 = totalCurso;
									for (var r = 0; r < reparto.length; r++) {
										//console.log('RepartoId: ' + reparto[r].id + ' totalCurso1: ' + totalCurso1+' - '+totalCurso);
										sails.models['repartocult'].update({id: reparto[r].id}, {mobra: (totalCurso1*reparto[r].coef)})
										.exec(function(error, repartoUpdated) {
											if(error) return res.negotiate(error);

											//sails.models['repartocult'].publishUpdate(repartoUpdated.id, repartoUpdated);
										});
									};
								});
							});
						});


					});
				};
			});



		},

		getToday: function(req, res) {

			var ejercicio = req.param('ejerc');
			var tipo = req.param('tipo');
			var hoy = new Date();
			var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);

			if (tipo) {
				sails.models['tipodiario'].findOne({name: tipo})
				.exec(function(error, tipoDia) {
					if (error) return res.negotiate(error);
					//console.log('TipoDiario: ' + tipoDia.id);
					sails.models['partecult'].findOne({fecha: {$gt: d, $lte: hoy}, ejercicio: ejercicio, tipo: tipoDia.id})
					.populate('parcelas')
					.populate('materiales')
					.populate('maquinaria')
					.populate('otros')
					.populate('mobra')
					.exec(function(error, model) {
						if (error) return res.negotiate(error);
						if (!model) {
							return res.json(200, {message: 'Parte no encontrado'});
						};
						sails.models['partecult'].watch(req);
						sails.models['partecult'].subscribe(req.socket, model);
						//console.log('Model: ' + JSON.stringify(model));
						res.json(model);
					});
				});
			} else {
				sails.models['partecult'].find({fecha: {$gt: d, $lte: hoy}, ejercicio: ejercicio})
				.populate('tipo')
				.populate('parcelas')
				.exec(function(error, model) {
					if (error) return res.negotiate(error);

					sails.models['partecult'].watch(req);
					sails.models['partecult'].subscribe(req.socket, model);
					res.json(model);
				});
			}

		},

		findToday: function(req, res) {

			var ejercicio = req.param('ejerc');
			var tipo = req.param('tipo');
			var hoy = new Date();
			var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);

			if (tipo) {
				sails.models['tipodiario'].findOne({name: tipo})
				.exec(function(error, tipoDia) {
					if (error) return res.negotiate(error);

					sails.models['partecult'].find({fecha: {$gt: d, $lte: hoy}, ejercicio: ejercicio, tipo: tipoDia.id})
					.populate('parcelas')
					.populate('materiales')
					.populate('maquinaria')
					.populate('otros')
					.populate('mobra')
					.exec(function(error, model) {
						if (error) return res.negotiate(error);

						sails.models['partecult'].watch(req);
						res.json(model);
					});
				});
			} else {
				sails.models['partecult'].find({fecha: {$gt: d, $lte: hoy}, ejercicio: ejercicio})
				.populate('tipo')
				.populate('parcelas')
				.exec(function(error, model) {
					if (error) return res.negotiate(error);

					sails.models['partecult'].watch(req);
					res.json(model);
				});
			}

		},

		getEjercicio: function(req, res) {

			var ejercicio = req.param('ejerc');
			var tipo = req.param('tipo');

			if (tipo) {
				sails.models['tipodiario'].findOne({name: tipo})
				.exec(function(error, tipoDia) {
					if (error) return res.negotiate(error);

					sails.models['partecult'].find({ejercicio: ejercicio, tipo: tipoDia.id})
					.sort('fecha ASC')
					.exec(function(error, model) {
						if (error) return res.negotiate(error);

						res.json(model);
					});
				});
			} else {
				sails.models['partecult'].find({ejercicio: ejercicio})
				.sort('fecha ASC')
				.populate('tipo')
				.exec(function(error, model) {
					if (error) return res.negotiate(error);

					res.json(model);
				});
			}


		},

		getTotal: function(req, res) {
			var ejerc = req.param('ejerc');

			sails.models['partecult'].native(function(err, collection) {
				if (err) return res.negotiate(err);

				collection.aggregate([
					{
						$match: {ejercId: ejerc}
					},
					{
						$group:
						{
							_id:{name:"$tipoName", tipoId:"$tipo"},
							mobra:{$sum:"$totalmobra"},
							materiales:{$sum:"$totalmat"},
							maquinaria:{$sum:"$totalmaq"},
							otros:{$sum:"$totalotros"}
						}
					}], function(err, result) {
						if (err) return res.negotiate(err);
						//console.log('Result: ' + JSON.stringify(result));
						return res.json(result);
					});

				});
			},

			sumTotales: function(req, res) {
				var ejercicio = req.param('ejerc');

				sails.models['partecult'].find({ejercicio: ejercicio})
				.populate('materiales')
				.populate('maquinaria')
				.populate('otros')
				.exec(function(error, partes) {
					if (error) return res.negotiate(error);

					for (var i = 0; i < partes.length; i++) {
						// var tParcelas = partes[i].parcelas.reduce(function(memo, res) {
						// 	return memo + (res.cantidad*res.precio)
						// }, 0);
						// console.log('tParcelas: ' + tParcelas);
						// var tMobra = partes[i].mobra.reduce(function(memo, res) {
						// 	return memo + (res.cantidad*res.precio)
						// }, 0);
						// console.log('tMobra: ' + tMobra);
						var tMaq = 0;
						for (var j = 0; j < partes[i].maquinaria.length; j++) {
							tMaq += (partes[i].maquinaria[j].cantidad*partes[i].maquinaria[j].precio);
						}
						// var tMaq = partes[i].maquinaria.reduce(function(memo, res) {
						// 	return memo += (res.cantidad*res.precio)
						// }, 0);
						var tMateriales = 0;
						for (var k = 0; k < partes[i].materiales.length; k++) {
							tMateriales += (partes[i].materiales[k].cantidad*partes[i].materiales[k].precio);
						}
						// var tMateriales = partes[i].materiales.reduce(function(memo, res) {
						// 	return memo += (res.cantidad*res.precio)
						// }, 0 );
						var tOtros = 0;
						for (var l = 0; l < partes[i].otros.length; l++) {
							tOtros += (partes[i].otros[l].cantidad*partes[i].otros[l].precio);
						}
						// var tOtros = partes[i].otros.reduce(function(memo, res) {
						// 	console.log('tOtros: ' + (res.cantidad*res.precio));
						// 	return memo += (res.cantidad*res.precio)
						// }, 0);

						var parteId = partes[i].id;

						sails.models['partecult'].update({id: parteId}, {totalmaq: tMaq, totalmat: tMateriales, totalotros: tOtros})
						.exec(function(error) {
							if (error) return res.negotiate(error);
						});
					}
					res.json(200, {message: 'Proceso de recalculo finzalizado'});
				});
			}

		};
