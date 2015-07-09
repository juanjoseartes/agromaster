/**
 * UnidadController
 *
 * @description :: Server-side logic for managing unidads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	getAll: function(req, res) {
		sails.models['unidad'].find()
		.sort('coefconvert DESC')
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			res.json(model);
		});
	},

	getDefault: function(req, res) {
		Unidad.find({tipo: 'Peso', coefconvert: 1})
		.exec(function(err, unidad) {
			if (err) res.negotiate(err);

			res.json({'data': unidad});
		});
	}

};
