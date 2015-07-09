/**
* Residuos.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    ejercicio: {
      model: 'ejercicio'
    },
    fecha: {
      type: 'date'
    },
    gestor: {
      model: 'proveedor'
    },
    tipo: {
      type: 'string'
    },
    nalbaran: {
      type: 'string'
    },
    albaranes: {
      collection: 'docresiduos',
      via: 'residuos'
    },
    obs: {
      type: 'string'
    }

  }
};
