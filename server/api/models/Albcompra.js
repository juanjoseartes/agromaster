/**
* Albcompra.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    fch: {
      type: 'date',
      required: true
    },
    proveedor: {
      model: 'proveedor',
      required: true
    },
    provName: {
      type: 'string'
    },
    finca: {
      model: 'finca',
      required: true
    },
    nalb: {
      type: 'string'
    },
    facturado: {
      type: 'boolean'
    },
    detalles: {
      collection: 'detcompra',
      via: 'albaran'
    }

  },
  afterCreate: function(values, cb) {
    Proveedor.findOne({id: values.proveedor})
    .exec(function(error, proveedor) {
      if (error) return cb(error);

      values.provName = proveedor.name;
      cb();
    });
  }
};
