/**
* Proveedor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },
    fincas: {
      collection: 'finca',
      via: 'proveedores'
    },
    productos: {
      collection: 'producto',
      via: 'proveedores'
    },
    maquinas: {
      collection: 'maquinaria',
      via: 'proveedor'
    },
    telef: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    nif: {
      type: 'string'
    },
    direccion: {
      type: 'string'
    },
    codpostal: {
      type: 'string'
    },
    poblac: {
      type: 'string'
    },
    provincia: {
      type: 'string'
    }

  }
};
