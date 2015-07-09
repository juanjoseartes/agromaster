/**
 * ProductoController
 *
 * @description :: Server-side logic for managing productoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	getAll: function(req, res) {
		var finca = req.param('finca');
		var almacen = req.param('almacen');

		if (!almacen) {
			sails.models['producto'].find({finca: finca})
			.populateAll()
			.exec(function(error, model) {
				if (error) res.negotiate(error);
				res.json(model);
			});
		}
		if (almacen) {
			sails.models['producto'].find({finca: finca, almacen: almacen})
			.populateAll()
			.exec(function(error, model) {
				if (error) res.negotiate(error);
				res.json(model);
			});
		};

	},

	addProduct: function(req,res) {

				var product = {
					articulo: req.param('id'),
					finca: req.param('finca'),
					almacen: req.param('almacen')
				};

				Producto.findOrCreate({articulo: req.param('id'), finca: req.param('finca')}, product)
					.exec(function(error, model) {
						if (error) res.negotiate(error);

						res.json(model);
					});
	}

};
