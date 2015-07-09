/**
* Detrecoleccion.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    recoleccion: {
      collection: 'recoleccion',
      via: 'detrecoleccion'
    },
    fecha: {
      type: 'date',
      required: true
    },
    confeccion: {
      model: 'confeccion'
    },
    parcela: {
      model: 'parcela'
    },
    empleado: {
      model: 'empleado'
    },
    tag: {
      model: 'tag'
    },
    cantidad: {
      type: 'integer',
      defaultsTo: 1
    }

  },

  beforeCreate: function(values, cb) {
    Empleado.findOne({tagId: values.tag})
    .exec(function(error, empleado) {
      if (error) return cb(error);

      values.empleado = empleado.id;
      cb();
    });
  }

};
