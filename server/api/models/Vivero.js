/**
* Vivero.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    nreg: {
      type: 'string'
    },
    name: {
      type: 'string',
      required: true
    },
    direccion: {
      type: 'string'
    },
    ccaa: {
      type: 'string'
    },
    provincia: {
      type: 'string'
    },
    poblacion: {
      type: 'string'
    }

  }
};
