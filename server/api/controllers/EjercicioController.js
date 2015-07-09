'use strict';
/**
* EjercicioController
*
* @description :: Server-side logic for managing ejercicios
* @help        :: See http://links.sailsjs.org/docs/controllers
*/
var _ = require('lodash');

module.exports = _.merge(_.cloneDeep(require('../base/Controller')),{

	update: function(req, res) {
		var modelId = req.param('id');

		sails.models['ejercicio'].update(req.param('id'), req.allParams())
		.exec( function(err, model) {
			if (err) res.negotiate(err);

			sails.models['ejercicio'].publishUpdate(modelId, model);
			res.json(model);
		});

		// if (modelId && req.isSocket) {
		// 	sails.models['ejercicio'].update(req.param('id'), req.allParams())
		// 	.exec( function(err, model) {
		// 		if (err) res.negotiate(err);
		//
		// 		sails.models['ejercicio'].publishUpdate(model[0].id, model);
		// 		res.json(model);
		// 	});
		// } else if (req.isSocket) {
		// 	sails.models['ejercicio'].find({})
		// 	.exec(function(error, model) {
		// 		if (error) res.negotiate(error);
		//
		// 		//sails.sockets.join(req.socket, modelId);
		// 		res.json(model);
		// 	});
		// }

	},

	create: function(req, res) {
		var model = {
			finca: req.param('finca'),
			name: req.param('name'),
			fchinic: req.param('fchinic'),
			fchfin: req.param('fchfin')
		};
		var espec = req.param('especies');
		sails.models['ejercicio'].create(model)
		.exec(function(error, modelCreated) {
			if (error) res.negotiate(error);

			if (!modelCreated) {
				res.send(500, 'Ejercicio no creado')
			}

			sails.models['ejercicio'].findOne({id: modelCreated.id})
			.populate('especies')
			.exec(function(error, ejercCurso) {
				if (error) return res.negotiate(error);
				if (!ejercCurso) {
					res.send(400, 'Ejercicio no encontrado.');
				}
				ejercCurso.especies.add(req.param('especies'));
				ejercCurso.save(function(error) {
					if (error) {
						res.send(500, 'Error guardando finca-usuario');
					}
				});
			});

			sails.models['ejercicio'].publishCreate(modelCreated);
			return res.json(modelCreated);
		});
	},

	getAll: function(req, res) {
		//console.log('Req: ' + JSON.stringify(req.param('id')));
		sails.models['ejercicio'].find({where: {finca: req.param('id')}, sort: {'fchinic': 0}})
		.populate('especies')
		.exec(function(error, model) {
			if (error) res.negotiate(error);
			//console.log('Model: ' + JSON.stringify(model));
			//sails.models['ejercicio'].watch(req);
			//sails.models['ejercicio'].subscribe(req.socket, model);
			res.json(model);
		})
	},


	addEspec: function(req,res,next){

		var ejercId = req.param('ejercid');
		var newEspec = req.param('especies');
		//var especId = req.param('id');
		//console.log('Especies: ' + newEspec);
		sails.models['ejercicio'].find({id: ejercId})
		.populate('especies')
		.exec(function(err, model){
			if(err) res.negotiate(err);
			if(!model) return next();
			//console.log('Model: ' + JSON.stringify(model));
			for (var i = 0; i < newEspec.length; i++) {

				var modelFilter = model[0].especies.filter(function (el) {
					return el.id == newEspec[i];
				});
				//console.log('Filter: ' + JSON.stringify(modelFilter));
				//console.log('FilterLength: ' + modelFilter.length);
				if(modelFilter.length == 0) {
					model[0].especies.add(newEspec[i]);
					//console.log('Model[0]: ' + JSON.stringify(model[0]) + ' Espec i: ' + newEspec[i]);
					model[0].save(function(err, res) {
						//if(err) res.negotiate(err);
					});
				}
				sails.models['ejercicio'].publishAdd(model[0].id, 'especies', newEspec[i]);
			};

		});
	},

	removeEspec: function(req,res,next){

		var ejercId = req.param('ejercid');
		var especId = req.param('especie');

		sails.models['ejercicio'].findOne(ejercId)
		.populate('especies')
		.exec(function (err, model) {
			if(err) res.negotiate(err);
			if(!model) return next();

			model.especies.remove(especId);
			model.save(function(err) {
				if(err) res.negotiate(err);

				Ejercicio.publishRemove(ejercId, 'especies', especId);
			});
		})
	},

	getFincaEjercs: function(req, res) {
		var id = req.param('id');
		sails.models['ejercicio'].findOne({id:id})
		.then(function(ejercData){
			//If no student found
			if(ejercData===undefined)
			return res.json({notFound:true});
			// Store Class Data
			var fincaId = ejercData.finca;
			var fincaData = sails.models['finca'].findOne({id:fincaId})
			.populate('parcelas')
			.then(function(fincaData){

				var new_finca = fincaData;
				delete new_finca.createdAt;
				delete new_finca.updatedAt;
				return new_finca;

			});
			var ejerc_data = sails.models['ejercicio'].findOne({id:req.param('id')})
			.populate('especies')
			.then(function(ejerc){
				var new_ejerc = ejerc;
				delete new_ejerc.createdAt;
				delete new_ejerc.updatedAt;
				return new_ejerc;
			});
			var ejerc_all = sails.models['ejercicio'].find({finca:fincaId})
			.then(function(allEjerc){
				var new_ejerc = allEjerc;
				delete new_ejerc.createdAt;
				delete new_ejerc.updatedAt;
				return new_ejerc;
			});


			return [fincaData,ejerc_data, ejerc_all];
		})
		.spread(function(fincaData,ejercData, ejercAll){

			var newJson = {};
			newJson.fincaname = fincaData.name;
			newJson.fincaId = fincaData.id;
			newJson.parcelas = fincaData.parcelas;
			newJson.ejercCurso = ejercData;
			newJson.ejercicios = ejercAll;
			return res.json({notFound:false, data:newJson});
		})
		.fail(function(err){
			console.log(err);
			res.json({notFound:true,error:err});
		});

	},

	getActive: function(req, res) {
		sails.models['ejercicio'].findOne({finca: req.param('id'), active: true})
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			res.json(model);
		})
	},

	findOne: function(req, res) {
		var roomId = req.param('id');
		sails.models['ejercicio'].findOne(req.param('id'))
		.populate('especies')
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			//sails.sockets.join(req.socket, roomId);
			res.json(model);
		})
	},

});
