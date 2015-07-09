/**
* Producto.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    articulo: {
      model: 'articulo'
    },
    finca: {
      model: 'finca'
    },
    almacen: {
      type: 'string',
      enum: ['abonos', 'fitosanitarios', 'material vegetal']
    },
    proveedores: {
      collection: 'proveedor',
      via: 'productos',
      dominant: true
    },
    tipounidad: {
      type: 'string',
      enum: ['Peso', 'Volumen'],
      defaultsTo: 'Peso'
    },
    entradas: {
      collection: 'detcompra',
      via: 'producto'
    },
    udsEnt: {
      type: 'float'
    },
    impEnt: {
      type: 'float'
    },
    salidas: {
      collection: 'matcultivo',
      via: 'producto'
    },
    udsSal: {
      type: 'float'
    },
    impSal: {
      type: 'float'
    },
    regulariz: {
      collection: 'regstock',
      via: 'producto'
    },
    udsRegul: {
      type: 'float'
    },
    impRegul: {
      type: 'float'
    }
    // precmed: {
    //   type: 'float',
    //   defaultsTo: 0
    // },
    // stock: {
    //   type: 'float',
    //   defaultsTo: 0
    // }

  },

  // afterUpdate: function (values, cb) {
  //   console.log('Values: ' + JSON.stringify(values));
  //   Producto.findOne({id: values.id})
  //   .exec(function(error, producto) {
  //     if (error) return cb(error);
  //     console.log('Producto: ' + JSON.stringify(producto));
  //     values.stock = (producto.udsEnt || 0) + (producto.udsSal || 0) + (producto.udsRegul || 0);
  //     values.precmed = ((producto.impEnt || 0))/(producto.udsEnt || 1);
  //     cb();
  //     });
  // }

};
