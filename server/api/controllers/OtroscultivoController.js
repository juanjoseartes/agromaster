/**
* OtroscultivoController
*
* @description :: Server-side logic for managing otroscultivoes
* @help        :: See http://links.sailsjs.org/docs/controllers
*/

module.exports = {

	findToday: function(req, res) {
		var ejerc = req.param('ejerc');
		var finca = req.param('finca');
		var tipo = req.param('tipo');

		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);

		Tipodiario.findOne({name: tipo})
		.exec(function(error, tipoDia) {
			if (error) return res.negotiate(error);

			Partecult.findOrCreate(
				{ejercicio: ejerc, fecha: {$gt: d, $lte: hoy}, tipo: tipoDia.id},
				{ejercicio: ejerc, fecha: hoy, finca: finca, tipo: tipoDia.id, totalparc: 0, nparc: 0, totalmobra: 0, nmobra: 0, totalmat: 0, nmat: 0, totalmaq: 0, nmaq: 0, totalotros: 0, notros: 0}
			)
			.exec(function(error, parte) {
				if (error) res.negotiate(error);
				if (parte == undefined) res.json(200, {message: 'Diario no encontrado'});
				if (parte) {
					Otroscultivo.find({partecultivo: parte.id})
					.exec(function(error, model) {
						if (error) res.negotiate(error);

						Otroscultivo.watch(req);
						Otroscultivo.subscribe(req.socket, model);
						res.json(model);
					});
				};
			});
		});

	},

	countToday: function(req, res) {
		var ejerc = req.param('ejerc');
		var finca = req.param('finca');
		var tipo = req.param('tipo');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var h = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);

		Tipodiario.findOne({name: tipo})
		.exec(function(error, tipoDia) {
			if (error) return res.negotiate(error);
			//console.log('TipoDia: ' + tipoDia.id);
			Partecult.findOne({fecha: {$gt: d, $lte: h}, ejercicio: ejerc, tipo: tipoDia.id})
			.exec(function(error, parte) {
				//console.log('ParteOtros: ' + parte);
				if (error) res.negotiate(error);
				if (parte == undefined) {
					return res.json(200, {n: 0});
				};
				Otroscultivo.count({partecultivo: parte.id})
				.exec(function(error, model) {
					if (error) res.negotiate(error);

					res.json(200, {n: model});
				});
			});
		});
	},

	findOne: function(req, res) {
		Otroscultivo.findOne({id: req.param('id')})
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
		var concepto = req.param('concepto');
		var precio = req.param('precio');
		var cantidad = req.param('cantidad')
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);

		Tipodiario.findOne({name: tipo})
		.exec(function(error, tipoDia) {
			if (error) return res.negotiate(error);

			Partecult.find({fecha: {$gt: d, $lte: hoy}, ejercicio: ejerc, tipo: tipoDia.id})
			.exec(function(error, parte) {
				if (error) res.negotiate(error);
				console.log('partecultivo: '+parte[0].id+' concepto: '+concepto+' cantidad: '+cantidad+' precio: '+precio+' tipo: '+tipo+' ejercicio: '+ejerc+' finca: '+finca);
				Otroscultivo.create({partecultivo: parte[0].id, concepto: concepto, cantidad: cantidad, precio: precio, tipo: tipo, ejercicio: ejerc, finca: finca})
				.exec(function(error, modelCreated) {
					if (error) res.negotiate(error);
					console.log('OtrosCreated: ' + JSON.stringify(modelCreated));
					console.log('Error: ' + error);
					Otroscultivo.publishCreate(modelCreated);
					res.json(modelCreated);
				});
			});
		});

	},

	destroy: function(req, res) {
		Otroscultivo.destroy({id: req.param('id')})
		.exec(function (err) {
			if (err) return res.negotiate(err);

			Otroscultivo.publishDestroy(req.param('id'));
		});
	},

	update: function(req, res) {
		var modelId = req.param('id');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);

		if (modelId && req.isSocket) {
			Otroscultivo.update(req.param('id'), req.params.all())
			.exec( function(err, model) {
				if (err) res.negotiate(err);

				Otroscultivo.publishUpdate(model[0].id, model);
				res.json(model);
			});
		} else if (req.isSocket) {
			Otroscultivo.find({})
			.exec(function(error, model) {
				if (error) res.negotiate(error);

				res.json(model);
			});
		}

	},


};
