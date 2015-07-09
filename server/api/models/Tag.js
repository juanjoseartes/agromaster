/**
* Tag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    code: {
      type: 'string',
      required: true,
      unique: true
    },
    tipo: {
      type: 'string',
      enum: ['normal', 'maestra']
    },
    emplCurso: {
      model: 'empleado'
    },
    emplHist: {
      collection: 'empleado',
      via: 'tags',
      dominant: true
    }
  }
};
