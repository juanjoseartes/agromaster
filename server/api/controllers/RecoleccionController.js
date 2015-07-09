/**
 * RecoleccionController
 *
 * @description :: Server-side logic for managing recoleccions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	// create: function(req, res) {
	// 	var hoy = new Date();
	// 	var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
	// 	var confecciones = req.param('confecciones');
	// 	//console.log('Params: ' + JSON.stringify(req.allParams()));
	// 	Recoleccion.findOrCreate({createdAt: {$gt: d, $lte: hoy}, ejercicio: req.param('ejercicio'), especie: req.param('especie')}, req.allParams())
	// 	.populate('especie')
	// 	.populate('confeccionesDia')
	// 	.populate('detrecoleccion')
	// 	.exec(function(error, model) {
	// 		if (error) return res.negotiate(error);
	//
	// 		Recoleccion.publishCreate(model);
	// 		res.json(model);
	// 	})
	// },

	getToday: function(req, res) {

		var ejercicio = req.param('ejerc');
		var especie = req.param('especie');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);

		if (especie) {
			sails.models['recoleccion'].find({createdAt: {$gt: d, $lte: hoy}, ejercicio: ejercicio, especie: especie})
			.populate('especie')
			.populate('confeccionesDia')
			.populate('detrecoleccion')
			.exec(function(error, model) {
				if (error) return res.negotiate(error);

				sails.models['recoleccion'].watch(req);
				sails.models['recoleccion'].subscribe(req.socket, model);
				//console.log('Model: ' + JSON.stringify(model));
				res.json(model);
			});
		} else {
			sails.models['recoleccion'].find({createdAt: {$gt: d, $lte: hoy}, ejercicio: ejercicio})
			.populate('especie')
			.populate('confeccionesDia')
			.populate('detrecoleccion')
			.exec(function(error, model) {
				if (error) return res.negotiate(error);

				sails.models['recoleccion'].watch(req);
				sails.models['recoleccion'].subscribe(req.socket, model);
				//console.log('Model: ' + model);
				res.json(model);
			});
		}

	},

	getEjercicio: function(req, res) {

		var ejercicio = req.param('ejerc');
		var especie = req.param('especie');

		if (especie) {
			sails.models['recoleccion'].find({ejercicio: ejercicio, especie: especie})
			.populate('detrecoleccion')
			.exec(function(error, model) {
				if (error) return res.negotiate(error);

				res.json(model);
			});
		} else {
			sails.models['recoleccion'].find({ejercicio: ejercicio})
			.populate('detrecoleccion')
			.exec(function(error, model) {
				if (error) return res.negotiate(error);

				res.json(model);
			});
		}


	},

};
