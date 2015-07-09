/**
* Otroscultivo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    partecultivo: {
      model: 'partecult'
    },
    concepto: {
      type: 'string'
    },
    cantidad: {
      type: 'float'
    },
    precio: {
      type: 'float'
    },
    tipo: {
      model: 'tipodiario'
    },
    ejercicio: {
      model: 'ejercicio'
    },
    finca: {
      model: 'finca'
    }

  },

  afterCreate: function(values, cb) {
    Otroscultivo.find({partecultivo: values.partecultivo})
    .exec(function(error, otros) {
      if (error) return cb(error);

      var nOtros = otros.length;
      var tOtros = otros.reduce(function(memo, res) {
        return memo + (res.cantidad*res.precio)
      }, 0);
      //console.log('nOtros - Create: ' + nOtros + ' tOtros: ' + tOtros);
      Partecult.update({id: values.partecultivo}, {totalotros: tOtros, notros: nOtros})
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
            Repartocult.update({id: reparto[r].id}, {otros: (tOtros*reparto[r].coef)})
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
    Otroscultivo.find({partecultivo: values.partecultivo})
    .exec(function(error, otros) {
      if (error) return cb(error);

      var nOtros = otros.length;
      var tOtros = otros.reduce(function(memo, res) {
        return memo + (res.cantidad*res.precio)
      }, 0);
      //console.log('nOtros: ' + nOtros + ' tOtros: ' + tOtros);
      Partecult.update({id: values.partecultivo}, {totalotros: tOtros, notros: nOtros})
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
            Repartocult.update({id: reparto[r].id}, {otros: (tOtros*reparto[r].coef)})
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

    var parteId = values[0].partecultivo;
    var tipoId = values[0].tipo;

    Otroscultivo.find({partecultivo: parteId})
    .exec(function(error, otros) {
      if (error) return cb(error);

      var nOtros = otros.length;
      var tOtros = otros.reduce(function(memo, res) {
        return memo + (res.cantidad*res.precio)
      }, 0);
      //console.log('nOtros: ' + nOtros + ' tOtros: ' + tOtros);
      Partecult.update({id: parteId}, {totalotros: tOtros, notros: nOtros})
      .exec(function(error, parte) {
        if(error) return cb(error);

        //var totalRepart = parte.totalotros;
        //console.log('Parte: ' + JSON.stringify(parte) + ' partecultivo: '  + parte[0].id + ' tipodiario: ' + parte[0].tipo);
        Repartocult.find({partecultivo: parteId, tipodiario: parte[0].tipo})
        .exec(function(error, reparto) {
          //console.log('Reparto: ' + JSON.stringify(reparto));
          if(error) return cb(error);

          for (var r = 0; r < reparto.length; r++) {
            //console.log('RepartoId: ' + reparto[r].id);
            Repartocult.update({id: reparto[r].id}, {otros: (tOtros*reparto[r].coef)})
            .exec(function(error, repartoUpdated) {
              if(error) return cb(error);

              //Repartocult.publishUpdate(repartoUpdated.id, repartoUpdated);
            });
          };
          //console.log('Destroy-ParteId: ' + parteId + 'Parte: ' + JSON.stringify(parte));

        });
        Partecult.publishUpdate(parteId, parte);
      });
      cb();
    });
  }

};
