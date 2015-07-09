/**
* Factcompra.js
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
    finca: {
      model: 'finca',
      required: true
    },
    nfact: {
      type: 'string'
    },
    pagado: {
      type: 'boolean'
    },
    detalles: {
      collection: 'detcompra',
      via: 'factura'
    },


  }
};
