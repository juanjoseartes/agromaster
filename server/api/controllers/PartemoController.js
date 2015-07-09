/**
 * sails.models['partemo']Controller
 *
 * @description :: Server-side logic for managing sails.models['partemo']es
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	findToday: function(req, res) {
		//console.log('Req: ' + JSON.stringify(req.allParams()));
		var ejercicio = req.param('ejerc');
		//var tipo = req.param('tipo');
		var hoy = new Date();
		var ini = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var fin = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);

		sails.models['partemo']
			.find({fecha: {$gte: ini, $lte: fin}, ejercicio: ejercicio})
			.populate('listempleados')
			.exec(function(error, model) {
				//console.log('sails.models['partemo']: ' + model.id);
				if (error) return res.negotiate(error);
				if (!model) return res.json(200, {});

				//sails.models['partemo'].watch(req);
				sails.models['partemo']
					.subscribe(req.socket, model);
					//console.log('Req: ' + JSON.stringify(model));
				res.json(model);
			});
	},


	unsubscribe: function(req, res) {
		sails.models['partemo'].findOne({ejercicio: req.param('ejerc')}).exec(function(err, modelInstance) {
			sails.models['partemo'].unsubscribe(req.socket, modelInstance);
		});
	},

	getEjercicio: function(req, res) {
		var ejercId = req.param('id');
		var tipo = req.param('tipo');

		if (tipo) {
			sails.models['partemo'].find({ejercicio: ejercId, tipo: tipo})
			.sort('fecha ASC')
			.exec(function(error, model) {
				//console.log('sails.models['partemo']: ' + model.id);
				if (error) return res.negotiate(error);

				res.json(model);
			});
		} if (!tipo) {
			sails.models['partemo'].find({ejercicio: ejercId})
			.sort('fecha ASC')
			.exec(function(error, model) {
				//console.log('sails.models['partemo']: ' + model.id);
				if (error) return res.negotiate(error);

				res.json(model);
			});
		}

	},

	getPeriod: function(req, res) {
		var ejercId = req.param('id');
		var tipo = req.param('tipo');
		var inicio = new Date(req.param('fchinic'));
		var fin = new Date(req.param('fchfin'));
		if(tipo) {
			sails.models['partemo'].find({ejercicio: ejercId, fecha: {'<=': fin}, tipo: tipo })
			.sort('fecha ASC')
			.exec(function(error, model) {
				//console.log('sails.models['partemo']: ' + model.id);
				if (error) return res.negotiate(error);

				res.json(model);
			});
		} if(!tipo) {
			sails.models['partemo'].find({ejercicio: ejercId, fecha: {'<=': fin}})
			.sort('fecha ASC')
			.exec(function(error, model) {
				//console.log('sails.models['partemo']: ' + model.id);
				if (error) return res.negotiate(error);

				res.json(model);
			});
		}

	},


	findDiario: function(req, res) {
		var parteId = req.param('id');
		//console.log('ParteId: ' + parteId)
		sails.models['partemo'].findOne({id: parteId})
		.populate('listempleados')
		.exec(function(error, model) {
			//console.log('sails.models['partemo']: ' + model.id);
			if (error) return res.negotiate(error);

			res.json(model);
		});
	},

	countToday: function(req, res) {

		var ejercicio = req.param('ejerc');
		var tipo = req.param('tipo');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);

		//console.log('sails.models['partemo']: ' + ejercicio + ' ' + tipo + ' ' + d + ' ' + hoy);
		sails.models['partemo'].findOne({fecha: {$gt: d, $lte: hoy}, ejercicio: ejercicio, tipo: tipo})
		//.populate('listempleados')
		.exec(function(error, parte) {
			if (error) return res.negotiate(error);
			if (!parte) return res.json(200, {n: 0, tipo: tipo});

			sails.models['listempleado'].count({partemo: parte.id})
			.exec(function(error, model){
				if (error) return res.negotiate(error);

				res.json(200, {n: model, tipo: tipo});
			});

		});
	},

};
