'use strict';

var _ = require('lodash');

/**
* Ejercicio.js
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
    finca: {
      model: 'finca'
    },
    especies: {
      collection: 'especie',
      via: 'ejercicios',
      dominant: true
    },
    fchinic: {
      type: 'datetime',
      required: true
    },
    fchfin: {
      type: 'datetime',
      required: true
    },
    active: {
      type: 'boolean',
      defaultsTo: true
    }

  }
});
