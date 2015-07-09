/**
* sails.models['mocultivo']Controller
*
* @description :: Server-side logic for managing mocultivoes
* @help        :: See http://links.sailsjs.org/docs/controllers
*/

module.exports = {

	findToday: function(req, res) {
		var ejerc = req.param('ejerc');
		var finca = req.param('finca');
		var tipo = req.param('tipo');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);

		sails.models['tipodiario'].findOne({name: tipo})
		.exec(function(error, tipoDia) {
			sails.models['partecult'].findOne({ejercicio: ejerc, fecha: {$gt: d, $lte: hoy}, tipo: tipoDia.id})
			.exec(function(error, parte) {
				if (error) res.negotiate(error);
				if (parte == (undefined || '')) res.json(200, {message: 'Diario no encontrado'});
				if (parte) {
					sails.models['mocultivo'].find({partecultivo: parte.id})
					.populate('empleado')
					.exec(function(error, model) {
						if (error) res.negotiate(error);

						sails.models['mocultivo'].watch(req);
						sails.models['mocultivo'].subscribe(req.socket, model);
						res.json(model);
					});
				};
			});
		});
	},

	countToday: function(req, res) {
		var ejerc = req.param('ejerc');
		var finca = req.param('finca');
		var tipo = req.param('tipo');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var h = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);
		sails.models['tipodiario'].findOne({name: tipo})
		.exec(function(error, tipoDia) {
			sails.models['partecult'].findOne({fecha: {$gte: d, $lte: h}, ejercicio: ejerc, tipo: tipoDia.id})
			.exec(function(error, parte) {
				if (error) return res.negotiate(error);
				if (parte == undefined) {
					return res.json(200, {n: 0});
				};
				sails.models['mocultivo'].count({partecultivo: parte.id})
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					res.json(200, {n: model});
				});
			});
		});
	},

	findOne: function(req, res) {
		sails.models['mocultivo'].findOne({id: req.param('id')})
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
		var newEmpl = req.param('empleados');
		var typeEmple = typeof req.param('empleados');
		if (typeEmple == 'string') {
			var newEmpl = new Array(req.param('empleados'));
		}
		//console.log('NewEmpl: '+ newEmpl);

		sails.models['tipodiario'].findOne({name: tipo})
		.exec(function(error, tipoDia) {
			if (error) return res.negotiate(error);
			//console.log('fecha: '+d+' - '+hoy+' ejercicio: '+ejerc+' tipo: '+tipo);
			sails.models['partemo'].findOne({fecha: {$gt: d, $lte: hoy}, ejercicio: ejerc, tipo: 'cultivo'})
			.exec(function(error, parteMO) {
				if (error) return res.negotiate(error);

				var parteMOid = parteMO.id;
				//console.log('ParteMO: ' + parteMO.id);
				sails.models['partecult'].findOne({ejercicio: ejerc, fecha: {$gt: d, $lte: hoy}, tipo: tipoDia.id})
				.exec(function(error, parte) {
					if (error) res.negotiate(error);
					//console.log('Empleados: ' + JSON.stringify(newEmpl));
					//console.log('Empleados length: ' + newEmpl.length);
					//console.log('Parte: ' + JSON.stringify(parte));
					for (var i = 0; i < newEmpl.length; i++) {
						//console.log('partemo: ' +parteMOid+' empleado: '+newEmpl[i]);
						var empleadCurso = newEmpl[i];
						sails.models['listempleado'].findOne({partemo: parteMOid, empleado: empleadCurso})
						.exec(function(error, listEmpl) {
							if (error) return res.negotiate(error);
							//console.log('listEmpl: ' + JSON.stringify(listEmpl));
							var totJorn = (listEmpl.njornal*listEmpl.precjornal)+(listEmpl.nportes*listEmpl.precporte)+(listEmpl.nhextra*listEmpl.prechextra);

							sails.models['mocultivo'].findOrCreate(
								{partecultivo: parte.id, empleado: listEmpl.empleado},
								{partecultivo: parte.id, empleado: listEmpl.empleado, ejercicio: ejerc, cantidad:1, precio: totJorn, coef:1})
							.exec(function(error, mobraCreated) {
								if (error) return res.negotiate(error);

								sails.models['mocultivo'].publishCreate(mobraCreated);
								var hoy = new Date();
								//console.log('EmepladoCurso: ' + empleadCurso + ' listEmpl: ' + listEmpl.empleado);
								sails.models['mocultivo'].find({createdAt: {$gt: d, $lte: hoy}, ejercicio: ejerc, empleado: listEmpl.empleado})
								.exec(function(error, moEmplead) {
									if (error) return res.negotiate(error);

									//console.log('MoEmplead: ' + JSON.stringify(moEmplead));
									var nTareas = moEmplead.length;
									var coefTareas = 1/moEmplead.length;
									console.log('nTareas: ' + nTareas + ' coefTareas: ' + coefTareas);

									for (var t = 0; t < moEmplead.length; t++) {
										sails.models['mocultivo'].update({id: moEmplead[t].id}, {coef: coefTareas, cantidad: nTareas})
										.exec(function(error, modUpd) {
											if (error) return res.negotiate(error);
											sails.models['mocultivo'].publishUpdate(modUpd[0].id, modUpd);
										});
									};
								});
							});
						});
					};

					sails.models['mocultivo'].find({partecultivo: parte.id, })
					.populate('empleado')
					.exec(function(error, model) {
						if (error) res.negotiate(error);

						res.json(model);
					});
				});
			});
		});
	},

	destroy: function(req, res) {
		sails.models['mocultivo'].destroy({id: req.param('id')})
		.exec(function (err, model) {
			if (err) return res.negotiate(err);

			var hoy = new Date();
			var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
			sails.models['mocultivo'].find({createdAt: {$gt: d, $lte: hoy}, ejercicio: model[0].ejercicio, empleado: model[0].empleado})
			.exec(function(error, moEmplead) {
				if (error) return res.negotiate(error);

				var nTareas = moEmplead.length;
				var coefTareas = 1/nTareas;

				for (var t = 0; t < moEmplead.length; t++) {
					sails.models['mocultivo'].update({id: moEmplead[t].id}, {coef: coefTareas, cantidad: nTareas})
					.exec(function(error) {
						if (error) return res.negotiate(error);
					});
				}
			});

			sails.models['mocultivo'].publishDestroy(req.param('id'));
		});
	},

	update: function(req, res) {
		var modelId = req.param('id');
		console.log('modelId: ' + modelId);
		if (modelId && req.isSocket) {
			sails.models['mocultivo'].update(req.param('id'), req.allParams())
			.exec( function(err, model) {
				if (err) res.negotiate(err);

				var hoy = new Date();
				var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
				sails.models['mocultivo'].find({createdAt: {$gt: d, $lte: hoy}, ejercicio: model[0].ejercicio, empleado: model[0].empleado})
				.exec(function(error, moEmplead) {
					if (error) return res.negotiate(error);

					var nTareas = moEmplead.length;
					var coefTareas = 1/nTareas;

					for (var t = 0; t < moEmplead.length; t++) {
						sails.models['mocultivo'].update({id: moEmplead[t].id}, {coef: coefTareas, cantidad: nTareas})
						.exec(function(error) {
							if (error) return res.negotiate(error);
						});
					}
				});

				sails.models['mocultivo'].publishUpdate(model[0].id, model);
				res.json(model);
			});
		} else if (req.isSocket) {
			sails.models['mocultivo'].find({})
			.exec(function(error, model) {
				if (error) res.negotiate(error);

				res.json(model);
			});
		}
	},
};
