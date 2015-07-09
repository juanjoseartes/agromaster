/**
* Recoleccion.js
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
    especie: {
      model: 'especie',
      required: true
    },
    confeccionesDia: {
      collection: 'confecdia',
      via: 'recoleccion'
    },
    detrecoleccion: {
      collection: 'detrecoleccion',
      via: 'recoleccion'
    }
    // finca: {
    //   model: 'finca',
    //   required: true
    // },
    // variedades: {
    //   model: 'variedad'
    // },
    // morecolecc: {
    //   collection: 'morecolecc',
    //   via: 'recoleccion'
    // },
    // matrecolecc: {
    //   collection: 'matrecolecc',
    //   via: 'recoleccion'
    // },
    // cantidad: {
    //   type: 'integer'
    // }

  }
};
