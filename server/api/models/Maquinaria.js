/**
* Maquinaria.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    marca: {
      type: 'string',
      required: true
    },
    modelo: {
      type: 'string'
    },
    finca: {
      model: 'finca'
    },
    tipomaq: {
      model: 'tipomaq'
    },
    grupomaq: {
      model: 'grupomaq'
    },
    matricula: {
      type: 'string'
    },
    potencia: {
      type: 'float'
    },
    capfuel: {
      type: 'float'
    },
    year: {
      type: 'integer'
    },
    valor: {
      type: 'float'
    },
    vida: {
      type: 'integer'
    },
    amort: {
      type: 'float'
    },
    finamort: {
      type: 'integer'
    },
    propiedad: {
      type: 'string',
      enum: ['propiedad', 'alquiler']
    },
    proveedor: {
      model: 'proveedor'
    },
    notas: {
      type: 'string'
    },
    images: {
      collection: 'file',
      via: 'maquinaria'
    }

  },

  afterCreate: function(values, cb) {
    if(values.vida > 0) {
      Maquinaria.update({id: values.id}, {finamort: (values.year*(1) + values.vida*(1)), amort: values.valor/values.vida})
      .exec(function(error) {
        if (error) return cb(error);
      });
    };
    cb();
  },
  afterUpdate: function(values, cb) {
    if(values.vida > 0) {
      Maquinaria.update({id: values.id}, {finamort: (values.year*(1) + values.vida*(1)), amort: values.valor/values.vida})
      .exec(function(error) {
        if (error) return cb(error);
      });
    };
    cb();
  },


};
