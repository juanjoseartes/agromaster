/**
* Analisis.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    ejercicio: {
      model: 'ejercicio',
      required: true
    },
    tipo: {
      type: 'string',
      enum: ['suelo', 'planta', 'agua'],
      required: true
    },
    fecha: {
      type: 'date',
      required: true
    },
    nref: {
      type: 'string',
      required: true
    },
    muestra: {
      type: 'string'
    },
    motivo: {
      type: 'string'
    },
    laboratorio: {
      model: 'laboratorio'
    },
    informes: {
      collection: 'infolab',
      via: 'analisis'
    }

  }
};
