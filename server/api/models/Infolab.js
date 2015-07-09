/**
* Infolab.js
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
    url: {
      type: 'string'
    },
    analisis: {
      collection: 'analisis',
      via: 'informes'
    }
  },

  // afterCreate: function(values, cb) {
  //   Analisis.find({id: values.analisis})
  //   .exec(function(error, model) {
  //     if (error) return cb(error);
  //
  //     Analisis.publishUpdate(model[0].id, model);
  //   });
  //   cb();
  // },
  // beforeDestroy: function(values, cb) {
  //   Infolab.findOne({id: values.id})
  //   .exec(function(error, info) {
  //     if (error) return cb(error);
  //
  //     var anaId = anaId;
  //     Analisis.find({id: values.analisis})
  //     .exec(function(error, model) {
  //       if (error) return cb(error);
  //
  //       Analisis.publishUpdate(model[0].id, model);
  //     });
  //     cb();
  //   });
  //
  // }

};
