/**
* sails.models['listempleado'].js
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
    partemo: {
      model: 'partemo'
    },
    empleado: {
      model: 'empleado'
    },
    finca: {
      model: 'finca'
    },
    ejercicio: {
      model: 'ejercicio'
    },
    njornal: {
      type: 'float',
      defaultsTo: 1
    },
    precjornal: {
      type: 'float'
    },
    nhextra: {
      type: 'float',
      defaultsTo: 0
    },
    prechextra: {
      type: 'float'
    },
    nportes: {
      type: 'float',
      defaultsTo: 0
    },
    precporte: {
      type: 'float'
    },
    otros: {
      type: 'float',
      defaultsTo: 0
    },
    coefcult: {
      type: 'float',
      defaultsTo: 0
    }
  },

  //Actualizacion totales
  afterUpdate: function(values, cb){

    sails.models['listempleado'].find({partemo: values.partemo})
    .exec(function(error, listado) {
      //console.log('Listado Empleados: ' + JSON.stringify(listado));
      if (error) return cb(error);

      var jornales = listado.length;
      if (jornales) {
        var sumJorn = jornales;
      } if (!jornales) {
        var sumJorn = 0;
      };
      var sumTotal = 0;
      sumTotal = listado.reduce(function(memo, resCu) {
        return memo + ((resCu.precjornal * resCu.njornal) + (resCu.prechextra * resCu.nhextra) + (resCu.nportes * resCu.precporte)); // return previous total plus current data
      }, 0); // initialize age with 0 that will be passed as memo

      sails.models['partemo'].findOne({id: values.partemo})
      .exec(function(error, parte) {
        //console.log('Parte Sum: ' + sumTotal + ' N Jornales:' + jornales);
        if (error) return cb(error);

        if (parte.tipo == 'cultivo') {
          sails.models['partemo'].update({id: values.partemo}, {totalcult: sumTotal, ncult: sumJorn})
          .exec(function(error) {
            if (error) return cb(error);
            //cb();
          });
        };
        if (parte.tipo == 'recoleccion') {
          sails.models['partemo'].update({id: values.partemo}, {totalrecol: sumTotal, nrecol: sumJorn})
          .exec(function(error) {
            if (error) return cb(error);
            //cb();
          });
        };
        if (parte.tipo == 'encargado') {
          sails.models['partemo'].update({id: values.partemo}, {totalencarg: sumTotal, nencarg: sumJorn})
          .exec(function(error) {
            if (error) return cb(error);
            //cb();
          });
        };
      });

    cb();
    });
  },
  afterCreate: function(values, cb){

    sails.models['listempleado'].find({partemo: values.partemo})
    .exec(function(error, listado) {
      //console.log('Listado: ' + listado);
      if (error) return cb(error);

      var jornales = listado.length;
      if (jornales) {
        var sumJorn = jornales;
      } if (!jornales) {
        var sumJorn = 0;
      };
      var sumTotal = 0;
      sumTotal = listado.reduce(function(memo, resCu) {
        return memo + ((resCu.precjornal * resCu.njornal) + (resCu.prechextra * resCu.nhextra) + (resCu.nportes * resCu.precporte)); // return previous total plus current data
      }, 0); // initialize age with 0 that will be passed as memo

      sails.models['partemo'].findOne({id: values.partemo})
      .exec(function(error, parte) {
        //console.log('Parte Sum: ' + sumTotal + ' N Jornales:' + sumJorn);
        if (error) return cb(error);

        if (parte.tipo == 'cultivo') {
          sails.models['partemo'].update({id: values.partemo}, {totalcult: sumTotal, ncult: sumJorn})
          .exec(function(error) {
            if (error) return cb(error);
            //cb();
          });
        };
        if (parte.tipo == 'recoleccion') {
          sails.models['partemo'].update({id: values.partemo}, {totalrecol: sumTotal, nrecol: sumJorn})
          .exec(function(error) {
            if (error) return cb(error);
            //cb();
          });
        };
        if (parte.tipo == 'encargado') {
          sails.models['partemo'].update({id: values.partemo}, {totalencarg: sumTotal, nencarg: sumJorn})
          .exec(function(error) {
            if (error) return cb(error);
            //cb();
          });
        };
      });

      cb();
    });
  },
  afterDestroy: function(values, cb){
    //console.log('Values: ' + JSON.stringify(values));
    var parteMO = values[0].partemo;
      sails.models['listempleado'].find({partemo: parteMO})
      .exec(function(error, listado) {
        //console.log('Listado: ' + listado);
        if (error) return cb(error);

        var jornales = listado.length;
        if (jornales) {
          var sumJorn = jornales;
        } if (!jornales) {
          var sumJorn = 0;
        };
        var sumTotal = 0;
        sumTotal = listado.reduce(function(memo, resCu) {
          return memo + ((resCu.precjornal * resCu.njornal) + (resCu.prechextra * resCu.nhextra) + (resCu.nportes * resCu.precporte)); // return previous total plus current data
        }, 0); // initialize age with 0 that will be passed as memo
        //console.log('ParteMO: ' + parteMO);
        sails.models['partemo'].findOne({id: parteMO})
        .exec(function(error, parte) {
          //console.log('Parte Tipo: ' + JSON.stringify(parte));
          if (error) return cb(error);

          if (parte.tipo == 'cultivo') {
            sails.models['partemo'].update({id: parteMO}, {totalcult: sumTotal, ncult: sumJorn})
            .exec(function(error) {
              if (error) return cb(error);
              //cb();
            });
          };
          if (parte.tipo == 'recoleccion') {
            sails.models['partemo'].update({id: parteMO}, {totalrecol: sumTotal, nrecol: sumJorn})
            .exec(function(error) {
              if (error) return cb(error);
              //cb();
            });
          };
          if (parte.tipo == 'encargado') {
            sails.models['partemo'].update({id: parteMO}, {totalencarg: sumTotal, nencarg: sumJorn})
            .exec(function(error) {
              if (error) return cb(error);
              //cb();
            });
          };
        });

        cb();
      });


  }
};
