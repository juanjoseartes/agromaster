/**
* Mocultivo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    partecultivo: {
      model: 'partecult'
    },
    empleado: {
      model: 'empleado'
    },
    ejercicio: {
      model: 'ejercicio'
    },
    cantidad: {
      type: 'float',
      defaultsTo: 1
    },
    coef: {
      type: 'float'
    },
    precio: {
      type: 'float'
    }
  },

  // afterCreate: function(values, cb) {
  //   var hoy = new Date();
  //   var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
  //   console.log('EjercicioId: ' + values.ejercicio+' EmpleadoId: '+values.empleado);
  //   Mocultivo.find({createdAt: {$gt: d, $lte: hoy}, ejercicio: values.ejercicio, empleado: values.empleado})
  //   .exec(function(error, moEmplead) {
  //     if (error) return cb(error);
  //     console.log('MoEmplead: ' + JSON.stringify(moEmplead));
  //     var nTareas = moEmplead.length;
  //     var coefTareas = 1/moEmplead.length;
  //     //console.log('nTareas: ' + nTareas + ' coefTareas: ' + coefTareas);
  //     for (var t = 0; t < moEmplead.length; t++) {
  //       Mocultivo.update({id: moEmplead[t].id}, {coef: coefTareas, cantidad: nTareas})
  //       .exec(function(error, modUpd) {
  //         if (error) cb(error);
  //
  //       });
  //     };
  //     cb();
  //   });
  // },

  beforeUpdate: function(values, cb) {
    //console.log('Values: ' + JSON.stringify(values));

    var emplead = values.empleado
    //console.log('Ejercicio: ' + values.ejercicio);
    sails.models['partecult'].findOne({id: values.partecultivo})
    .exec(function(error, parteHoy) {
      if (error) return res.negotiate(error);

      var hoy = parteHoy.fecha;
      var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
      sails.models['listempleado'].findOne({fecha: {$gt: d, $lte: hoy}, ejercicio: parteHoy.ejercicio, empleado: emplead})
      .exec(function(error, list){
        if(error) return cb(error);
        var coefPrev = list.coefcult;
        sails.models['listempleado'].update({id: list.id}, {coefcult: coefPrev+values.coef})
        .exec(function(error) {
          if (error) return cb(error);
        });
      });
      cb();
    });
  },

  beforeDestroy: function(values, cb) {
    //console.log('Values: ' + JSON.stringify(values));

    var emplead = values.empleado
    //console.log('Ejercicio: ' + values.ejercicio);
    sails.models['partecult'].findOne({id: values.partecultivo})
    .exec(function(error, parteHoy) {
      if (error) return res.negotiate(error);

      var hoy = parteHoy.fecha;
      var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
      sails.models['listempleado'].findOne({fecha: {$gt: d, $lte: hoy}, ejercicio: parteHoy.ejercicio, empleado: emplead})
      .exec(function(error, list){
        if(error) return cb(error);
        var coefPrev = list.coefcult;
        sails.models['listempleado'].update({id: list.id}, {coefcult: coefPrev-values.coef})
        .exec(function(error) {
          if (error) return cb(error);
        });
      });
      cb();
    });
  },

  afterDestroy: function(values, cb) {
    sails.models['mocultivo'].find({partecultivo: values[0].partecultivo})
    .exec(function(error, mobra) {
      if(error) return cb(error);

      var nMobra = mobra.length;
      var tMobra = mobra.reduce(function(memo, res) {
        return memo + (res.coef*res.precio)
      }, 0);
      //console.log('ParteCultivo - Value.Parte: ' + values[0].partecultivo);
      sails.models['partecult'].update({id: values[0].partecultivo}, {totalmobra: tMobra, nmobra: nMobra})
      .exec(function(error, parte) {
        if (error) return cb(error);
        //console.log('Parte: ' + JSON.stringify(parte));
        //console.log('Error: ' + error);
      });

      sails.models['partecult'].update({id: values[0].partecultivo}, {totalmobra: tMobra, nmobra: nMobra})
      .exec(function(error, parte) {
        if (error) return cb(error);

        sails.models['partecult'].publishUpdate(values[0].partecultivo, parte);
      });

      cb();
    });
  },

};
