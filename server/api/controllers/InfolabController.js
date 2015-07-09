/**
 * InfolabController
 *
 * @description :: Server-side logic for managing infolabs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	destroy: function(req, res) {
		Infolab.findOne({id: req.param('id')})
		.exec(function(error, info) {
			if (error) return res.negotiate(error);

			var anaId = info.analisis;
			Analisis.findOne({id: anaId})
			.exec(function(error, analisis) {
				if (error) return res.negotiate(error);

				Infolab.destroy({id: req.param('id')})
				.exec(function (err) {
					if (err) return res.negotiate(err);
				});
				Analisis.publishUpdate(analisis.id, analisis);
			});
		});
	},

	// CREATE: se utiliza en el metodo upload del Analisis
	// create: function(req, res) {
	// 	Infolab.create(req.allParams())
	// 	.exec(function(err, model) {
	// 		if (err) res.negotiate(err);
	//
	// 		Infolab.publishAdd(req.param('analisis'), analisis, model.id);
	// 		res.json(model);
	// 	})
	// },

};
