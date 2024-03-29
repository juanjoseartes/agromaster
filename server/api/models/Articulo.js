/**
* Articulo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {

    name: {
      type: 'string',
      required: true
    },
    nreg: {
      type: 'string'
    },
    formulado: {
      type: 'string'
    },
    titular: {
      type: 'string'
    },
    precmed: {
      type: 'integer'
    },
    productos: {
      collection: 'producto',
      via: 'articulo'
    },
    almacen: {
      type: 'string',
      enum: ['abonos', 'fitosanitarios', 'material vegetal', 'otros']
    }


  }

};
