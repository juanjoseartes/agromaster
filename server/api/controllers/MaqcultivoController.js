/**
 * MaqcultivoController
 *
 * @description :: Server-side logic for managing maqcultivoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	findToday: function(req, res) {
		var ejerc = req.param('ejerc');
		var finca = req.param('finca');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var tipo = req.param('tipo');

		Tipodiario.findOne({name: tipo})
		.exec(function(error, tipoDia) {
			if (error) return res.negotiate(error);

			Partecult.findOrCreate(
				{ejercicio: ejerc, fecha: {$gt: d, $lte: hoy}, tipo: tipoDia.id},
				{ejercicio: ejerc, finca: finca, fecha: hoy, tipo: tipoDia.id, totalparc: 0, nparc: 0, totalmobra: 0, nmobra: 0, totalmat: 0, nmat: 0, totalmaq: 0, nmaq: 0, totalotros: 0, notros: 0}
			)
			.exec(function(error, parte) {
				if (error) res.negotiate(error);

				Maqcultivo.find({partecultivo: parte.id})
				.populate('maquinaria')
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					Maqcultivo.watch(req);
					Maqcultivo.subscribe(req.socket, model);
					res.json(model);
				});
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

		Tipodiario.findOne({name: tipo})
		.exec(function(error, tipoDia) {
			if (error) return res.negotiate(error);

			Partecult.findOne({fecha: {$gte: d, $lte: h}, ejercicio: ejerc, tipo: tipoDia.id})
			.exec(function(error, parte) {
				if (error) res.negotiate(error);
				if (parte == undefined) {
					return res.json(200, {n: 0});
				};
				Maqcultivo.count({partecultivo: parte.id})
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					res.json(200, {n: model});
				});
			});
		});
	},

	findOne: function(req, res) {
		Maqcultivo.findOne({id: req.param('id')})
		.populate('maquinaria')
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			//sails.sockets.join(req.socket, roomId);
			res.json(model);
		})
	},

	create: function(req, res) {
		var ejerc = req.param('ejercicio');
		var finca = req.param('finca');
		var tipo = req.param('tipo');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var newMaq = req.param('maquinas');
		//console.log('Params: ' + JSON.stringify(req.allParams()));
		Tipodiario.findOne({name: tipo})
		.exec(function(error, tipoDia) {
			if (error) return res.negotiate(error);
			//console.log('TipoDiario: ' + JSON.stringify(tipoDia));
			Partecult.findOne({ejercicio: ejerc, fecha: {$gt: d, $lte: hoy}, tipo: tipoDia.id})
			.exec(function(error, parte) {
				if (error) res.negotiate(error);
				//console.log('Parte: ' + JSON.stringify(parte));

				for (var i = 0; i < newMaq.length; i++) {

					Maquinaria.findOne({id: newMaq[i]})
					.exec(function(error, maq) {
						if (error) return res.negotiate(error);
						//console.log('Maq: ' + JSON.stringify(maq));
						var litProp = maq.propiedad;
						var litMaq = maq.marca +' ' + maq.modelo;
						//console.log('partecultivo: '+parte.id+' maquinaria: '+maq.id+' litProp: '+litProp+' cantidad: '+0+' precio: ' +0+' litMaq: ' + litMaq);
						Maqcultivo.findOrCreate({partecultivo: parte.id, maquinaria: maq.id},{partecultivo: parte.id, maquinaria: maq.id, litProp: litProp, litMaq: litMaq, cantidad:0, precio:0})
						.exec(function(error, modelCreated) {
							if (error) return res.negotiate(error);
							//console.log('MaqCreated: ' + JSON.stringify(modelCreated));
							Maqcultivo.publishCreate(modelCreated);
						});
					});


				};

				Maqcultivo.find({partecultivo: parte.id, })
				.populate('maquinaria')
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					res.json(model);
				});
			});
		});

	},

	destroy: function(req, res) {
		Maqcultivo.destroy({id: req.param('id')})
		.exec(function (err) {
			if (err) return res.negotiate(err);

			Maqcultivo.publishDestroy(req.param('id'));
		});
	},

	update: function(req, res) {
		var modelId = req.param('id');
		if (modelId && req.isSocket) {
			Maqcultivo.update(req.param('id'), req.params.all())
			.exec( function(err, model) {
				if (err) res.negotiate(err);

				Maqcultivo.publishUpdate(model[0].id, model);
				res.json(model);
			});
		} else if (req.isSocket) {
			Maqcultivo.find({})
			.exec(function(error, model) {
				if (error) res.negotiate(error);

				res.json(model);
			});
		}

	},



};
