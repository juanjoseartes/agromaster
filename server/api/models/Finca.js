'use strict';

var _ = require('lodash');

/**
* Finca.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = _.merge(_.cloneDeep(require('../base/Model')), {
  attributes: {

    name: {
      type: 'string',
      required: true
    },
    localidad: {
      type: 'string'
    },
    provincia: {
      type: 'string'
    },
    parcelas: {
      collection: 'parcela',
      via: 'finca'
    },
    ejercicios: {
      collection: 'ejercicio',
      via: 'finca'
    },
    empleados: {
      collection: 'empleado',
      via: 'fincas',
      dominant: true
    },
    proveedores: {
      collection: 'proveedor',
      via: 'fincas',
      dominant: true
    },
    usuarios: {
      collection: 'user',
      via: 'fincas',
      dominant: true
    },
    // tipodiarios: {
    //   collection: 'tipodiario',
    //   via: 'fincas',
    //   dominant: true
    // },
    productos: {
      collection: 'producto',
      via: 'finca'
    },
    sigpac: {
      collection: 'sigpac',
      via: 'finca'
    }
  }
});
