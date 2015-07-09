/**
 * LaboratorioController
 *
 * @description :: Server-side logic for managing laboratorios
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	getAll: function(req, res) {
		Laboratorio.find({})
		.sort('name ASC')
		.exec(function(error, model) {
			if (error) return res.negotiate(error);

			res.json(model);
		})
	}

};
