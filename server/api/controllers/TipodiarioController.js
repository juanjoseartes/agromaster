/**
 * TipodiarioController
 *
 * @description :: Server-side logic for managing tipodiarios
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function (req, res, next) {

		//TODO: Do some validation on the input
		var diaInfo = {
			name: req.param('name'),
			orden: req.param('orden')
		};

		Tipodiario.findOrCreate({name: req.param('name')}, diaInfo)
		.exec(function(err, model) {
			if (err) return res.negotiate(err);

			Tipodiario.publishCreate(model);
			res.json(model);

			// if (model) {
			// 	Tipodiario.findOne(model.id)
			// 	.populate('fincas')
			// 	.exec(function(err, modelSelected) {
			// 		if (err) return res.negotiate(err);
			// 		if (!modelSelected) return next();
			//
			// 		modelSelected.fincas.add(req.param('finca'));
			// 		modelSelected.save(function(err) {
			// 			if(err) res.negotiate(err);
			//
			// 		});
			// 	});
			// }

		});
	},

	update: function(req, res) {
		var modelId = req.param('id');

		if (modelId && req.isSocket) {
			Tipodiario.update(req.param('id'), req.params.all())
				.exec( function(err, model) {
					if (err) res.negotiate(err);

					Tipodiario.publishUpdate(model[0].id, model);
					res.json(model);
				});
		} else if (req.isSocket) {
			Tipodiario.find({})
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					res.json(model);
				});
		}

	},

	getAll: function(req, res) {
		var ejerc = req.param('ejerc');
		var finca = req.param('finca');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var h = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);

		sails.models['tipodiario'].find({})
		.sort('name ASC')
		//.populate('partes', {ejercicio: ejerc, fecha: {$gt: d, $lte: hoy}})
		.exec(function(error, model) {
			if (error) return res.negotiate(error);

			res.json(model);
		});
	},

	findOne: function(req, res) {
		Tipodiario.findOne({id: req.param('id')})
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			res.json(model);
		})
	},

	getToday: function(req, res) {

		var finca = req.param('finca');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);

		sails.models['tipodiario'].find()
		.sort('name ASC')
		.exec(function(error, model) {
			//console.log('Model: ' + model);
			if (error) return res.negotiate(error);


			res.json(model);

		});


	}

};
