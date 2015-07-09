/**
* Matrecolecc.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    // recoleccion: {
    //   model: 'recoleccion'
    // },
    parcela: {
      model: 'parcela',
      required: true
    },
    confeccion: {
      model: 'confeccion',
      required: true
    },
    empleado: {
      model: 'empleado',
      required: true
    },
    hora: {
      type: 'datetime'
    },
    cantidad: {
      type: 'integer'
    }

  }
};
