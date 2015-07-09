/**
 * sails.models['matcultivo']Controller
 *
 * @description :: Server-side logic for managing matcultivoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	findToday: function(req, res) {
		var ejerc = req.param('ejerc');
		var finca = req.param('finca');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var tipo = req.param('tipo');

		sails.models['tipodiario'].findOne({name: tipo})
		.exec(function(error, tipoDia) {
			if (error) return res.negotiate(error);

			sails.models['partecult'].findOrCreate(
				{ejercicio: ejerc, fecha: {$gt: d, $lte: hoy}, tipo: tipoDia.id},
				{ejercicio: ejerc, finca: finca, fecha: hoy, tipo: tipoDia.id, totalparc: 0, nparc: 0, totalmobra: 0, nmobra: 0, totalmat: 0, nmat: 0, totalmaq: 0, nmaq: 0, totalotros: 0, notros: 0}
			)
			.exec(function(error, parte) {
				if (error) res.negotiate(error);
				if (parte == undefined || '') res.json(200, {message: 'Parte de cultivo no existente'});
				if (parte) {
					sails.models['matcultivo'].find({partecultivo: parte.id})
					.populate('producto')
					.populate('unidad')
					.exec(function(error, model) {

						if (error) res.negotiate(error);
						if (!model) res.json(200, {message: 'No hay materiales asignados'});

						//sails.models['matcultivo'].watch(req);
						sails.models['matcultivo'].subscribe(req.socket, model);
						res.json(model);
					});
				};
			});
		});
	},

	countToday: function(req, res) {
		var ejerc = req.param('ejerc');
		var finca = req.param('finca');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var h = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);
		var tipo = req.param('tipo');

		sails.models['tipodiario'].findOne({name: tipo})
		.exec(function(error, tipoDia) {
			if (error) return res.negotiate(error);

			sails.models['partecult'].findOne({fecha: {$gte: d, $lte: h}, ejercicio: ejerc, tipo: tipoDia.id})
			.exec(function(error, parte) {
				if (error) res.negotiate(error);
				if (parte == undefined) {
					return res.json(200, {n: 0});
				};
				sails.models['matcultivo'].count({partecultivo: parte.id})
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					res.json(200, {n: model});
				});
			});
		});
	},

	findOne: function(req, res) {
		sails.models['matcultivo'].findOne({id: req.param('id')})
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			//sails.sockets.join(req.socket, roomId);
			res.json(model);
		})
	},

	create: function(req, res) {
		var ejerc = req.param('ejercicio');
		var finca = req.param('finca');
		var tipo = req.param('tipo');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var newMat = req.param('materiales');

		sails.models['tipodiario'].findOne({name: tipo})
		.exec(function(error, tipoDia) {
			if (error) return res.negotiate(error);

			sails.models['partecult'].findOne({ejercicio: ejerc, fecha: {$gt: d, $lte: hoy}, tipo: tipoDia.id})
			.exec(function(error, parte) {
				if (error) res.negotiate(error);

				for (var i = 0; i < newMat.length; i++) {
					sails.models['producto'].findOne({id: newMat[i]})
					.exec(function(error, product) {
						//console.log('sails.models['producto']: ' + JSON.stringify(product));
						if (error) return res.negotiate(error);

						sails.models['articulo'].findOne({id: product.articulo})
						.exec(function(error, articulo) {
							//console.log('sails.models['articulo']:' + JSON.stringify(articulo));
							if (error) return res.negotiate(error);

							var litArt = articulo.name;
							//console.log('ParteCult:' + parte.id + ' sails.models['producto']: ' + product.id + ' LitArt: ' + litArt);
							sails.models['matcultivo'].find({partecultivo: parte.id, producto: product.id})
							.exec(function(error, mat) {
								if (error) return res.negotiate(error);

								if (mat.length==0) {
									sails.models['matcultivo'].create({partecultivo: parte.id, finca: finca, producto: product.id, litArt: litArt, cantidad:1})
									.exec(function(error, material) {
										//console.log('ModelCreated: ' + JSON.stringify(material));
										if (error) return res.negotiate(error);

										sails.models['matcultivo'].publishCreate(material);
									});
								}
							});

						});
					})
				};

				sails.models['matcultivo'].find({partecultivo: parte.id, })
				.populate('producto')
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					sails.models['matcultivo'].watch(req);
					res.json(model);
				});
				sails.models['partecult'].publishUpdate(parte.id, parte);
			});
		});

	},

	destroy: function(req, res) {
		sails.models['matcultivo'].destroy({id: req.param('id')})
		.exec(function (err) {
			if (err) return res.negotiate(err);

			sails.models['matcultivo'].publishDestroy(req.param('id'));
		});
	},

	update: function(req, res) {
		var modelId = req.param('id');
		//console.log('Params: ' + JSON.stringify(req.allParams()));

		if (req.param('id') && req.isSocket) {
			sails.models['unidad'].findOne({id: req.param('unidad')})
			.exec(function(error, unid) {
				if (error) return res.negotiate(error);

				var litUd = unid.name;
				sails.models['producto'].findOne({id: req.param('producto')})
				.exec(function(error, product) {
					if (error) return res.negotiate(error);
					//console.log('sails.models['producto']: ' + JSON.stringify(product));
					//var udsE = product.udsEnt;
					//var impE = product.impEnt;
					var precMed = (product.impEnt || 0)/(product.udsEnt || 1);
					var updData = {
						cantidad: req.param('cantidad'),
						unidad: req.param('unidad'),
						litUnidad: litUd,
						precio: precMed
					};
					//console.log('Update Data: ' + JSON.stringify(updData));
					sails.models['matcultivo'].update({id: req.param('id')}, updData)
					.exec( function(err, model) {
						//console.log('Model: ' + JSON.stringify(model));
						if (err) res.negotiate(err);

						sails.models['matcultivo'].publishUpdate(req.param('id'), model);
						res.json(model);
					});
				});
			});

		} else if (req.isSocket) {
			sails.models['matcultivo'].find({})
			.exec(function(error, model) {
				if (error) res.negotiate(error);
				sails.models['matcultivo'].subscribe(req.socket, model);
				res.json(model);
			});
		};

	},


};
