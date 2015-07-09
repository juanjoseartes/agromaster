/**
* sails.models['listempleado']Controller
*
* @description :: Server-side logic for managing listempleadoes
* @help        :: See http://links.sailsjs.org/docs/controllers
*/

module.exports = {

	findToday: function(req, res) {
		var ejerc = req.param('ejerc');
		var tipo = req.param('tipo');
		var finca = req.param('finca');
		var hoy = new Date();
		var fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var ini = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var fin = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);
		//console.log('Hoy: ' + hoy + ' d: ' + d);
		if (tipo == 'cultivo') {
			sails.models['partemo'].findOrCreate(
				{fecha: {$gte: ini, $lte: fin}, ejercicio: ejerc, tipo: tipo},
				{fecha: fecha, ejercicio: ejerc, finca: finca, tipo: tipo, totalencarg: 0, nencarg: 0})
			.exec(function(error, parte) {
				//console.log('ParteMo: ' + JSON.stringify(parte));
				if (error) return res.negotiate(error);
				if (parte === undefined) return res.json(200, {message: 'Diario no encontrado'});
				if (parte) {
					//console.log('ParteId: ' + parte.id);
					sails.models['listempleado'].find({partemo: parte.id})
					.populate('empleado')
					.exec(function(error, model) {
						if (error) res.negotiate(error);
						//console.log('Model: ' + JSON.stringify(model));
						sails.models['listempleado'].watch(req);
						sails.models['listempleado'].subscribe(req.socket, model);
						res.json(model);
					});
				};
			});
		}
		if (tipo == 'recoleccion') {
			sails.models['partemo'].findOrCreate(
				{fecha: {$gte: ini, $lte: fin}, ejercicio: ejerc, tipo: tipo},
				{fecha: fecha, ejercicio: ejerc, finca: finca, tipo: tipo, totalencarg: 0, nencarg: 0})
			.exec(function(error, parte) {
				//console.log('ParteMo: ' + JSON.stringify(parte));
				if (error) res.negotiate(error);
				if (parte === (undefined || '')) res.json(200, {message: 'Diario no encontrado'});
				if (parte) {
					//console.log('ParteId: ' + parte.id);
					sails.models['listempleado'].find({partemo: parte.id})
					.populate('empleado')
					.exec(function(error, model) {
						if (error) res.negotiate(error);

						sails.models['listempleado'].watch(req);
						sails.models['listempleado'].subscribe(req.socket, model);
						res.json(model);
					});
				};
			});
		}
		if (tipo == 'encargado') {
			//, {fecha: hoy, ejercicio: ejerc, finca: finca, tipo: tipo, totalencarg: 0, nencarg: 0}
			sails.models['partemo'].findOrCreate(
				{fecha: {$gte: ini, $lte: fin}, ejercicio: ejerc, tipo: tipo},
				{fecha: fecha, ejercicio: ejerc, finca: finca, tipo: tipo, totalencarg: 0, nencarg: 0})
			.exec(function(error, parte) {
				//console.log('ParteMo: ' + JSON.stringify(parte));
				if (error) res.negotiate(error);
				if (parte === (undefined || '')) res.json(200, {message: 'Diario no encontrado'});
				if (parte) {
					//console.log('ParteId: ' + parte.id);
					sails.models['listempleado'].find({partemo: parte.id})
					.populate('empleado')
					.exec(function(error, model) {
						if (error) res.negotiate(error);

						sails.models['listempleado'].watch(req);
						sails.models['listempleado'].subscribe(req.socket, model);
						res.json(model);
					});
				};
			});
		}
	},

	findDay: function(req, res) {
		var ejerc = req.param('ejercicio');
		var parteId = req.param('id')

			sails.models['partemo'].findOne({id: parteId})
			.exec(function(error, parteCurso) {
				//console.log('ParteMo: ' + JSON.stringify(parte));
				if (error) res.negotiate(error);
				if (parteCurso === (undefined || '')) res.json(200, {message: 'Diario no encontrado'});
				if (parteCurso) {
					//console.log('Parte Fecha: ' + parteCurso.fecha);
					var fecha = parteCurso.fecha;
					var hoy = new Date(fecha);
					var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);

					sails.models['listempleado'].find({ejercicio: ejerc, fecha: {$gte: hoy, $lt: d} })
					.populate('empleado')
					.sort('empleado.name ASC')
					.exec(function(error, model) {
						if (error) res.negotiate(error);

						//sails.models['listempleado'].watch(req);
						//sails.models['listempleado'].subscribe(req.socket, model);
						res.json(model);
					});
				};
			});


	},

	change: function(req, res) {
		var id = req.param('id');
		var parteId = req.param('parteId');
		var tipo = req.param('tipo');
		var ejerc = req.param('ejerc');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		//console.log('ReqParams: ' + JSON.stringify(req.allParams()));
		sails.models['listempleado'].findOne({id: id})
		.exec(function(error, emplead) {
			if(error) return res.negotiate(error);
			var totEurJorn = emplead.njornal*emplead.precjornal;
			var totEurExtra = emplead.nhextra*emplead.prechextra;
			var totEurPorte = emplead.nportes*emplead.precporte;
			var totEur = totEurJorn+totEurPorte+totEurExtra;
			console.log('TotalEur: ' + totEur);
			sails.models['partemo'].findOne({id: parteId})
			.exec(function(error, parteCurso) {
				if (error) return res.negotiate(error);
				//console.log('ParteCurso: ' + JSON.stringify(parteCurso.tipo));

				if (parteCurso.tipo === 'cultivo') {
					var NCult = parteCurso.ncult-1;
					var TotCult = (parteCurso.totalcult*1)-(totEur*1);
					console.log('NCult: ' + NCult + ' TotCult: ' + TotCult);
					sails.models['partemo'].update({id: parteId}, {totalcult: TotCult, ncult: NCult})
					.exec(function(error){
						if(error) return res.negotiate(error);
					});
				} if (parteCurso.tipo === 'encargado') {
					var NEncarg = parteCurso.nencarg-1;
					var TotEncarg = (parteCurso.totalencarg*1)-(totEur*1);
					console.log('NEncarg: ' + NEncarg + ' TotEncar: ' + TotEncarg);
					sails.models['partemo'].update({id: parteId}, {totalencarg: TotEncarg, nencarg: NEncarg})
					.exec(function(error) {
						if(error) return res.negotiate(error);
					});
				} if (parteCurso.tipo === 'recoleccion') {
					var NRecol = parteCurso.nrecol-1;
					var TotRecol = (parteCurso.totalrecol*1)-(totEur*1);
					console.log('NRecol: ' + NRecol + ' TotRecol: ' + TotRecol);
					sails.models['partemo'].update({id: parteId}, {totalrecol: TotRecol, nrecol: NRecol})
					.exec(function(error) {
						if(error) return res.negotiate(error);
					});
				}
			});
		});

		sails.models['partemo'].findOne({fecha:{$gt: d, $lte: hoy}, ejercicio: ejerc, tipo: tipo})
		.exec(function(error, parte) {
			if (error) return res.negotiate(error);
			//console.log('Parte:' + JSON.stringify(parte));
			var nParteId = parte.id;
			//console.log('NParte: ' + nParteId + ' ListId: ' + id);

			sails.models['listempleado'].update({id:id}, {partemo: nParteId})
			.exec(function(error, list) {
				if (error) return res.negotiate(error);

				//console.log('Lista: ' + JSON.stringify(list));
				sails.models['listempleado'].publishUpdate(req.param('id'), list);
				res.json(list);

			});
		})

	},

	countToday: function(req, res) {
		var parteId = req.param('partemo');
		sails.models['partemo'].findOne({id: parteId})
		.exec(function(error, parte) {
			if (error) return res.negotiate(error);

			var tipopart = parte.tipo;
			sails.models['listempleado'].count({partemo: parteId})
			.exec(function(error, model){
				if (error) return res.negotiate(error);

				res.json(200, {n: model, tipo: tipopart});
			});
		});
	},

	findOne: function(req, res) {
		sails.models['listempleado'].findOne({id: req.param('id')})
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			//sails.sockets.join(req.socket, roomId);
			res.json(model);
		})
	},

	create: function(req, res) {
		console.log('Fecha: ' + req.param('fecha') + ' New:' + new Date());
		var ejerc = req.param('ejerc');
		var finca = req.param('finca');
		var tipo = req.param('tipo');
		var inicio = req.param('inicio');
		var fin = req.param('fin');
		var prehoy = new Date(req.param('fecha'));
		//console.log('Hoy: ' + hoy);
		var hoy = prehoy;
		var ini = new Date(prehoy.getFullYear(), prehoy.getMonth(), prehoy.getDate(), 0, 0, 0, 0);
		var fin = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59, 0);
		var newEmplead = req.param('empleados');
		if (newEmplead.length) {
			if (tipo) {
				sails.models['partemo'].findOrCreate(
					{fecha: {$gte: ini, $lte: fin}, ejercicio: ejerc, tipo: tipo},
					{fecha: hoy, ejercicio: ejerc, finca: finca, tipo: tipo, totalcult: 0, ncult: 0, totalrecol: 0, nrecol: 0, totalencarg: 0, nencarg: 0})
				.exec(function(error, parte) {

					if (error) res.negotiate(error);
					//console.log('newEmplead: ' + JSON.stringify(newEmplead) + ', lenght: ' + newEmplead.length + ', isArray: ' + newEmplead.isArray);
					if (newEmplead.length) {
						for (var i = 0; i < newEmplead.length; i++) {
							sails.models['empleado'].findOne({id: newEmplead[i]})
							.exec(function(error, emplead) {
								if (error) return res.negotiate(error);
								//console.log('Emplead: ' + JSON.stringify(emplead));
								var costjorn = emplead.costjornal;
								var costporte = emplead.costportes;
								var costhextra = emplead.costhextra;

								sails.models['listempleado'].findOrCreate(
									{fecha: {$gte: ini, $lte: fin}, ejercicio: ejerc, empleado: emplead.id},
									{partemo: parte.id, empleado: emplead.id, fecha:hoy, finca: finca, ejercicio: ejerc, njornal: 1, precjornal: costjorn, nhextra: 0, prechextra: costhextra, portes: 0, precporte: costporte})
								.exec(function(error, empleadCreated) {
									if (error) return res.negotiate(error);
									sails.models['listempleado'].publishCreate(empleadCreated);
								});
							});
						};
					}
					else {
						sails.models['empleado'].findOne({id: newEmplead})
						.exec(function(error, emplead) {
							if (error) return res.negotiate(error);
							//console.log('Emplead: ' + JSON.stringify(emplead));
							var costjorn = emplead.costjornal;
							var costporte = emplead.costportes;
							var costhextra = emplead.costhextra;

							sails.models['listempleado'].findOrCreate(
								{fecha: {$gte: ini, $lte: fin}, ejercicio: ejerc, empleado: emplead.id},
								{partemo: parte.id, empleado: emplead.id, fecha:hoy, finca: finca, ejercicio: ejerc, njornal: 1, precjornal: costjorn, nhextra: 0, prechextra: costhextra, portes: 0, precporte: costporte})
							.exec(function(error, empleadCreated) {
								if (error) return res.negotiate(error);
								sails.models['listempleado'].publishCreate(empleadCreated);
							});
						});
					};



					sails.models['listempleado'].find({partemo: parte.id, })
					.populate('empleado')
					.exec(function(error, model) {
						if (error) res.negotiate(error);

						sails.models['partemo'].publishUpdate(parte.id, parte);
						res.json(model);
					});
				});
			}
		}

		// if (tipo == 'recoleccion') {
		// 	sails.models['partemo'].findOrCreate({fecha: {$gt: d, $lte: hoy}, ejercicio: ejerc, tipo: tipo}, {fecha: hoy, ejercicio: ejerc, finca: finca, tipo: tipo, totalrecol: 0, nrecol: 0})
		// 	.exec(function(error, parte) {
		// 		if (error) res.negotiate(error);
		//
		// 		for (var i = 0; i < newEmplead.length; i++) {
		// 			sails.models['empleado'].findOne({id: newEmplead[i]})
		// 			.exec(function(error, emplead) {
		// 				if (error) return res.negotiate(error);
		//
		// 				var costjorn = emplead.costjornal;
		// 				var costporte = emplead.costportes;
		// 				var costhextra = emplead.costhextra;
		//
		// 				sails.models['listempleado'].findOrCreate({partemo: parte.id, empleado: emplead.id}, {partemo: parte.id, empleado: emplead.id, fecha:hoy, finca: finca, ejercicio: ejerc, njornal: 1, precjornal: costjorn, nhextra: 0, prechextra: costporte, portes: 0, precporte: costhextra})
		// 				.exec(function(error, empleadCreated) {
		// 					if (error) return res.negotiate(error);
		// 					sails.models['listempleado'].publishCreate(empleadCreated);
		// 				});
		// 			});
		// 		};
		//
		// 		sails.models['listempleado'].find({partemo: parte.id, })
		// 		.populate('empleado')
		// 		.exec(function(error, model) {
		// 			if (error) res.negotiate(error);
		//
		// 			sails.models['partemo'].publishUpdate(parte.id, parte);
		// 			res.json(model);
		// 		});
		// 	});
		// }
		// if (tipo == 'encargado') {
		// 	sails.models['partemo'].findOrCreate({fecha: {$gt: d, $lte: hoy}, ejercicio: ejerc, tipo: tipo}, {fecha: hoy, ejercicio: ejerc, finca: finca, tipo: tipo, totalencarg: 0, nencarg: 0})
		// 	.exec(function(error, parte) {
		// 		if (error) res.negotiate(error);
		//
		// 		for (var i = 0; i < newEmplead.length; i++) {
		// 			sails.models['empleado'].findOne({id: newEmplead[i]})
		// 			.exec(function(error, emplead) {
		// 				if (error) return res.negotiate(error);
		//
		// 				var costjorn = emplead.costjornal;
		// 				var costporte = emplead.costportes;
		// 				var costhextra = emplead.costhextra;
		//
		// 				sails.models['listempleado'].findOrCreate({partemo: parte.id, empleado: emplead.id}, {partemo: parte.id, empleado: emplead.id, fecha:hoy, finca: finca, ejercicio: ejerc, njornal: 1, precjornal: costjorn, nhextra: 0, prechextra: costporte, portes: 0, precporte: costhextra})
		// 				.exec(function(error, empleadCreated) {
		// 					if (error) return res.negotiate(error);
		// 					sails.models['listempleado'].publishCreate(empleadCreated);
		// 				});
		// 			});
		// 		};
		//
		// 		sails.models['listempleado'].find({partemo: parte.id, })
		// 		.populate('empleado')
		// 		.exec(function(error, model) {
		// 			if (error) res.negotiate(error);
		//
		// 			sails.models['partemo'].publishUpdate(parte.id, parte);
		// 			res.json(model);
		// 		});
		// 	});
		// }
	},

	destroy: function(req, res) {
		sails.models['listempleado'].destroy({id: req.param('id')})
		.exec(function (err) {
			if (err) return res.negotiate(err);

			sails.models['listempleado'].publishDestroy(req.param('id'));

		});
	},

	update: function(req, res) {
		var modelId = req.param('id');
		//console.log('ModelId: ' + modelId);
		if (modelId && req.isSocket) {
			sails.models['listempleado'].update({id: modelId}, req.params.all())
			.exec(function(err, model) {
				//console.log('modelid: ' + model.id);
				if (err) res.negotiate(err);

				sails.models['partemo'].findOne({id: req.param('partemo')})
				.exec(function(error, parte) {
					if (error) return res.negotiate(error);

					sails.models['partemo'].publishUpdate(parte.id, parte);
				});

				sails.models['listempleado'].publishUpdate(modelId, model);
				res.json(model);
			});
		} else if (req.isSocket) {
			sails.models['listempleado'].find({})
			.exec(function(error, model) {
				if (error) res.negotiate(error);

				res.json(model);
			});
		}

	},


};
