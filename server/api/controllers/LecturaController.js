/**
* AnalisisController
*
* @description :: Server-side logic for managing analises
* @help        :: See http://links.sailsjs.org/docs/controllers
*/

moment = require('moment');

module.exports = {

	create: function(req, res) {

		sails.models['lectura'].findOrCreate({fecha: req.param('fecha'), ejercicio: req.param('ejercicio'), parcela: req.param('parcela'), tipo: req.param('tipo')}, req.allParams())
		.exec(function(err, model) {
			if (err) res.negotiate(err);

			sails.models['lectura'].publishCreate(model);
			res.json(model);
		})
	},

	update: function(req, res) {
		sails.models['lectura'].update({id: req.param('id')}, {valor: req.param('valor')})
		.exec(function(err, model) {
			if (err) res.negotiate(err);

			sails.models['lectura'].publishUpdate(model[0].id, model);
			res.json(model);
		});
	},

	destroy: function(req, res) {
		sails.models['lectura'].destroy({id: req.param('id')})
		.exec(function(err) {
			if (err) res.negotiate(err);

			sails.models['lectura'].publishDestroy(req.param('id'));
			//res.json(model);
		});
	},

	findOne: function(req, res) {
		sails.models['lectura'].findOne(req.param('id')).exec(function(error, model) {
			if (error) res.negotiate(error);

			res.json(model);
		})
	},

	findToday: function(req, res) {
		var ejerc = req.param('id');
		var tipo = req.param('tipo');
		var parcela = req.param('parcela');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);

		if (parcela) {
			sails.models['lectura'].find({fecha: {$gt: d, $lte: hoy}, ejercicio: ejerc, parcela: parcela, tipo: tipo})
			.populate('parcela')
			.exec(function(error, model) {
				if (error) res.negotiate(error);

				sails.models['lectura'].watch(req);
				sails.models['lectura'].subscribe(req.socket, model);
				res.json(model);

			});
		} else {
			sails.models['lectura'].find({ejercicio: ejerc, fecha: {$gt: d, $lte: hoy}, tipo: tipo})
			.populate('parcela')
			.exec(function(error, model) {
				if (error) res.negotiate(error);

				sails.models['lectura'].watch(req);
				sails.models['lectura'].subscribe(req.socket, model);
				res.json(model);

			});
		}


	},

	findEjercicio: function(req, res) {
		var ejerc = req.param('id');
		var tipo = req.param('tipo');
		var parcela = req.param('parcela');

		if (parcela) {
			if (tipo) {
				sails.models['lectura'].find({ejercicio: ejerc, parcela: parcela, tipo: tipo})
				.populate('parcela')
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					res.json(model);

				});
			} else {
				sails.models['lectura'].find({ejercicio: ejerc, parcela: parcela})
				.populate('parcela')
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					res.json(model);

				});
			}

		} else {
			if (tipo) {
				sails.models['lectura'].find({ejercicio: ejerc, tipo: tipo})
				.populate('parcela')
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					res.json(model);

				});
			} else {
				sails.models['lectura'].find({ejercicio: ejerc})
				.populate('parcela')
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					res.json(model);

				});
			}

		}

	},

	findDate: function(req, res) {

		var hoy = new Date();

		var myDate = new Date();
		var dayOfMonth = myDate.getDate();
		myDate.setDate(dayOfMonth - 1);
		var ayer = myDate;


		sails.models['lectura'].find({finca: req.param('id'), fecha: {$gt: ayer, $lte: hoy}})
		.populate('ejercicio')
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			res.json(model);
		});

	},

	getWeekly: function (req,res) {

		var to = new Date();
		var myDate = new Date();
		var dayOfMonth = myDate.getDate();
		myDate.setDate(dayOfMonth - 15);
		var from = myDate;
		var fincaMatch = 'ObjectId("' + req.param('id') + '")';

		var query =
		[
			{
				$match: {
					fecha: {
						$gte: from,
						$lte: to
					}
				}
			},

			{
				$project: {
					_id: 0,
					fecha: 1,
					ph: 1
				}
			}

		];


		Lectura.native(function(err, collection) {
			if (err) return res.negotiate(err);

			collection.aggregate(query, function(err, result) {
				if (err) return res.negotiate(err);

				return res.json(result);
			});

		});
	}

};
