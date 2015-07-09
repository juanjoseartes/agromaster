/**
 * DetcompraController
 *
 * @description :: Server-side logic for managing detcompras
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function(req, res) {
		var newProduct = {
			finca: req.param('finca'),
			articulo: req.param('articulo'),
			almacen: req.param('almacen')
		};

		Producto.findOrCreate({finca: req.param('finca'), articulo: req.param('articulo')}, newProduct)
		.exec(function(err, product) {
			if (err) res.negotiate(err);

			var newLinea = {
				finca: req.param('finca'),
				articulo: req.param('articulo'),
				albaran: req.param('albaran'),
				almacen: req.param('almacen'),
				udenvase: req.param('udenvase'),
				producto: product.id
			};

			Detcompra.create(newLinea)
			.exec(function(err, model) {
				if (err) res.negotiate(err);

				// Detcompra.publishCreate(model);
				res.json(model);
			});
		});
	},

	destroy: function(req, res) {
		Detcompra.destroy(req.param('id'))
		.exec(function(err) {

			Detcompra.publishDestroy(req.param('id'));
		});
	},

	update: function(req, res) {

		//console.log('Params: ' + JSON.stringify(req.allParams()));
		Detcompra.update({id:req.param('id')},req.allParams())
		.exec(function afterwards(err,model) {

			//console.log('Model: ' + JSON.stringify(updated));
			if (err) res.negotiate(err);

			Detcompra.find({finca: model[0].finca, articulo: model[0].articulo})
			.populate('udenvase')
			.exec(function(error, compras) {
				if (error) return res.negotiate(error);
				//console.log('Compras: ' + JSON.stringify(compras));

				var udsCompra = 0;
				var impCompra = 0;

				var udsCompra = compras.reduce(function(memo, compra) {
					return memo + (compra.cant*compra.capenvase*compra.udenvase.coefconvert); // return previous total plus current data
				}, 0); // initialize age with 0 that will be passed as memo
				var impCompra = compras.reduce(function(memo, compra) {
					return memo +( ((compra.cant*compra.precunit)-((compra.dtomoned) || 0))-((compra.cant*compra.precunit)*((compra.dtoperc || 0)/100)) ); // return previous total plus current data
				}, 0); // initialize age with 0 that will be passed as memo
				console.log('Uds: ' + udsCompra + ' impCompra: ' + impCompra + ' ProdId: ' + model[0].producto);
				Producto.update({id: model[0].producto}, {id: model[0].producto, tipounidad: compras[0].udenvase.tipo, udsEnt: udsCompra, impEnt: impCompra})
				.exec(function(error, product) {
					if (error) return res.negotiate(error);
				});
			});

			Detcompra.publishUpdate(model[0].id, model);
			res.json(model);
		});
	},


	findOne: function(req, res) {
		Detcompra.findOne(req.param('id'))
		//.populate('udenvase')
		.populate('articulo')
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			res.json(model);
		});
	},

	getAll: function(req, res) {

			if (req.param('almacen')) {
				Detcompra.find({albaran: req.param('id'), almacen: req.param('almacen')})
					.populate('articulo')
					.populate('udenvase')
					.exec(function (err, model) {
						if (err) res.negotiate(err);

						Detcompra.watch(req);
						Detcompra.subscribe(req.socket, model);
						res.json(model);
					});
			} else {
				Detcompra.find({albaran: req.param('id')})
					.populate('articulo')
					.populate('udenvase')
					.exec(function (err, model) {
						if (err) res.negotiate(err);

						Detcompra.watch(req);
						Detcompra.subscribe(req.socket, model);
						res.json(model);
					});
			}


		},

	getNLineas: function(req, res) {
		Detcompra.count({albaran: req.param('albId'), almacen: req.param('name')})
		.exec(function(err, nFound) {
			if (err) res.negotiate(err);

			res.send({n: nFound});
		})
	}

};
