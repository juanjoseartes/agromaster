/**
 * ConfeccionController
 *
 * @description :: Server-side logic for managing confeccions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function(req, res) {

			var name = req.param('name');
			var categ = req.param('categ');
			//var especie = req.param('especie');
			var ejercicio = req.param('ejercicio');
			var nenvases = req.param('nenvases');
			var pesounit = req.param('pesounit');
			var unidad = req.param('unidad');


		sails.models['ejercicio'].findOne({id: req.param('ejercicio')})
		.populate('especies')
		.exec(function(error, ejercCurso) {
			if(error) return res.negotiate(error);
			var especEjerc = ejercCurso.especies[0].id;
			console.log('EspecieEjerc: ' + especEjerc);
			sails.models['confeccion'].findOrCreate(
				{name: name, especie: especEjerc, categ: categ},
				{name: name, especie: especEjerc, categ: categ, ejercicio: ejercicio, nenvases: nenvases, pesounit: pesounit, unidad: unidad}
				)
			.exec(function(err, model) {
				if (err) res.negotiate(err);

				sails.models['confeccion'].publishCreate(model);
				res.json(model);
			})
		})

	},

	update: function(req, res) {
		//console.log('All Params: ' + req.allParams());
		sails.models['confeccion'].update({id: req.param('id')}, req.allParams())
		.exec(function(err, model) {
			if (err) res.negotiate(err);
			//console.log('Model: ' + model);
			//sails.models['confeccion'].publishUpdate(model[0].id, model);
			res.json(model);
		});
	},

	getAll: function(req, res) {
		var ejerc = req.param('ejerc');

		sails.models['confeccion'].find({})
		.populate('especie')
		.populate('unidad')
		.sort('name ASC')
		.exec(function(error, model) {
			if (error) return res.negotiate(error);

			sails.models['confeccion'].watch(req);
			sails.models['confeccion'].subscribe(req.socket, model);
			res.json(model);
		});
	},

	getActive: function(req, res) {
		var ejerc = req.param('ejerc');
		var especie = req.param('especie');

		sails.models['confeccion'].find({ejercicio: ejerc})
		.populate('especie')
		.populate('unidad')
		.sort('name ASC')
		.exec(function(error, model) {
			if (error) return res.negotiate(error);

			res.json(model);
		});

		// if (!especie) {
		// 	sails.models['especie'].find({ejercicios: ejerc})
		// 	.exec(function(error, espec) {
		// 		if (error) return res.negotiate(error);
		//
		// 		var listConf = [];
		// 		for (var i = 0; i < espec.length; i++) {
		// 			var especId = espec[i].id;
		// 			sails.models['confeccion'].find({especie: especId})
		// 			.populate('especie')
		// 			.exec(function(error, confecc) {
		// 				if (error) return res.negotiate(error);
		//
		// 				listConf.push({confeccion: confecc});
		// 			});
		// 		};
		// 		res.json(200, {confecciones: listConf});
		// 	});
		// } else {
		// 	sails.models['confeccion'].find({especie: especie})
		// 	.sort('name ASC')
		// 	.exec(function(error, model) {
		// 		if (error) return res.negotiate(error);
		//
		// 		res.json(model);
		// 	});
		// }


	},


	findOne: function(req, res) {
		sails.models['confeccion'].findOne(req.param('id'))
		.populate('especie')
		.populate('unidad')
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			res.json(model);
		});
	},

};
