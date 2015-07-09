/**
* Laboratorio.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    nreg: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
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
    },
    telef: {
      type: 'string'
    },
    email: {
      type: 'email'
    },
    dirtec: {
      type: 'string'
    }

  }
};
