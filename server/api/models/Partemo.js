/**
* Partemo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    fecha: {
      type: 'date',
      required: true
    },
    ejercicio: {
      model: 'ejercicio'
    },
    finca: {
      model: 'finca'
    },
    tipo: {
      type: 'string',
      enum: ['cultivo', 'recoleccion', 'encargado']
    },
    listempleados: {
      collection: 'listempleado',
      via: 'partemo'
    },
    totalcult: {
      type: 'float'
    },
    totalrecol: {
      type: 'float'
    },
    totalencarg: {
      type: 'float'
    },
    ncult: {
      type: 'integer'
    },
    nrecol: {
      type: 'integer'
    },
    nencarg: {
      type: 'integer'
    }
  }
};
