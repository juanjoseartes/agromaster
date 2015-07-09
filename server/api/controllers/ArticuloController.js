/**
 * ArticuloController
 *
 * @description :: Server-side logic for managing articuloes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	findText: function(req, res) {

		var searchtext = req.param('text');

		Articulo.find({name : {'contains' : searchtext}})
			.exec(function(error, model) {
				if (error) res.negotiate(error);

				res.json(model);
			})
		},


	getFitos: function(req, res) {

		Articulo.find({almacen : 'fitosanitarios'})
			.exec(function(error, model) {
				if (error) res.negotiate(error);

				Detcompra.watch(req.socket);
				res.json(model); // Will return only the name
			})
		},

	getAbonos: function(req, res) {

		Articulo.find({almacen : 'abonos'})
			.exec(function(error, model) {
				if (error) res.negotiate(error);

				Detcompra.watch(req.socket);
				res.json(model);
			})
		},

};
