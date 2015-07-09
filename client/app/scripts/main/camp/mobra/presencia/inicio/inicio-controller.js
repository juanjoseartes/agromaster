(function () {

  'use strict';

  /* @ngInject */
  function MObraPresencInicController ($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentFinca, HttpService, TitleService, resDia, resEjercCult, resEjercRec, resEjercEnc) {
    TitleService.setTitle('Mano de Obra');

    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };

    $scope.currentDate = new Date();

    //RESUMEN DIA por tipo de diario
    var resCult = resDia.filter(function (el) {
      return el.tipo == 'cultivo';
    });
    var resRec = resDia.filter(function (el) {
      return el.tipo == 'recoleccion';
    });
    var resEnc = resDia.filter(function (el) {
      return el.tipo == 'encargado';
    });

    //TOTALES DIA por tipo de diario
    //console.log('ResCult: ' + JSON.stringify(resCult));
    if (resCult.length) {
      $scope.nCult = resCult[0].listempleados.length;
      if (resCult[0].listempleados.length) {
        $scope.getTotalCultivo = function(){
          var sumCult = resCult.reduce(function(memo, diario) {
            return memo + diario.totalcult; // return previous total plus current data
          }, 0); // initialize age with 0 that will be passed as memo
          return sumCult;
        };
      };
    };
    if (resRec.length) {
      $scope.nRec = resRec[0].listempleados.length;
      if (resRec[0].listempleados.length) {
        $scope.getTotalRecolecc = function(){
          var sumRec = resRec.reduce(function(memo, diario) {
            return memo + diario.totalrecol; // return previous total plus current data
          }, 0); // initialize age with 0 that will be passed as memo
          return sumRec;
        };
      };
    };
    if (resEnc.length) {
      $scope.nEnc = resEnc[0].listempleados.length;
      if (resEnc[0].listempleados.length) {
        $scope.getTotalEncarg = function(){
          var sumEnc = resEnc.reduce(function(memo, diario) {
            return memo + diario.totalencarg; // return previous total plus current data
          }, 0); // initialize age with 0 that will be passed as memo
          return sumEnc;
        };
      };
    };

    var totalCult = function() {
      var sumCult = resEjercCult.reduce(function(memo, diario) {return memo + diario.totalcult}, 0);
      return sumCult;
    };
    var nCultTotal = function() {
      var nCult = resEjercCult.reduce(function(memo, dia) {return memo + dia.ncult}, 0);
      return nCult;
    };
    var totalRecol = function() {
      var sumRec = resEjercRec.reduce(function(memo, diario) {return memo + diario.totalrecol}, 0);
      return sumRec;
    };
    var nRecolTotal = function() {
      var nRec = resEjercRec.reduce(function(memo, dia) {return memo + dia.nrecol}, 0);
      return nRec;
    };
    var totalEncarg = function() {
      var sumEnc = resEjercEnc.reduce(function(memo, diario) {return memo + diario.totalencarg}, 0);
      return sumEnc;
    };
    var nEncargTotal = function() {
      var nEnc = resEjercEnc.reduce(function(memo, dia) {return memo + dia.nencarg}, 0);
      return nEnc;
    };


    $scope.getEjercCultivo = totalCult;
    $scope.getEjercRecol = totalRecol;
    $scope.getEjercEncarg = totalEncarg;
    $scope.nEjercCult = nCultTotal;
    $scope.nEjercRecol = nRecolTotal;
    $scope.nEjercEncarg = nEncargTotal;

    //Pie EUROS
    var pieEurEjerc = function() {
      var sumCult = resEjercCult.reduce(function(memo, diario) {return memo + diario.totalcult}, 0);
      var totalCult = {key: 'Cultivo', y: sumCult};
      var sumRec = resEjercRec.reduce(function(memo, diario) {return memo + diario.totalrecol}, 0);
      var totalRec = {key: 'Recoleccion', y: sumRec};
      var sumEnc = resEjercEnc.reduce(function(memo, diario) {return memo + diario.totalencarg}, 0);
      var totalEncarg = {key: 'Encargado', y: sumEnc};
      var chartOutputData = [totalCult, totalRec, totalEncarg];
      return chartOutputData;
    };

    var pieEurDia = function() {
      var sumCult = resCult.reduce(function(memo, diario) {return memo + diario.totalcult}, 0);
      var totalCult = {key: 'Cultivo', y: sumCult};
      var sumRec = resRec.reduce(function(memo, diario) {return memo + diario.totalrecol}, 0);
      var totalRec = {key: 'Recoleccion', y: sumRec};
      var sumEnc = resEnc.reduce(function(memo, diario) {return memo + diario.totalencarg}, 0);
      var totalEncarg = {key: 'Encargado', y: sumEnc};
      var chartOutputData = [totalCult, totalRec, totalEncarg];
      return chartOutputData;
    };

    $scope.pEurEjerc =  pieEurEjerc;
    $scope.pEurDia =  pieEurDia;

    //Pie JORNALES
    var pieJornEjerc = function() {
      var nCult = resEjercCult.reduce(function(memo, dia) {return memo + dia.ncult}, 0);
      var totalCult = {key: 'Cultivo', y: nCult};
      var nRec = resEjercRec.reduce(function(memo, dia) {return memo + dia.nrecol}, 0);
      var totalRec = {key: 'Recoleccion', y: nRec};
      var nEnc = resEjercEnc.reduce(function(memo, dia) {return memo + dia.nencarg}, 0);
      var totalEncarg = {key: 'Encargado', y: nEnc};
      var chartOutputData = [totalCult, totalRec, totalEncarg];
      return chartOutputData;
    };

    var pieJornDia = function() {
      var nCult = resCult.reduce(function(memo, dia) {return memo + dia.ncult}, 0);
      var totalCult = {key: 'Cultivo', y: nCult};
      var nRec = resRec.reduce(function(memo, dia) {return memo + dia.nrecol}, 0);
      var totalRec = {key: 'Recoleccion', y: nRec};
      var nEnc = resEnc.reduce(function(memo, dia) {return memo + dia.nencarg}, 0);
      var totalEncarg = {key: 'Encargado', y: nEnc};
      var chartOutputData = [totalCult, totalRec, totalEncarg];
      return chartOutputData;
    };

    $scope.pJornEjerc =  pieJornEjerc;
    $scope.pJornDia =  pieJornDia;
    //GENERACION graficos
    //Cultivo
    // var grafCult = function() {
    //   var currentCult = [];
    //   for (var i = 0; i < resEjercCult.length; i++) {
    //     var totalC = 0;
    //     var fchC = new Date (resEjercCult[i].fecha);
    //     var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
    //     var date = fechaC.getTime();
    //     totalC = resEjercCult[i].totalcult;
    //     currentCult.push([date, totalC]);
    //   }
    //   var cultData = {'key': "Cultivo", 'values': currentCult};
    //   var chartOutputData = [cultData];
    //   return chartOutputData;
    // };
    //Recoleccion
    // var grafRec = function() {
    //   var currentRec = [];
    //   for (var j = 0; j < resEjercRec.length; j++) {
    //     var totalR = 0;
    //     var fchR = new Date (resEjercRec[j].fecha);
    //     var fechaR = new Date(fchR.getFullYear(), fchR.getMonth(), fchR.getDate(), 8,0,0,0);
    //     var date = fechaR.getTime();
    //     totalR = resEjercRec[j].totalrecol;
    //     currentRec.push([date, totalR]);
    //   }
    //   var recData = {'key': "Recoleccion", 'values': currentRec};
    //   var chartOutputData = [recData];
    //   return chartOutputData;
    // };
    //Encargados
    // var grafEnc = function() {
    //   var currentEnc = [];
    //   for (var k = 0; k < resEjercEnc.length; k++) {
    //     var totalE = 0;
    //     var fchE = new Date (resEjercEnc[k].fecha);
    //     var fechaE = new Date(fchE.getFullYear(), fchE.getMonth(), fchE.getDate(), 8,0,0,0);
    //     var date = fechaE .getTime();
    //     totalE = resEjercEnc[k].totalencarg;
    //     currentEnc.push([date, totalE]);
    //   }
    //   var encData = {'key': "Encargado", 'values': currentEnc};
    //   var chartOutputData = [encData];
    //   return chartOutputData;
    // };

    var grafResumen = function() {
      var currentCult = [];
      for (var i = 0; i < resEjercCult.length; i++) {
        var totalC = 0;
        var fchC = new Date (resEjercCult[i].fecha);
        var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
        var date = fechaC.getTime();
        totalC = resEjercCult[i].totalcult;
        currentCult.push([date, totalC]);
      }
      var currentRec = [];
      for (var j = 0; j < resEjercRec.length; j++) {
        var totalR = 0;
        var fchR = new Date (resEjercRec[j].fecha);
        var fechaR = new Date(fchR.getFullYear(), fchR.getMonth(), fchR.getDate(), 8,0,0,0);
        var date = fechaR.getTime();
        totalR = resEjercRec[j].totalrecol;
        currentRec.push([date, totalR]);
      }
      var currentEnc = [];
      for (var k = 0; k < resEjercEnc.length; k++) {
        var totalE = 0;
        var fchE = new Date (resEjercEnc[k].fecha);
        var fechaE = new Date(fchE.getFullYear(), fchE.getMonth(), fchE.getDate(), 8,0,0,0);
        var date = fechaE .getTime();
        totalE = resEjercEnc[k].totalencarg;
        currentEnc.push([date, totalE]);
      }
      var cultData = {'key': "Cultivo", 'values': currentCult};
      var recData = {'key': "Recoleccion", 'values': currentRec};
      var encData = {'key': "Encargado", 'values': currentEnc};
      var chartOutputData = [cultData, recData, encData];
      return chartOutputData;
    };

    //SCOPES graficos
    // $scope.gCult = grafCult;
    // $scope.gRec = grafRec;
    // $scope.gEnc = grafEnc;
    $scope.gResumen = grafResumen;
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
        return  '<h3 class="center">' + key + '</h3>' +
                '<p class="center">' +  y + '€ - ' + x + '</p>'
      }
    };
    $scope.toolTipPie = function(){
      return function(key, x, y, e, graph) {
        return  '<h4 class="center">'+key+'</h4>' +
        '<p class="center">Total: '+x+'€</p>'
      }
    };
    $scope.toolTipPieJorn = function(){
      return function(key, x, y, e, graph) {
        return  '<h4 class="center">'+key+'</h4>' +
        '<p class="center">Jornales: '+x+'</p>'
      }
    };

  }

  angular
  .module('App')
  .controller('MObraPresencInicController', MObraPresencInicController);

})();
