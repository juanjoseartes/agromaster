/**
* Provincia.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    codprov: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    poblaciones: {
      collection: 'poblacion',
      via: 'provincia'
    }

  }
};
