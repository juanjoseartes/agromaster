/**
* RepartocultController
*
* @description :: Server-side logic for managing repartocults
* @help        :: See http://links.sailsjs.org/docs/controllers
*/


module.exports = {

  getAll: function(req, res) {
    //var finca = req.param('finca');
    var ejerc = req.param('ejerc');
    var tipo = req.param('tipo');
    //console.log('AllParams: ' + JSON.stringify(req.allParams()));

    if (tipo) {
      sails.models['tipodiario'].findOne({pathname: tipo})
      .exec(function(error, tipo) {
        if (error) return res.negotiate(error);

        var tipoId = tipo.id;
        //console.log('TipoId: ' + tipoId);
        sails.models['repartocult'].find({ejercicio: ejerc, tipodiario: tipoId})
        .sort('createdAt ASC')
        .exec(function(error, model) {
          if (error) return res.negotiate(error);
          //console.log('RepartoEjerc: ' + JSON.stringify(model));
          res.json(model);
        });
      });
    }
    if (!tipo) {
      sails.models['repartocult'].find({ejercicio:ejerc})
      .populate('parcela')
      .populate('tipodiario')
      .exec(function(error, model) {
        if (error) res.negotiate(error);

        sails.models['repartocult'].watch(req);
        sails.models['repartocult'].subscribe(req.socket, model);
        res.json(model);
      });
    }

  },

  getToday: function(req, res) {
    var ejerc = req.param('ejerc');
    var hoy = new Date();
    var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
    var tipo = req.param('tipoName');

    if (tipo) {
      sails.models['repartocult'].find({createdAt: {$gt: d, $lte: hoy}, ejercicio: ejerc, tipoName: tipo})
      .exec(function(error, model) {
        if (error) return res.negotiate(error);

        res.json(model);
      });
    }
    if (!tipo) {
      sails.models['repartocult'].find({createdAt: {$gt: d, $lte: hoy}, ejercicio: ejerc})
      .populate('parcela')
      .populate('tipodiario')
      //.sort('parcela ASC')
      .exec(function(error, model) {
        if (error) return res.negotiate(error);

        res.json(model);
      });
    };

  }

};
