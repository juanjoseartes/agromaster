var _ = require('lodash');

/**
 * EmpleadoController
 *
 * @description :: Server-side logic for managing empleadoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	getAll: function(req, res) {
		sails.models['empleado'].find({fincas: req.param('finca')})
		.sort('apellidos ASC')
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			sails.models['empleado'].watch(req);
			sails.models['empleado'].subscribe(req.socket, model);
			res.json(model);
		})
	},

	getAvailable: function(req, res) {
		var ejerc = req.param('ejercicio');
		var hoy = new Date();
		var ini = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var fin = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);

		sails.models['empleado'].find({fincas: req.param('finca'), active: true})
		.exec(function(error, model) {
			if (error) return res.negotiate(error);
			var people = [];

			_.forEach(model, function(item) {
				people.push(item.id);
			});
			//console.log('d: ' + d + ' hoy: ' + hoy);

			sails.models['listempleado'].find({fecha: {$gte: ini, $lte: fin}, ejercicio: ejerc})
			.populate('empleado')
			.exec(function(error, list) {
				if (error) return res.negotiate(error);
				//console.log('ListEmpleados: ' + JSON.stringify(list));
				var listado = [];

				_.forEach(list, function(item) {
					listado.push(item.empleado.id);
				});

				//console.log('Lista: ' + JSON.stringify(listado));
				var empleadAv = _.xor(people, listado);

				sails.models['empleado'].find({id: {"$in": empleadAv}})
				.sort('name ASC')
				.sort('apellidos ASC')
				.exec(function(error, found){
					if (error) return res.negotiate(error);

					res.json(found);
				})
			})
		})
	},

	findOne: function(req, res) {
		sails.models['empleado'].findOne({id: req.param('id')})
		.exec(function(error, model) {
			if (error) return res.negotiate(error);

			res.json(model);
		});
	},

	create: function(req, res, next) {

		//var values = req.allParams();
		//delete values.finca;
		sails.models['empleado'].findOrCreate({nif: req.param('nif')}, req.allParams())
		.exec(function(error, model) {
			//console.log('EmpleadoId: ' + model.id);
			if (error) return res.negotiate(error);

			sails.models['finca'].findOne({id: req.param('fincas')})
			.populate('empleados')
			.exec(function(error, finca) {
				if (error) return res.negotiate(error);
				if (!finca) return next();

				finca.empleados.add(model.id);
				finca.save(function(error, saved) {
					if (error) return res.negotiate(error);
				});
			});

			sails.models['empleado'].publishCreate(model);
			res.json(model);
		});
	},

	destroy: function(req, res) {
		Empleado.destroy({id: req.param('id')})
		.exec(function (err) {
			if (err) return res.negotiate(err);

			Empleado.publishDestroy(req.param('id'));
		});
	},

	update: function(req, res) {
		var modelId = req.param('id');
		if (modelId && req.isSocket) {
			sails.models['empleado'].update(req.param('id'), req.params.all())
			.exec( function(err, model) {
				if (err) res.negotiate(err);

				sails.models['empleado'].publishUpdate(model[0].id, model);
				res.json(model);
			});
		} else if (req.isSocket) {
			sails.models['empleado'].find({})
			.exec(function(error, model) {
				if (error) res.negotiate(error);

				res.json(model);
			});
		}

	},


};
