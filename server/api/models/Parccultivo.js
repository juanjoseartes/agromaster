/**
* sails.models['parccultivo'].js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  autosubscribe: ['create', 'update','destroy'],

  attributes: {

    partecultivo: {
      model: 'partecult'
    },
    parcela: {
      model: 'parcela',
      required: true
    },
    superf: {
      type: 'float'
    },
    inicio: {
      type: 'datetime'
    },
    fin: {
      type: 'datetime'
    },
    descripcion: {
      type: 'string'
    },
    all: {
      type: 'boolean',
      defaultsTo: false
    }
  },

  afterCreate: function(values, cb) {
    sails.models['parccultivo'].find({partecultivo: values.partecultivo})
    .exec(function(error, parcelas) {
      if (error) return cb(error);

      //var nParcelas = parcelas.length;

      if (!values.all) {
        //Reparto por tiempo empleado
        var tParcelas = parcelas.reduce(function(memo, res) {
          var F = 0;
          var I = 0;
          if (res.inicio && res.fin) {
            var inic = new Date(res.inicio);
            var I = inic.getTime();
            var fin = new Date(res.fin);
            var F = fin.getTime();
          }
          return memo + (F-I);
        }, 0);

        var parcCurso = parcelas.filter(function (el) {
          return el.parcela == values.parcela;
        });
        var tParcCurso = parcCurso.reduce(function(memo, res) {
          var F = 0;
          var I = 0;
          if (res.inicio && res.fin) {
            var inic = new Date(res.inicio);
            var I = inic.getTime();
            var fin = new Date(res.fin);
            var F = fin.getTime();
          }
          return memo + (F-I);
        }, 0);

        //console.log('Tsails.models['parcela']s: ' + tParcelas + ' TParcCurso: ' + tParcCurso);
        sails.models['partecult'].update({id: values.partecultivo}, {totalparc: tParcelas})
        .exec(function(error, parte) {
          if (error) return cb(error);

          var ejercicio = parte[0].ejercicio;
          var tipodia = parte[0].tipo;
          var mat = parte.totalmat;
          var maq = parte.totalmaq;
          var mobra = parte.totalmobra;
          var otros = parte.totalotros;
          //console.log('partecultivo:' +values.partecultivo+' ejercicio:' +ejercicio+' parcela:'+ values.parcela+' tipodiario:'+ tipodia);
          sails.models['repartocult'].findOrCreate(
            {partecultivo: values.partecultivo, parcela: values.parcela, tipodiario: tipodia},
            {partecultivo: values.partecultivo, parcela: values.parcela, tipodiario: tipodia, ejercicio: ejercicio, coef: 0, mat: 0, maq: 0, mobra: 0, otros: 0})
          .exec(function(error, reparto) {
            if (error) return cb(error);

            // var coef = tParcCurso/(tParcelas || 1);
            // sails.models['repartocult'].update({id: reparto.id}, {coef: coef, mat: mat*coef, maq: maq*coef, mobra: mobra*coef, otros: otros*coef}).
            // exec(function(error) {
            //   if (error) return cb(error);
            // });
          });
          //console.log('ParteId: ' + parte.id + ' values-parte: ' + values.partecultivo + ' parte: ' + JSON.stringify(parte));
          sails.models['partecult'].publishUpdate(values.partecultivo, parte);
        });

      } if (values.all) {
        //Reparto por superficie de las parcelas
        //console.log("Values: " + JSON.stringify(values));
        sails.models['partecult'].findOne({id: values.partecultivo})
        .exec(function(error, parte) {
          if (error) return cb(error);
          //console.log("Parte: " + JSON.stringify(parte));
          var ejercicio = parte.ejercicio;
          var finca = parte.finca;
          var tipodia = parte.tipo;
          var mat = parte.totalmat;
          var maq = parte.totalmaq;
          var mobra = parte.totalmobra;
          var otros = parte.totalotros;
          sails.models['parcela'].findOne({id: values.parcela})
          .exec(function(error, parcela) {
            if (error) return cb(error);

            var supParc = parcela.supcult;
            sails.models['parcela'].find({finca: finca, active: true})
            .exec(function(error, parcelas) {
              if (error) return cb(error);

              var tParcelas = parcelas.reduce(function(memo, res) {
                return memo + res.supcult;
              }, 0);
              //var nParcelas = parcelas.length;

              sails.models['partecult'].update({id: values.partecultivo}, {totalparc: tParcelas})
              .exec(function(error, parte) {
                if (error) return cb(error);

                sails.models['repartocult'].findOrCreate({partecultivo: values.partecultivo, parcela: values.parcela, tipodiario: tipodia}, {partecultivo: values.partecultivo, ejercicio: ejercicio, parcela: values.parcela, tipodiario: tipodia})
                .exec(function(error, reparto) {
                  if (error) return cb(error);

                  var coef = supParc/(tParcelas || 1);
                  sails.models['repartocult'].update({id: reparto.id}, {coef: coef, mat: mat*coef, maq: maq*coef, mobra: mobra*coef, otros: otros*coef})
                  .exec(function(error) {
                    if (error) return cb(error);
                  });
                });
                //console.log('ParteId: ' + parte.id + ' values-parte: ' + values.partecultivo + ' parte: ' + JSON.stringify(parte));
                sails.models['partecult'].publishUpdate(values.partecultivo, parte);
              });
            });
          });
        });
      }
      cb();
    });
  },
  afterUpdate: function(values, cb) {
    sails.models['parccultivo'].find({partecultivo: values.partecultivo})
    .exec(function(error, parcelas) {
      if (error) return cb(error);

      //var nParcelas = parcelas.length;

      if (!values.all) {
        //Reparto por tiempo empleado
        var tParcelas = parcelas.reduce(function(memo, res) {
          var F = 0;
          var I = 0;
          //console.log('Inic: ' + res.inicio + ' Fin: ' + res.fin);
          if (res.inicio && res.fin) {
            var inic = new Date(res.inicio);
            var I = inic.getTime();
            var fin = new Date(res.fin);
            var F = fin.getTime();
            //console.log('Inic: ' + inic + 'TimeInic: ' + I + ' Fin: ' + fin + ' TimeFin: ' + F);
          }
          return memo + (F-I);
        }, 0);

        //console.log('TParcelas: ' + tParcelas + ' tParcCurso: ');
        sails.models['partecult'].update({id: values.partecultivo}, {totalparc: tParcelas})
        .exec(function(error, parte) {
          if (error) return cb(error);
          var ejercicio = parte[0].ejercicio;
          var tipodia = parte[0].tipo;
          var mat = parte[0].totalmat;
          var maq = parte[0].totalmaq;
          var mobra = parte[0].totalmobra;
          var otros = parte[0].totalotros;
          var tParc = parte[0].totalparc;

          for (var p = 0; p < parcelas.length; p++) {
            sails.models['repartocult'].findOrCreate(
            {partecultivo: values.partecultivo, parcela: parcelas[p].parcela, tipodiario: tipodia},
            {partecultivo: values.partecultivo, parcela: parcelas[p].parcela, tipodiario: tipodia, ejercicio: ejercicio})
            .exec(function(error, reparto) {
              if (error) return cb(error);

              var parcCurso = parcelas.filter(function (el) {
                return el.parcela == reparto.parcela;
              });
              var tParcCurso = parcCurso.reduce(function(memo, res) {
                var F = 0;
                var I = 0;
                if (res.inicio && res.fin) {
                  var inic = new Date(res.inicio);
                  var I = inic.getTime();
                  var fin = new Date(res.fin);
                  var F = fin.getTime();
                }
                return memo + (F-I);
              }, 0);

              var coef = tParcCurso/(tParc || 1);
              //console.log('Reparto: ' + JSON.stringify(reparto) + ' Coef: ' + coef);
              sails.models['repartocult'].update({id: reparto.id}, {coef: coef, mat: mat*coef, maq: maq*coef, mobra: mobra*coef, otros: otros*coef}).
              exec(function(error) {
                if (error) return cb(error);
              });
            });
          }
          sails.models['partecult'].publishUpdate(values.partecultivo, parte);
        });

      } if (values.all) {
        //Reparto por superficie de las parcelas
        //console.log("Values: " + JSON.stringify(values));
        sails.models['partecult'].findOne({id: values.partecultivo})
        .exec(function(error, parte) {
          if (error) return cb(error);
          //console.log("Parte: " + JSON.stringify(parte));
          var ejercicio = parte.ejercicio;
          var finca = parte.finca;
          var tipodia = parte.tipo;
          var mat = parte.totalmat;
          var maq = parte.totalmaq;
          var mobra = parte.totalmobra;
          var otros = parte.totalotros;
          sails.models['parcela'].findOne({id: values.parcela})
          .exec(function(error, parcela) {
            if (error) return cb(error);

            var supParc = parcela.supcult;
            sails.models['parcela'].find({finca: finca, active: true})
            .exec(function(error, parcelas) {
              if (error) return cb(error);

              var tParcelas = parcelas.reduce(function(memo, res) {
                return memo + res.supcult;
              }, 0);
              //var nParcelas = parcelas.length;

              sails.models['partecult'].update({id: values.partecultivo}, {totalparc: tParcelas})
              .exec(function(error, parte) {
                if (error) return cb(error);

                sails.models['repartocult'].findOrCreate({partecultivo: values.partecultivo, parcela: values.parcela, tipodiario: tipodia}, {partecultivo: values.partecultivo, ejercicio: ejercicio, parcela: values.parcela, tipodiario: tipodia})
                .exec(function(error, reparto) {
                  if (error) return cb(error);

                  var coef = supParc/(tParcelas || 1);
                  sails.models['repartocult'].update({id: reparto.id}, {coef: coef, mat: mat*coef, maq: maq*coef, mobra: mobra*coef, otros: otros*coef})
                  .exec(function(error) {
                    if (error) return cb(error);
                  });
                });
                sails.models['partecult'].publishUpdate(values.partecultivo, parte);
              });
            });
          });
        });
      }
      cb();
    });
  },
  afterDestroy: function(values, cb) {
    sails.models['parccultivo'].find({partecultivo: values.partecultivo})
    .exec(function(error, parcelas) {
      if (error) return cb(error);

      //var nParcelas = parcelas.length;

      if (!values.all) {
        //Reparto por tiempo empleado
        var tParcelas = parcelas.reduce(function(memo, res) {
          var F = 0;
          var I = 0;
          if (res.inicio && res.fin) {
            var inic = new Date(res.inicio);
            var I = inic.getTime();
            var fin = new Date(res.fin);
            var F = fin.getTime();
          }
          return memo + (F-I);
        }, 0);

        var parcCurso = parcelas.filter(function (el) {
          return el.parcela == values.parcela;
        });
        var tParcCurso = parcCurso.reduce(function(memo, res) {
          var F = 0;
          var I = 0;
          if (res.inicio && res.fin) {
            var inic = new Date(res.inicio);
            var I = inic.getTime();
            var fin = new Date(res.fin);
            var F = fin.getTime();
          }
          return memo + (F-I);
        }, 0);

        //console.log('TParcelas: ' + tParcelas + ' NParcelas: ' + nParcelas);
        sails.models['partecult'].update({id: values.partecultivo}, {totalparc: tParcelas})
        .exec(function(error, parte) {
          if (error) return cb(error);
          var ejercicio = parte.ejercicio;
          var tipodia = parte.tipo;
          var mat = parte.totalmat;
          var maq = parte.totalmaq;
          var mobra = parte.totalmobra;
          var otros = parte.totalotros;
          sails.models['repartocult'].findOrCreate({partecultivo: parte.id, parcela: values.parcela, tipodiario: tipodia}, {partecultivo: parte.id, ejercicio:ejercicio, parcela: values.parcela, tipodiario: tipodia})
          .exec(function(error, reparto) {
            if (error) return cb(error);

            var coef = tParcCurso/(tParcelas || 1);
            sails.models['repartocult'].update({id: reparto.id}, {coef: coef, mat: mat*coef, maq: maq*coef, mobra: mobra*coef, otros: otros*coef}).
            exec(function(error) {
              if (error) return cb(error);
            });

          });
          sails.models['partecult'].publishUpdate(values.partecultivo, parte);
        });

      } if (values.all) {
        //Reparto por superficie de las parcelas
        //console.log("Values: " + JSON.stringify(values));
        sails.models['partecult'].findOne({id: values.partecultivo})
        .exec(function(error, parte) {
          if (error) return cb(error);
          //console.log("Parte: " + JSON.stringify(parte));
          var ejercicio = parte.ejercicio;
          var finca = parte.finca;
          var tipodia = parte.tipo;
          var mat = parte.totalmat;
          var maq = parte.totalmaq;
          var mobra = parte.totalmobra;
          var otros = parte.totalotros;
          sails.models['parcela'].findOne({id: values.parcela})
          .exec(function(error, parcela) {
            if (error) return cb(error);

            var supParc = parcela.supcult;
            sails.models['parcela'].find({finca: finca, active: true})
            .exec(function(error, parcelas) {
              if (error) return cb(error);

              var tParcelas = parcelas.reduce(function(memo, res) {
                return memo + res.supcult;
              }, 0);
              //var nParcelas = parcelas.length;

              sails.models['partecult'].update({id: values.partecultivo}, {totalparc: tParcelas})
              .exec(function(error, parte) {
                if (error) return cb(error);

                sails.models['repartocult'].findOrCreate({partecultivo: parte.id, parcela: values.parcela, tipodiario: tipodia}, {partecultivo: parte.id, ejercicio: ejercicio, parcela: values.parcela, tipodiario: tipodia})
                .exec(function(error, reparto) {
                  if (error) return cb(error);

                  var coef = supParc/(tParcelas || 1);
                  sails.models['repartocult'].update({id: reparto.id}, {coef: coef, mat: mat*coef, maq: maq*coef, mobra: mobra*coef, otros: otros*coef})
                  .exec(function(error) {
                    if (error) return cb(error);
                  });
                });
                sails.models['partecult'].publishUpdate(values.partecultivo, parte);
              });
            });
          });
        });
      }
      cb();
    });
  }
};
