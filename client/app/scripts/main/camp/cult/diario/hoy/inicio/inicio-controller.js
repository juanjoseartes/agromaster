(function () {

  'use strict';

  /* @ngInject */
  function CultDiaInicController ($scope, $rootScope, $state, $stateParams, CurrentFinca, HttpService, resDia, repartoDia, resEjerc) {
    $scope.resEjerc = resEjerc;
    $scope.resDia = resDia;
    $scope.repartoDia = repartoDia;
    if (resDia.length) {
      $scope.getTotalParc = function(){
        var sumTotal = resDia.reduce(function(memo, res) {
          return memo + res.totalparc; // return previous total plus current age
        }, 0); // initialize age with 0 that will be passed as memo
        return sumTotal;
      };
      $scope.getTotalMObra = function(){
        var sumTotal = resDia.reduce(function(memo, res) {
          return memo + res.totalmobra; // return previous total plus current age
        }, 0);
        return sumTotal;
      };
      $scope.getTotalMat = function(){
        var sumTotal = resDia.reduce(function(memo, res) {
          return memo + res.totalmat; // return previous total plus current age
        }, 0);
        return sumTotal;
      };
      $scope.getTotalMaq = function(){
        var sumTotal = resDia.reduce(function(memo, res) {
          return memo + res.totalmaq; // return previous total plus current age
        }, 0);
        return sumTotal;
      };
      $scope.getTotalOtros = function(){
        var sumTotal = resDia.reduce(function(memo, res) {
          return memo + res.totalotros; // return previous total plus current age
        }, 0);
        return sumTotal;
      };
    };

    if (resEjerc.length) {
      $scope.getEjercParc = function(){
        var sumTotal = resEjerc.reduce(function(memo, res) {
          return memo + res.totalparc; // return previous total plus current age
        }, 0); // initialize age with 0 that will be passed as memo
        return sumTotal;
      };
      $scope.getEjercMObra = function(){
        var sumTotal = resEjerc.reduce(function(memo, res) {
          return memo + res.totalmobra; // return previous total plus current age
        }, 0);
        return sumTotal;
      };
      $scope.getEjercMat = function(){
        var sumTotal = resEjerc.reduce(function(memo, res) {
          return memo + res.totalmat; // return previous total plus current age
        }, 0);
        return sumTotal;
      };
      $scope.getEjercMaq = function(){
        var sumTotal = resEjerc.reduce(function(memo, res) {
          return memo + res.totalmaq; // return previous total plus current age
        }, 0);
        return sumTotal;
      };
      $scope.getEjercOtros = function(){
        var sumTotal = resEjerc.reduce(function(memo, res) {
          return memo + res.totalotros; // return previous total plus current age
        }, 0);
        return sumTotal;
      };
    };

    //Pie totales

    var pieEjerc = function() {
      var sumMat = resEjerc.reduce(function(memo, res) {
        return memo + res.totalmat; // return previous total plus current age
      }, 0);
      var sumMaq = resEjerc.reduce(function(memo, res) {
        return memo + res.totalmaq; // return previous total plus current age
      }, 0);
      var sumOtros = resEjerc.reduce(function(memo, res) {
        return memo + res.totalotros; // return previous total plus current age
      }, 0);

      var totalCult = {key: 'Materiales', y: sumMat};
      var totalRec = {key: 'Maquinaria', y: sumMaq};
      var totalEncarg = {key: 'Otros', y: sumOtros};
      var chartOutputData = [totalCult, totalRec, totalEncarg];
      return chartOutputData;
    };
    $scope.pEjerc =  pieEjerc;
    //GENERACION graficos
    //Materiales
    var grafMat = function() {
      var currentMat = [];
      for (var i = 0; i < resEjerc.length; i++) {
        var totalMat = 0;
        var fchMat = new Date (resEjerc[i].fecha);
        var fechaMat = new Date(fchMat.getFullYear(), fchMat.getMonth(), fchMat.getDate(), 8,0,0,0);
        var date = fechaMat.getTime();
        totalMat = resEjerc[i].totalmat;
        currentMat.push([date, totalMat]);
      }
      var matData = {'key': "Materiales", 'values': currentMat};
      var chartOutputData = [matData];
      return chartOutputData;
    };
    //Recoleccion
    var grafMaq = function() {
      var currentMaq = [];
      for (var j = 0; j < resEjerc.length; j++) {
        var totalMaq = 0;
        var fchMaq = new Date (resEjerc[j].fecha);
        var fechaMaq = new Date(fchMaq.getFullYear(), fchMaq.getMonth(), fchMaq.getDate(), 8,0,0,0);
        var date = fechaMaq.getTime();
        totalMaq = resEjerc[j].totalmaq;
        currentMaq.push([date, totalMaq]);
      }
      var maqData = {'key': "Maquinaria", 'values': currentMaq};
      var chartOutputData = [maqData];
      return chartOutputData;
    };
    //Encargados
    var grafOtros = function() {
      var currentOt = [];
      for (var k = 0; k < resEjerc.length; k++) {
        var totalOt = 0;
        var fchOt = new Date (resEjerc[k].fecha);
        var fechaOt = new Date(fchOt.getFullYear(), fchOt.getMonth(), fchOt.getDate(), 8,0,0,0);
        var date = fechaOt .getTime();
        totalOt = resEjerc[k].totalotros;
        currentOt.push([date, totalOt]);
      }
      var otrosData = {'key': "Otros", 'values': currentOt};
      var chartOutputData = [otrosData];
      return chartOutputData;
    };
    //SCOPES graficos
    $scope.gMat = grafMat;
    $scope.gMaq = grafMaq;
    $scope.gOtros = grafOtros;
    //CONFIG graficos
    $scope.xFunction = function(){
      return function(d) {
        return d.key;
      };
    };
    $scope.yFunction = function(){
      return function(d){
        return d.y;
      };
    };
    $scope.xAxisTickFormat = function(){
      return function(d){
        // return d3.time.format('%X')(new Date(d)); //uncomment for time format
        return d3.time.format('%d/%m/%Y')(new Date(d)); //uncomment for date format
      }
    };
    $scope.yAxisTickFormat = function(){
      return function(d){
        return d3.format(',.2f')(d);
      }
    };
    $scope.toolTipContentFunction = function(){
      return function(key, x, y, e, graph) {
        return  'Tooltip' +
        '<h2>' + key + '</h2>' +
        '<p>' +  y + ' at ' + x + '</p>'
      }
    };
    $scope.toolTipPie = function(){
      return function(key, x, y, e, graph) {
        return  '<h3>'+key+'</h3>' +
        '<b>Total: '+x+'€</b>'
      }
    };

  }

  angular
  .module('App')
  .controller('CultDiaInicController', CultDiaInicController);

})();
