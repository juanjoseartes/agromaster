/**
* Analisis.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  autosubscribe: ['create', 'update', 'destroy'],

  attributes: {

    fecha: {
      type: 'date'
    },
    finca: {
      model: 'finca'
    },
    parcela: {
      model: 'parcela'
    },
    ejercicio: {
      model: 'ejercicio'
    },
    usuario: {
      model: 'user'
    },
    tipo: {
      type: 'string',
      enum: ['ph', 'ec']
    },
    valor: {
      type: 'float'
    }

  },

};
