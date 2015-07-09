/**
* Repartocult.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    partecultivo: {
      model: 'partecult'
    },
    ejercicio: {
      model: 'ejercicio'
    },
    finca: {
      model: 'finca'
    },
    parcela: {
      model: 'parcela'
    },
    tipodiario: {
      model: 'tipodiario'
    },
    coef: {
      type: 'float'
    },
    mobra: {
      type: 'float'
    },
    mat: {
      type: 'float'
    },
    maq: {
      type: 'float'
    },
    otros: {
      type: 'float'
    },
    total: {
      type: 'float'
    }


  }
};
