/**
* Detcompra.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  autosubscribe: ['create', 'destroy', 'update'],

  attributes: {

    albaran: {
      model: 'albcompra',
    },
    factura: {
      model: 'factcompra',
    },
    finca: {
      model: 'finca',
      required: true
    },
    articulo: {
      model: 'articulo',
      required: true
    },
    producto: {
      model: 'producto'
    },
    almacen: {
      type: 'string',
      enum: ['abonos', 'fitosanitarios', 'material vegetal', 'otros']
    },
    cant: {
      type: 'float',
      defaultsTo: 1
    },
    capenvase: {
      type: 'float',
      defaultsTo: 1
    },
    udenvase: {
      model: 'unidad'
    },
    udsstock: {
      type: 'float'
    },
    precunit: {
      type: 'float'
    },
    dtoperc: {
      type: 'float',
      min: '0',
      max: '100'
    },
    dtomoned: {
      type: 'float'
    },
    tipoiva: {
      model: 'iva'
    }
  }

  // afterValidate: function (values, cb) {
  //   Detcompra.find({finca: values.finca, articulo: values.articulo})
  //   .populate('udenvase')
  //   .exec(function(error, compras) {
  //     if (error) return cb(error);
  //
  //     var udsCompra = compras.reduce(function(memo, compra) {
  //       return memo + (compra.cantidad*compra.capenvase*compra.udenvase.coefconvert); // return previous total plus current data
  //     }, 0); // initialize age with 0 that will be passed as memo
  //     var impCompra = compras.reduce(function(memo, compra) {
  //       return memo +( ((compra.cantidad*compra.precunit)-(compra.dtomoned))-((compra.cantidad*compra.precunit)*(compra.dtoperc/100)) ); // return previous total plus current data
  //     }, 0); // initialize age with 0 that will be passed as memo
  //
  //     Producto.update({id: values.producto}, {udsEnt: udsCompra, impEnt: impCompra})
  //     .exec(function(error, model) {
  //       if (error) return cb(error);
  //     });
  //     cb();
  //   });
  // }

};
