/**
* Matcultivo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    partecultivo: {
      model: 'partecult'
    },
    finca: {
      model: 'finca'
    },
    producto: {
      model: 'producto',
      required: true
    },
    litArt: {
      type: 'string'
    },
    litUnidad: {
      type: 'string'
    },
    cantidad: {
      type: 'float'
    },
    precio: {
      type: 'float'
    },
    unidad: {
      model: 'unidad'
    }

  },

  afterCreate: function(values, cb) {
    Matcultivo.find({partecultivo: values.partecultivo})
    .exec(function(error, materiales) {
      if (error) return cb(error);

      var nMateriales = materiales.length;
      var tMateriales = materiales.reduce(function(memo, res) {
        return memo + ((res.cantidad*res.precio) || 0)
      }, 0);
      //console.log('nMateriales: ' + nMateriales + ' tMateriales: ' + tMateriales);
      Partecult.update({id: values.partecultivo}, {totalmat: tMateriales, nmat: nMateriales})
      .exec(function(error, parte) {
        if(error) return cb(error);

        //var totalRepart = parte.totalotros;
        //console.log('Parte: ' + JSON.stringify(parte) + ' partecultivo: '  + parte[0].id + ' tipodiario: ' + parte[0].tipo);
        Repartocult.find({partecultivo: parte[0].id, tipodiario: parte[0].tipo})
        .exec(function(error, reparto) {
          if(error) return cb(error);

          for (var r = 0; r < reparto.length; r++) {
            //console.log('RepartoId: ' + reparto[r].id);
            Repartocult.update({id: reparto[r].id}, {mat: (tMateriales*reparto[r].coef)})
            .exec(function(error, repartoUpdated) {
              if(error) return cb(error);

              //Repartocult.publishUpdate(repartoUpdated.id, repartoUpdated);
            });
          };
        });
        //console.log('Create-ParteId: ' + parte[0].id + 'Parte: ' + JSON.stringify(parte));
        Partecult.publishUpdate(parte[0].id, parte);
      });
      cb();
    });
  },
  afterUpdate: function(values, cb) {
    //console.log('Values: ' + JSON.stringify(values));
    Matcultivo.find({partecultivo: values.partecultivo})
    .exec(function(error, materiales) {
      if (error) return cb(error);
      //console.log('Values-ParteCult: ' + values.partecultivo);
      var nMateriales = materiales.length;
      var tMateriales = materiales.reduce(function(memo, res) {
        return memo + ((res.cantidad*res.precio) || 0)
      }, 0);
      //console.log('nOtros: ' + nOtros + ' tOtros: ' + tOtros);
      Partecult.update({id: values.partecultivo}, {totalmat: tMateriales, nmat: nMateriales})
      .exec(function(error, parte) {
        if(error) return cb(error);

        //var totalRepart = parte.totalotros;
        //console.log('Parte: ' + JSON.stringify(parte) + ' partecultivo: '  + parte[0].id + ' tipodiario: ' + parte[0].tipo);
        Repartocult.find({partecultivo: parte[0].id, tipodiario: parte[0].tipo})
        .exec(function(error, reparto) {
          //console.log('Reparto: ' + JSON.stringify(reparto));
          if(error) return cb(error);

          for (var r = 0; r < reparto.length; r++) {
            //console.log('RepartoId: ' + reparto[r].id + ' coef: '+ reparto[r].coef + ' tMateriales: ' + tMateriales*reparto[r].coef);
            Repartocult.update({id: reparto[r].id}, {mat: tMateriales*reparto[r].coef})
            .exec(function(error, repartoUpdated) {
              if(error) return cb(error);

              //Repartocult.publishUpdate(repartoUpdated.id, repartoUpdated);
            });
          };
        });
        //console.log('Values-ParteCult: ' + values.partecultivo + ' Parte: ' + JSON.stringify(parte));
        Partecult.publishUpdate(values.partecultivo, parte);
      });
      cb();
    });
  },
  afterDestroy: function(values, cb) {
    //console.log('ValuesDestroy: ' + JSON.stringify(values));
    var parteId = values[0].partecultivo;
    Matcultivo.find({partecultivo: parteId})
    .exec(function(error, materiales) {
      if (error) return cb(error);

      var nMateriales = materiales.length;
      var tMateriales = materiales.reduce(function(memo, res) {
        return memo + ((res.cantidad*res.precio) || 0)
      }, 0);
      //console.log('nOtros: ' + nOtros + ' tOtros: ' + tOtros);
      //console.log('ParteId: ' + values.partecultivo + ', ' + parteId);
      Partecult.update({id: parteId}, {totalmat: tMateriales, nmat: nMateriales})
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
            Repartocult.update({id: reparto[r].id}, {mat: tMateriales*reparto[r].coef})
            .exec(function(error, repartoUpdated) {
              if(error) return cb(error);

              //Repartocult.publishUpdate(repartoUpdated.id, repartoUpdated);
            });
          };
        //console.log('Destroy-ParteId: ' + parteId + 'Parte: ' + JSON.stringify(parte));
        Partecult.publishUpdate(parteId, parte);
        });

      });
      cb();
    });
  },
};
