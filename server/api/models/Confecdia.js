/**
* Confecdia.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    recoleccion: {
      model: 'recoleccion'
    },
    confeccion: {
      model: 'confeccion'
    },
    name: {
      type: 'string'
    }

  },

  beforeCreate: function(values, cb) {
    console.log('ConfecDia Values: ' + JSON.stringify(values));
    Confeccion.findOne({id: values.confeccion})
    .exec(function(error, confecc) {
      if (error) return cb(error);

      values.name = confecc.name;
      cb();
    });
  },
  beforeUpdate: function(values, cb) {
    Confeccion.findOne({id: values.confeccion})
    .exec(function(error, confecc) {
      if (error) return cb(error);

      values.name = confecc.name;
      cb();
    });
  },

};
