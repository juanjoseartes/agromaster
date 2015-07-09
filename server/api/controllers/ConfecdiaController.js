/**
 * ConfecdiaController
 *
 * @description :: Server-side logic for managing confecdias
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function(req, res) {
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
		var confecciones = req.param('confecciones');

		Recoleccion.findOrCreate({createdAt: {$gt: d, $lte: hoy}, ejercicio: req.param('ejercicio'), especie: req.param('especie')}, {ejercicio: req.param('ejercicio'), especie: req.param('especie')})
		.exec(function(error, recol) {
			if (error) return res.negotiate(error);

			var recolId = recol.id;
			console.log('Recoleccio: ' + JSON.stringify(recol));
			for (var c = 0; c<confecciones.length; c++) {
				Confecdia.findOrCreate({recoleccion: recolId, confeccion: confecciones[c]}, {recoleccion: recolId, confeccion: confecciones[c], name: '_'})
				.exec(function(error, confecc) {
					if (error) return res.negotiate(error);

					Confecdia.publishCreate(confecc);
				});
			};
			Recoleccion.publishUpdate(recol.id, recol);
		});
	},

	getToday: function(req, res) {

		var ejercicio = req.param('ejerc');
		var especie = req.param('especie');
		var hoy = new Date();
		var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);

		sails.models['recoleccion'].findOne({createdAt: {$gt: d, $lte: hoy}, ejercicio: ejercicio, especie: especie})
		.exec(function(error, recol) {
			if (error) return res.negotiate(error);

			if (recol) {
				sails.models['confecdia'].find({recoleccion: recol.id})
				.exec(function(error, model) {
					if (error) return res.negotiate(error);

					sails.models['confecdia'].subscribe(req.socket, model);
					res.json(model);
				});
			}
			else {
				res.json(200, {message: 'not found'});
			}

		});

	},

};
