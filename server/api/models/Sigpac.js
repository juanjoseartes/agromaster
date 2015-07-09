/**
* Sigpac.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    provincia: {
      model: 'provincia',
      required: true
    },
    poblacion: {
      model: 'poblacion',
      required: true
    },
    poligono: {
      type: 'number',
      required: true
    },
    parcela: {
      type: 'number',
      required: true
    },
    recinto: {
      type: 'number'
    },
    finca: {
      model: 'finca'
    }

  }
};
