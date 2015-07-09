/**
* Tipodiario.js
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
    pathname: {
      type: 'string'
    },
    orden: {
      type: 'string',
      numeric: true
    },
    partes: {
      collection: 'partecult',
      via: 'tipo'
    },
    active: {
      type: 'boolean',
      defaultsTo: true
    }
  }
};
