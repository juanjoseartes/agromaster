/**
 * FactcompraController
 *
 * @description :: Server-side logic for managing factcompras
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	getAll: function(req, res) {
		var factparams = {
			finca: req.param('finca'),
			fchinic: req.param('fchinic'),
			fchfin: req.param('fchfin')
		};

		sails.models['factcompra'].find({where: {finca: req.param('finca')}, fch: {'>=': req.param('fchinic'), '<=': req.param('fchfin')}, sort: 'fch DESC'})
			.populate('proveedor')
			.exec(function (err, model) {
				if (err) res.negotiate(err);

				res.json(model);
			});
	}


};
