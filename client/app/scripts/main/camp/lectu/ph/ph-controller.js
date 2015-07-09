(function () {

  'use strict';

  /* @ngInject */

  function LectuResumenController ($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentUser, CurrentFinca, HttpService, ejerc) {

    $scope.ejercPh = ejerc;
    //$scope.ejercPh = ejercEc;
    $scope.parcelas = CurrentFinca.fincaCur().parcelas;

    var grafPh = function() {
      var date;
      var totalC = 0;

      var currentCult = [];
      for (var i = 0; i < ejerc.length; i++) {
        totalC = 0;
        var fchC = new Date (ejerc[i].fecha);
        //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
        date = fchC.getTime();
        totalC = ejerc[i].valor;
        currentCult.push([date, totalC]);
      }
      var cultData = {
        'key': "pH",
        'values': currentCult,
        'color': '#ff7f0e'  //color - optional: choose your own line color.
      };
      var chartOutputData = [cultData];
      return chartOutputData;
    };
    $scope.pHData = grafPh;

    // var grafEc = function() {
    //   var date;
    //   var totalC = 0;
    //
    //   var currentCult = [];
    //   for (var i = 0; i < ejercEc.length; i++) {
    //     totalC = 0;
    //     var fchC = new Date (ejercEc[i].fecha);
    //     //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
    //     date = fchC.getTime();
    //     totalC = ejercEc[i].valor;
    //     currentCult.push([date, totalC]);
    //   }
    //   var cultData = {
    //     'key': "eC",
    //     'values': currentCult,
    //     'color': '#7777ff'
    //   };
    //   var chartOutputData = [cultData];
    //   return chartOutputData;
    // };
    //$scope.eCData = grafEc

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
        '<h1>' + key + '</h1>' +
        '<p>' +  y + ' at ' + x + '</p>'
      }
    };
    $scope.xFunction = function(){
      return function(d){
        return d[0];
      };
    };
    $scope.yFunction = function(){
      return function(d){
        return d[1];
      };
    };


    $scope.addPhParc = function() {
      var model = {
        ejercicio: $stateParams.ejercId,
        fecha: new Date(),
        finca: CurrentFinca.fincaCur().id,
        parcela: $stateParams.parcId,
        usuario: CurrentUser.user().id,
        tipo: 'ph',
        valor: 0
      };

      HttpService.create(model, 'lectura').then(function(res) {
        $state.go('main.camp.lectu.parc.edit', {ejercId: $stateParams.ejercId, parcId: $stateParams.parcId, lectId: res.id});
      });

    };
    // $scope.addEcParc = function() {
    //   var model = {
    //     ejercicio: $stateParams.ejercId,
    //     fecha: new Date(),
    //     finca: CurrentFinca.fincaCur().id,
    //     parcela: $stateParams.parcId,
    //     usuario: CurrentUser.user().id,
    //     tipo: 'ec',
    //     valor: 0
    //   };
    //
    //   HttpService.create(model, 'lectura').then(function(res) {
    //     $state.go('main.camp.lectu.parc.edit', {ejercId: $stateParams.ejercId, parcId: $stateParams.parcId, lectId: res.id});
    //   });
    // };

    //Lectura
    $sailsSocket.subscribe('lectura', function(message) {
      console.log('sails published a message for lectura PH: ' + message.verb);

      switch (message.verb) {
        case 'created':
          var model = {
            id: $stateParams.ejercId,
            tipo: 'ph',
            parcela: $stateParams.parcId
          };
          HttpService.findToday(model, 'lectura').then(function(modelList) {
            $scope.hoyPh = modelList;
          });
          HttpService.findEjercicio(model, 'lectura').then(function(modelList) {
            $scope.ejercPh = modelList;
            var grafPh = function() {
              var date;
              var totalC = 0;

              var currentCult = [];
              for (var i = 0; i < modelList.length; i++) {
                totalC = 0;
                var fchC = new Date (modelList[i].fecha);
                //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
                date = fchC.getTime();
                totalC = modelList[i].valor;
                currentCult.push([date, totalC]);
              }
              var cultData = {
                'key': "pH",
                'values': currentCult,
                'color': '#ff7f0e'  //color - optional: choose your own line color.
              };
              var chartOutputData = [cultData];
              return chartOutputData;
            };
            $scope.pHData = grafPh;

          });
          // var model = {
          //   id: $stateParams.ejercId,
          //   tipo: 'ec',
          //   parcela: $stateParams.parcId
          // };
          // HttpService.findToday(model, 'lectura').then(function(modelList) {
          //   $scope.hoyEc = modelList;
          // });
          // HttpService.findEjercicio(model, 'lectura').then(function(modelList) {
          //   $scope.ejercEc = modelList;
          //   var grafEc = function() {
          //     var date;
          //     var totalC = 0;
          //
          //     var currentCult = [];
          //     for (var i = 0; i < modelList.length; i++) {
          //       totalC = 0;
          //       var fchC = new Date (modelList[i].fecha);
          //       //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
          //       date = fchC.getTime();
          //       totalC = modelList[i].valor;
          //       currentCult.push([date, totalC]);
          //     }
          //     var cultData = {
          //       'key': "eC",
          //       'values': currentCult,
          //       'color': '#7777ff'
          //     };
          //     var chartOutputData = [cultData];
          //     return chartOutputData;
          //   };
          //   $scope.eCData = grafEc
          // });
          break;
          case 'updated':
            var model = {
              id: $stateParams.ejercId,
              tipo: 'ph',
              parcela: $stateParams.parcId
            };
            HttpService.findToday(model, 'lectura').then(function(modelList) {
              $scope.hoyPh = modelList;
            });
            HttpService.findEjercicio(model, 'lectura').then(function(modelList) {
              $scope.ejercPh = modelList;
              var grafPh = function() {
                var date;
                var totalC = 0;

                var currentCult = [];
                for (var i = 0; i < modelList.length; i++) {
                  totalC = 0;
                  var fchC = new Date (modelList[i].fecha);
                  //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
                  date = fchC.getTime();
                  totalC = modelList[i].valor;
                  currentCult.push([date, totalC]);
                }
                var cultData = {
                  'key': "pH",
                  'values': currentCult,
                  'color': '#ff7f0e'  //color - optional: choose your own line color.
                };
                var chartOutputData = [cultData];
                return chartOutputData;
              };
              $scope.pHData = grafPh;

            });
            // var model = {
            //   id: $stateParams.ejercId,
            //   tipo: 'ec',
            //   parcela: $stateParams.parcId
            // };
            // HttpService.findToday(model, 'lectura').then(function(modelList) {
            //   $scope.hoyEc = modelList;
            // });
            // HttpService.findEjercicio(model, 'lectura').then(function(modelList) {
            //   $scope.ejercEc = modelList;
            //   var grafEc = function() {
            //     var date;
            //     var totalC = 0;
            //
            //     var currentCult = [];
            //     for (var i = 0; i < modelList.length; i++) {
            //       totalC = 0;
            //       var fchC = new Date (modelList[i].fecha);
            //       //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
            //       date = fchC.getTime();
            //       totalC = modelList[i].valor;
            //       currentCult.push([date, totalC]);
            //     }
            //     var cultData = {
            //       'key': "eC",
            //       'values': currentCult,
            //       'color': '#7777ff'
            //     };
            //     var chartOutputData = [cultData];
            //     return chartOutputData;
            //   };
            //   $scope.eCData = grafEc
            // });
          }
        });
      }

      angular
      .module('App')
      .controller('LectuResumenController', LectuResumenController);

    })();
