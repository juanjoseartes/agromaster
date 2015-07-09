/**
 * TagController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	getAll: function(req, res) {

		var finca = req.param('finca');

		sails.models['tag'].find({finca: req.param('finca')})
		.populate('emplCurso')
		.populate('emplHist')
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			sails.models['tag'].watch(req.socket);
			sails.models['tag'].subscribe(req.socket, model);
			res.json(model);
		})
	},

};
