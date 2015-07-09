/**
* Stock.js
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
    finca: {
      model: 'finca',
      required: true
    },
    producto: {
      model: 'producto',
      required: true
    },
    cantidad: {
      type: 'float'
    }

  }
};
