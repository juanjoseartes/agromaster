/**
* Confeccion.js
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
    ejercicio: {
      model: 'ejercicio'
    },
    especie: {
      model: 'especie'
    },
    categ: {
      type: 'string',
      enum: ['e', '1', '2', 'i', 'd']
    },
    nenvases: {
      type: 'integer',
      defaultsTo: 1
    },
    pesounit: {
      type: 'float',
      defaultsTo: 0
    },
    unidad: {
      model: 'unidad'
    }

  }
};
