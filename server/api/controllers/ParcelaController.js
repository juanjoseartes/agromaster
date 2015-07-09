/**
 * sails.models['parcela']Controller
 *
 * @description :: Server-side logic for managing parcelas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	getAll: function(req, res) {
		var finca = req.param('id');
		sails.models['parcela'].find({finca: finca})
		.exec(function(error, models) {
			if (error) res.negotiate(error);

			res.json(models);
		})
	},

	findOne: function(req, res) {
		var parc = req.param('id');
		sails.models['parcela'].findOne({id: parc})
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			//sails.sockets.join(req.socket, roomId);
			res.json(model);
		})
	},

	getActive: function(req, res) {
		sails.models['parcela'].find({finca: req.param('id'), active: true})
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			res.json(model);
		})
	},

	update: function(req, res) {
		var data = {
			name: req.param('name'),
			suptotal: req.param('suptotal'),
			supcult: req.param('supcult'),
			active: req.param('active')
		};
		//console.log('Req: ' + JSON.stringify(data));
		var modelId = req.param('id');
		sails.models['parcela'].update({id: req.param('id')}, data)
			.exec( function(err, model) {
				if (err) res.negotiate(err);

				sails.models['parcela'].publishUpdate(modelId, model);
				res.json(model);
			});

		// if (modelId && req.isSocket) {
		// 	sails.models['parcela'].update(req.param('id'), req.params.all())
		// 		.exec( function(err, model) {
		// 			if (err) res.negotiate(err);
		//
		// 			sails.models['parcela'].publishUpdate(model[0].id, model);
		// 			res.json(model);
		// 		});
		// } else if (req.isSocket) {
		// 	sails.models['parcela'].find({})
		// 		.exec(function(error, model) {
		// 			if (error) res.negotiate(error);
		//
		// 			res.json(model);
		// 		});
		// }

	},

	create: function(req, res) {
		sails.models['parcela'].create(req.allParams(), function(error, model) {
			if (error) res.negotiate(error);

			sails.models['parcela'].publishCreate(model);
			res.json(model);
		});
	}


};
