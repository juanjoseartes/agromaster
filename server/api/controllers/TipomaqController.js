/**
 * TipomaqController
 *
 * @description :: Server-side logic for managing tipomaqs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function(req, res) {

		Tipomaq.findOrCreate({name: req.param('name')}, req.allParams())
		.exec(function(err, model) {
			if (err) res.negotiate(err);

			Tipomaq.publishCreate(model);
			res.json(model);
		})
	},

	update: function(req, res) {

			Tipomaq.update({id: req.param('id')}, req.allParams())
			.exec(function(err, model) {
				if (err) res.negotiate(err);

				Tipomaq.publishUpdate(model[0].id, model);
				res.json(model);
			});
	},

	getAll: function(req, res) {

		sails.models['tipomaq'].find()
		.populate('grupo')
		.sort('name ASC')
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			sails.models['tipomaq'].watch(req);
			sails.models['tipomaq'].subscribe(req.socket, model);
			res.json(model);
		})
	},


};
