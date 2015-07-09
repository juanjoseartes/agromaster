/**
 * CompraController
 *
 * @description :: Server-side logic for managing compras
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function(req, res) {
		Albcompra.create(req.params.all())
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			Albcompra.publishCreate(model);
			res.json(model);
		});
	},

	update: function(req, res) {

		Albcompra.update({id: req.param('id')}, req.allParams())
		.exec(function update(error, model) {
			if (error) res.negotiate(error);

			Albcompra.publishUpdate(req.param('id'), model);
			res.json(model);
		});
	},


	findOne: function(req, res) {
		Albcompra.findOne(req.param('id'))
		.populate('proveedor')
		//.populate('detalles')
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			res.json(model);
		});
	},

	getAll: function(req, res) {
		var albparams = {
			finca: req.param('finca'),
			fchinic: req.param('fchinic'),
			fchfin: req.param('fchfin')
		};

		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth()-1, hoy.getDate(), 0, 0, 0);

		console.log('ReqParams: ' + albparams.fchinic + ' - ' + albparams.fchfin);
		sails.models['albcompra'].find()
			.where({
				finca: req.param('finca'),
				fch: {'>': d, '<=': hoy}
			})
			.sort('fch DESC')
			.populate('proveedor')
			.exec(function (err, model) {
				if (err) res.negotiate(err);

			//	Albcompra.subscribe(req.socket, model);
			console.log('Model: ' + JSON.stringify(model));
				res.json(model);
			});
	}

};
