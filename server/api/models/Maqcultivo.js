/**
* Maqcultivo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    partecultivo: {
      model: 'partecult'
    },
    maquinaria: {
      model: 'maquinaria',
      required: true
    },
    litMaq: {
      type: 'string'
    },
    litProp: {
      type: 'string'
    },
    cantidad: {
      type: 'float',
      defaultsTo: 0
    },
    precio: {
      type: 'float',
      defaultsTo: 0
    }

  },

  afterCreate: function(values, cb) {
    Maqcultivo.find({partecultivo: values.partecultivo})
    .exec(function(error, maquinaria) {
      if (error) return cb(error);

      var nMaq = maquinaria.length;
      var tMaq = maquinaria.reduce(function(memo, res) {
        return memo + (res.cantidad*res.precio)
      }, 0);
      //console.log('nOtros: ' + nOtros + ' tOtros: ' + tOtros);
      Partecult.update({id: values.partecultivo}, {totalmaq: tMaq, nmaq: nMaq})
      .exec(function(error, parte) {
        if(error) return cb(error);

        //var totalRepart = parte.totalotros;
        //console.log('Parte: ' + JSON.stringify(parte) + ' partecultivo: '  + parte[0].id + ' tipodiario: ' + parte[0].tipo);
        Repartocult.find({partecultivo: parte[0].id, tipodiario: parte[0].tipo})
        .exec(function(error, reparto) {
          //console.log('Reparto: ' + JSON.stringify(reparto));
          if(error) return cb(error);

          for (var r = 0; r < reparto.length; r++) {
            //console.log('RepartoId: ' + reparto[r].id);
            Repartocult.update({id: reparto[r].id}, {maq: (tMaq*reparto[r].coef)})
            .exec(function(error, repartoUpdated) {
              if(error) return cb(error);

              //Repartocult.publishUpdate(repartoUpdated.id, repartoUpdated);
            });
          };
        })
        Partecult.publishUpdate(parte[0].id, parte);
      });
      cb();
    });
  },
  afterUpdate: function(values, cb) {
    //console.log('Values: ' + JSON.stringify(values));
    Maqcultivo.find({partecultivo: values.partecultivo})
    .exec(function(error, maquinaria) {
      if (error) return cb(error);

      var nMaq = maquinaria.length;
      var tMaq = maquinaria.reduce(function(memo, res) {
        return memo + (res.cantidad*res.precio)
      }, 0);
      //console.log('nOtros: ' + nOtros + ' tOtros: ' + tOtros);
      Partecult.update({id: values.partecultivo}, {totalmaq: tMaq, nmaq: nMaq})
      .exec(function(error, parte) {
        if(error) return cb(error);

        //var totalRepart = parte.totalotros;
        //console.log('Parte: ' + JSON.stringify(parte) + ' partecultivo: '  + parte[0].id + ' tipodiario: ' + parte[0].tipo);
        Repartocult.find({partecultivo: parte[0].id, tipodiario: parte[0].tipo})
        .exec(function(error, reparto) {
          //console.log('Reparto: ' + JSON.stringify(reparto));
          if(error) return cb(error);

          for (var r = 0; r < reparto.length; r++) {
            //console.log('RepartoId: ' + reparto[r].id + ' tMateriales: ' + tMateriales);
            Repartocult.update({id: reparto[r].id}, {maq: (tMaq*reparto[r].coef)})
            .exec(function(error, repartoUpdated) {
              if(error) return cb(error);

              //Repartocult.publishUpdate(repartoUpdated.id, repartoUpdated);
            });
          };
        });
        Partecult.publishUpdate(values.partecultivo, parte);
      });
      cb();
    });
  },
  afterDestroy: function(values, cb) {
    //console.log('ValuesDestroy: ' + JSON.stringify(values));
    var parteId = values[0].partecultivo;
    Maqcultivo.find({partecultivo: parteId})
    .exec(function(error, maquinaria) {
      if (error) return cb(error);

      var nMaq = maquinaria.length;
      var tMaq = maquinaria.reduce(function(memo, res) {
        return memo + (res.cantidad*res.precio)
      }, 0);
      //console.log('nOtros: ' + nOtros + ' tOtros: ' + tOtros);
      //console.log('ParteId: ' + values.partecultivo + ', ' + parteId);
      Partecult.update({id: parteId}, {totalmaq: tMaq, nmaq: nMaq})
      .exec(function(error, parte) {
        if(error) return cb(error);

        //var totalRepart = parte.totalotros;
        //console.log('Parte: ' + JSON.stringify(parte));
        Repartocult.find({partecultivo: parteId, tipodiario: parte.tipo})
        .exec(function(error, reparto) {
          //console.log('Reparto: ' + JSON.stringify(reparto));
          if(error) return cb(error);

          for (var r = 0; r < reparto.length; r++) {
            //console.log('RepartoId: ' + reparto[r].id);
            Repartocult.update({id: reparto[r].id}, {maq: (tMaq*reparto[r].coef)})
            .exec(function(error, repartoUpdated) {
              if(error) return cb(error);

              //Repartocult.publishUpdate(repartoUpdated.id, repartoUpdated);
            });
          };
          Partecult.publishUpdate(parteId, parte);
        });

      });
      cb();
    });
  },

};
