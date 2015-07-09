/**
 * EspecieController
 *
 * @description :: Server-side logic for managing especies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	getAll: function(req, res) {
		sails.models['especie'].find({})
		.sort('name ASC')
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			res.json(model);
		})
	},

	findOne: function(req, res) {
		Especie.findOne(req.param('id')).exec(function(error, model) {
			if (error) res.negotiate(error);

			res.json(model);
		})
	},

	getActive: function(req, res) {
		var ejerc = req.param('ejerc');

		Ejercicio.findOne({id: ejerc})
		.populate('especies')
		.exec(function(error, model) {
			if(error) return res.negotiate(error);

			res.json(model);
		});
	}

};
