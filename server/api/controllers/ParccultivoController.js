/**
* sails.models['parccultivo']Controller
*
* @description :: Server-side logic for managing parccultivoes
* @help        :: See http://links.sailsjs.org/docs/controllers
*/

module.exports = {

	findToday: function(req, res) {
		var ejerc = req.param('ejerc');
		var finca = req.param('finca');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var tipo = req.param('tipo');

		sails.models['tipodiario'].findOne({name: tipo})
		.exec(function(error, tipoDia) {
			if (error) return res.negotiate(error);
			//console.log('AllParams: ' + JSON.stringify(req.allParams()));
			sails.models['partecult'].findOne({ejercicio: ejerc, fecha: {$gt: d, $lte: hoy}, tipo: tipoDia.id})
			.exec(function(error, parte) {
				if (error) return res.negotiate(error);
				if (parte == undefined || '') return res.json(200, {message: 'Diario de cultivo no existente'});
				if (parte) {
					sails.models['parccultivo'].find({partecultivo: parte.id})
					.populate('parcela')
					.exec(function(error, model) {

						if (error) res.negotiate(error);
						if (!model) res.json(200, {message: 'No hay parcelas asignadas'});

						sails.models['parccultivo'].watch(req);
						sails.models['parccultivo'].subscribe(req.socket, model);
						res.json(model);
					});
				};
			});
		});

	},

	countToday: function(req, res) {
		var ejerc = req.param('ejerc');
		var finca = req.param('finca');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var h = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);
		var tipo = req.param('tipo');


		sails.models['tipodiario'].findOne({name: tipo})
		.exec(function(error, tipoDia) {
			if (error) return res.negotiate(error);

			sails.models['partecult'].findOne({fecha: {$gte: d, $lte: h}, ejercicio: ejerc, tipo: tipoDia.id})
			.exec(function(error, parte) {
				if (error) res.negotiate(error);
				//console.log('ParteParc: ' + parte);
				if (parte == undefined) {
					return res.json(200, {n: 0});
				};
				sails.models['parccultivo'].count({partecultivo: parte.id})
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					res.json(200, {n: model});
				});
			});
		});

	},

	findOne: function(req, res) {
		sails.models['parccultivo'].findOne({id: req.param('id')})
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			res.json(model);
		})
	},


	create: function(req, res) {
		var ejerc = req.param('ejercicio');
		var finca = req.param('finca');
		var tipo = req.param('tipo');
		var treparto = req.param('treparto');
		var inicio = req.param('inicio');
		var fin = req.param('fin');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var newParc = req.param('parcelas');
		//console.log('Reparto: ' + req.param('treparto'));
		sails.models['tipodiario'].findOne({name: tipo})
		.exec(function(error, tipoDia) {
			if (error) return res.negotiate(error);
			//console.log('TipoDia: ' + tipoDia.id + ' , name: ' + tipoDia.name + ', ejerc: ' + ejerc + ', fecha: ' + hoy);
			sails.models['partecult'].findOrCreate(
				{ejercicio: ejerc, fecha: {$gt: d, $lte: hoy}, tipo: tipoDia.id},
				{ejercicio: ejerc, fecha: hoy, tipo: tipoDia.id, finca: finca}
				)
			.exec(function(error, parte) {
				if (error) res.negotiate(error);

				//console.log("ParteId: " + JSON.stringify(parte));
				if (treparto == 't') {
					for (var i = 0; i < newParc.length; i++) {
						sails.models['parccultivo'].findOrCreate(
							{partecultivo: parte.id, parcela: newParc[i]},
							{partecultivo: parte.id, parcela: newParc[i], inicio: inicio, fin: fin, superf: 0})
						.exec(function(error, parcCreated) {
							if (error) return res.negotiate(error);

							sails.models['parccultivo'].publishCreate(parcCreated);
						});
					};
				};
				if(treparto == 's') {
					sails.models['parcela'].find({finca: finca, active: true})
					.exec(function(error, parcelas) {
						if (error) return res.negotiate(error);

						for (var p=0; p < parcelas.length; p++) {
							//console.log('ParteId: ' + parte.id + ', parcela: ' + parcelas[p].id + ', supCultivo: ' + parcelas[p].supcult);
							sails.models['parccultivo'].findOrCreate(
								{partecultivo: parte.id, parcela: parcelas[p].id},
								{partecultivo: parte.id, parcela: parcelas[p].id, superf: parcelas[p].supcult, inicio: 0, fin: 0, all: true})
							.exec(function(error, parcCreated) {
								if (error) return res.negotiate(error);

								sails.models['parccultivo'].publishCreate({id: parcCreated.id});
							});
						};
					})
				};

				sails.models['parccultivo'].find({partecultivo: parte.id, })
				.populate('parcela')
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					//sails.models['parccultivo'].publishCreate(model);
					res.json(model);
				});

				//sails.models['partecult'].publishUpdate(parte.id, parte);
			});
		});
	},

	destroy: function(req, res) {
		sails.models['parccultivo'].destroy({id: req.param('id')})
		.exec(function (err) {
			if (err) return res.negotiate(err);

			sails.models['parccultivo'].publishDestroy(req.param('id'));
		});
	},

	update: function(req, res) {
		var modelId = req.param('id');

		if (modelId && req.isSocket) {
			sails.models['parccultivo'].update(req.param('id'), req.allParams())
			.exec( function(err, model) {
				if (err) res.negotiate(err);

				sails.models['parccultivo'].publishUpdate(model[0].id, model);
				res.json(model);
			});
		} else if (req.isSocket) {
			sails.models['parccultivo'].find({})
			.exec(function(error, model) {
				if (error) res.negotiate(error);

				res.json(model);
			});
		}
	},

};
