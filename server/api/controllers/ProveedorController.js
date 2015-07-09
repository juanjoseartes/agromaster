/**
* ProveedorController
*
* @description :: Server-side logic for managing proveedors
* @help        :: See http://links.sailsjs.org/docs/controllers
*/

module.exports = {

	getActive: function(req, res) {

		Proveedor.find({fincas: req.param('finca')})
		.exec(function(error, models) {
			if (error) res.negotiate(error);

			Proveedor.watch(req.socket);
			Proveedor.subscribe(req.socket, models);
			res.json(models);
		})
	},

	getAll: function(req, res) {

		Finca.find({id: req.param('finca')})
		.populate('proveedores')
		.exec(function(error, models) {
			if (error) res.negotiate(error);
			Proveedor.watch(req.socket);
			Proveedor.subscribe(req.socket, models);
			res.json(models);
		})
	},

	findOne: function(req, res) {
		Proveedor.findOne({id: req.param('id')})
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			//sails.sockets.join(req.socket, roomId);
			res.json(model);
		})
	},

create: function (req, res) {

	Proveedor.findOrCreate({name: req.param('name')}, req.allParams())
	.exec(function(err, model) {
		if (err) return res.negotiate(err);

		Proveedor.publishCreate(model);
		res.json(model);

		});
	},


};
