/**
* File.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
      type: 'string'
    },
    size: {
      type: 'string'
    },
    filetype: {
      type: 'string'
    },
    maquinaria: {
      model: 'maquinaria'
    },
    analisis: {
      model: 'analisis'
    }

  }
};
