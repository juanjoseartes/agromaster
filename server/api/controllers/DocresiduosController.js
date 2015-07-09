/**
 * DocresiduosController
 *
 * @description :: Server-side logic for managing docresiduos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	destroy: function(req, res) {
		Docresiduos.findOne({id: req.param('id')})
		.exec(function(error, info) {
			if (error) return res.negotiate(error);

			var resId = info.residuos;
			Residuos.findOne({id: resId})
			.exec(function(error, residuos) {
				if (error) return res.negotiate(error);

				Docresiduos.destroy({id: req.param('id')})
				.exec(function (err) {
					if (err) return res.negotiate(err);
				});
				Residuos.publishUpdate(residuos.id, residuos);
			});
		});
	},

};
