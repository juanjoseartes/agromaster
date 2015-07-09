(function () {

  'use strict';

  /* @ngInject */

  function LectuParcController ($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentUser, CurrentFinca, HttpService, LecturaModel, hoyPh, hoyEc, ejercPh, ejercEc) {
    $scope.hoyPh = hoyPh;
    $scope.hoyEc = hoyEc;

    $scope.ejercPh = ejercPh;
    $scope.ejercEc = ejercEc;
    $scope.parcelas = CurrentFinca.fincaCur().parcelas;
    var parcelas = CurrentFinca.fincaCur().parcelas;
    var parcela = parcelas.reduce(function(memo, parc) {
      if (parc.id === $stateParams.parcId) { // this serves as our `filter`
        memo.push({ // this serves as our `map`
          parcid: "#" + parc.id,
          name: parc.name,
        });
      }
      return memo;

    }, []);
    $scope.parcela = parcela;

    var grafPh = function() {
      var date;
      var totalC = 0;

      var currentCult = [];
      for (var i = 0; i < ejercPh.length; i++) {
        totalC = 0;
        var fchC = new Date (ejercPh[i].fecha);
        //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
        date = fchC.getTime();
        totalC = ejercPh[i].valor;
        currentCult.push([date, totalC]);
      }
      var cultData = {
        'key': "pH",
        "bar": true,
        'values': currentCult,
        'color': '#ff7f0e'  //color - optional: choose your own line color.
      };

      var currentEc = [];
      for (var i = 0; i < ejercEc.length; i++) {
        totalC = 0;
        var fchC = new Date (ejercEc[i].fecha);
        //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
        date = fchC.getTime();
        totalC = ejercEc[i].valor;
        currentEc.push([date, totalC]);
      }
      var ecData = {
        'key': "eC",
        'values': currentEc,
        'color': '#7777ff'
      };

      var chartOutputData = [cultData, ecData];
      return chartOutputData;
    };
    $scope.pHData = grafPh;

    $scope.xAxisTickFormat = function(){
      return function(d){
        // return d3.time.format('%X')(new Date(d)); //uncomment for time format
        return d3.time.format('%d/%m/%Y')(new Date(d)); //uncomment for date format
      }
    };
    $scope.yAxisTickFormat = function(){
      return function(d){
        return d3.format(',2f')(d);
      }
    };
    $scope.y1AxisTickFormat = function(){
      return function(d){
        return d3.format(',2f')(d);
      }
    };
    $scope.y2AxisTickFormat = function(){
      return function(d){
        return '$' + d3.format(',.2f')(d);
      }
    };

    $scope.toolTipContentFunction = function(){
      return function(key, x, y, e, graph) {
        return  '<h3>' + key + '</h3>' +
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

      LecturaModel.create(model).then(function(res) {
        $state.go('main.camp.lectu.parc.edit', {ejercId: $stateParams.ejercId, parcId: $stateParams.parcId, lectId: res.id});
      });

    };
    $scope.addEcParc = function() {
      var model = {
        ejercicio: $stateParams.ejercId,
        fecha: new Date(),
        finca: CurrentFinca.fincaCur().id,
        parcela: $stateParams.parcId,
        usuario: CurrentUser.user().id,
        tipo: 'ec',
        valor: 0
      };

      LecturaModel.create(model).then(function(res) {
        $state.go('main.camp.lectu.parc.edit', {ejercId: $stateParams.ejercId, parcId: $stateParams.parcId, lectId: res.id});
      });
    };

    //Lectura
    $sailsSocket.subscribe('lectura', function(message) {
      console.log('sails published a message for lectura PH: ' + message.verb);


      switch (message.verb) {
        case 'created':
          var modelPH = {
            id: $stateParams.ejercId,
            tipo: 'ph',
            parcela: $stateParams.parcId
          };
          var modelEC = {
            id: $stateParams.ejercId,
            tipo: 'ec',
            parcela: $stateParams.parcId
          };

          HttpService.findToday(modelPH, 'lectura').then(function(modelList) {
            $scope.hoyPh = modelList;
          });
          HttpService.findEjercicio(modelPH, 'lectura').then(function(modelList) {
            $scope.ejercPh = ejercPh;

            var grafPh = function() {
              var date;
              var totalC = 0;

              var currentCult = [];
              for (var i = 0; i < ejercPh.length; i++) {
                totalC = 0;
                var fchC = new Date (ejercPh[i].fecha);
                //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
                date = fchC.getTime();
                totalC = ejercPh[i].valor;
                currentCult.push([date, totalC]);
              }
              var cultData = {
                'key': "pH",
                "bar": true,
                'values': currentCult,
                'color': '#ff7f0e'  //color - optional: choose your own line color.
              };

              var currentEc = [];
              for (var i = 0; i < ejercEc.length; i++) {
                totalC = 0;
                var fchC = new Date (ejercEc[i].fecha);
                //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
                date = fchC.getTime();
                totalC = ejercEc[i].valor;
                currentEc.push([date, totalC]);
              }
              var ecData = {
                'key': "eC",
                'values': currentEc,
                'color': '#7777ff'
              };

              var chartOutputData = [cultData, ecData];
              return chartOutputData;
            };
            $scope.pHData = grafPh;
          });
          HttpService.findToday(modelEC, 'lectura').then(function(modelList) {
            $scope.hoyEc = modelList;
          });

          break;

          case 'destroyed':
            var modelPH = {
              id: $stateParams.ejercId,
              tipo: 'ph',
              parcela: $stateParams.parcId
            };
            var modelEC = {
              id: $stateParams.ejercId,
              tipo: 'ec',
              parcela: $stateParams.parcId
            };

            HttpService.findToday(modelPH, 'lectura').then(function(modelList) {
              $scope.hoyPh = modelList;
            });
            HttpService.findEjercicio(modelPH, 'lectura').then(function(modelList) {
              $scope.ejercPh = ejercPh;

              var grafPh = function() {
                var date;
                var totalC = 0;

                var currentCult = [];
                for (var i = 0; i < ejercPh.length; i++) {
                  totalC = 0;
                  var fchC = new Date (ejercPh[i].fecha);
                  //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
                  date = fchC.getTime();
                  totalC = ejercPh[i].valor;
                  currentCult.push([date, totalC]);
                }
                var cultData = {
                  'key': "pH",
                  "bar": true,
                  'values': currentCult,
                  'color': '#ff7f0e'  //color - optional: choose your own line color.
                };

                var currentEc = [];
                for (var i = 0; i < ejercEc.length; i++) {
                  totalC = 0;
                  var fchC = new Date (ejercEc[i].fecha);
                  //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
                  date = fchC.getTime();
                  totalC = ejercEc[i].valor;
                  currentEc.push([date, totalC]);
                }
                var ecData = {
                  'key': "eC",
                  'values': currentEc,
                  'color': '#7777ff'
                };

                var chartOutputData = [cultData, ecData];
                return chartOutputData;
              };
              $scope.pHData = grafPh;
            });
            HttpService.findToday(modelEC, 'lectura').then(function(modelList) {
              $scope.hoyEc = modelList;
            });

            break;

          case 'updated':

            var modelPH = {
              id: $stateParams.ejercId,
              tipo: 'ph',
              parcela: $stateParams.parcId
            };
            var modelEC = {
              id: $stateParams.ejercId,
              tipo: 'ec',
              parcela: $stateParams.parcId
            };

            HttpService.findToday(modelPH, 'lectura').then(function(modelList) {
              $scope.hoyPh = modelList;
            });
            HttpService.findToday(modelEC, 'lectura').then(function(modelList) {
              $scope.hoyEc = modelList;
            });

            var model = {
              id: $stateParams.ejercId,
              parcela: $stateParams.parcId
            };
            HttpService.findEjercicio(model, 'lectura').then(function(modelList) {
              //$scope.ejercPh = ejercPh;
              var ejercPh = modelList.reduce(function(memo, lectura) {
                if (lectura.tipo === 'ph') { // this serves as our `filter`
                  memo.push({ // this serves as our `map`
                    fecha: lectura.fecha,
                    valor: lectura.valor,
                  });
                }
                return memo;

              }, []);
              var ejercEc = modelList.reduce(function(memo, lectura) {
                if (lectura.tipo === 'ec') { // this serves as our `filter`
                  memo.push({ // this serves as our `map`
                    fecha: lectura.fecha,
                    valor: lectura.valor,
                  });
                }
                return memo;

              }, []);

              var grafPh = function() {
                var date;
                var totalC = 0;

                var currentCult = [];
                for (var i = 0; i < ejercPh.length; i++) {
                  totalC = 0;
                  var fchC = new Date (ejercPh[i].fecha);
                  //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
                  date = fchC.getTime();
                  totalC = ejercPh[i].valor;
                  currentCult.push([date, totalC]);
                }

                var cultData = {
                  'key': "pH",
                  "bar": true,
                  'values': currentCult,
                  'color': '#ff7f0e'  //color - optional: choose your own line color.
                };

                var currentEc = [];
                for (var i = 0; i < ejercEc.length; i++) {
                  totalC = 0;
                  var fchC = new Date (ejercEc[i].fecha);
                  //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
                  date = fchC.getTime();
                  totalC = ejercEc[i].valor;
                  currentEc.push([date, totalC]);
                }

                var ecData = {
                  'key': "eC",
                  'values': currentEc,
                  'color': '#7777ff'
                };

                // var date;
                // var totalC = 0;
                //
                // var currentCult = [];
                // for (var i = 0; i < ejercPh.length; i++) {
                //   totalC = 0;
                //   var fchC = new Date (ejercPh[i].fecha);
                //   //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
                //   date = fchC.getTime();
                //   totalC = ejercPh[i].valor;
                //   currentCult.push([date, totalC]);
                // }
                // var cultData = {
                //   'key': "pH",
                //   "bar": true,
                //   'values': currentCult,
                //   'color': '#ff7f0e'  //color - optional: choose your own line color.
                // };
                //
                // var currentEc = [];
                // for (var i = 0; i < ejercEc.length; i++) {
                //   totalC = 0;
                //   var fchC = new Date (ejercEc[i].fecha);
                //   //var fechaC = new Date(fchC.getFullYear(), fchC.getMonth(), fchC.getDate(), 8,0,0,0);
                //   date = fchC.getTime();
                //   totalC = ejercEc[i].valor;
                //   currentEc.push([date, totalC]);
                // }
                // var ecData = {
                //   'key': "eC",
                //   'values': currentEc,
                //   'color': '#7777ff'
                // };

                var chartOutputData = [cultData, ecData];
                return chartOutputData;
              };
              $scope.pHData = grafPh;
            });

          }
        });

      }

      angular
      .module('App')
      .controller('LectuParcController', LectuParcController);

    })();



    (function () {

      'use strict';

      /* @ngInject */
      function EditLectuCtrl ($scope, $rootScope, $state, $stateParams, HttpService, lectura, LecturaModel, MessageService) {
        $scope.title = 'Lecturas';
        $scope.date = moment().format('LL');
        $scope.errors = [];
        $scope.lectura = lectura;
        $scope.save = function() {
          var model = {
            id: $stateParams.lectId,
            valor: this.lectura.valor
          };

          LecturaModel.update(model.id, model).then(function(res) {
            MessageService.success('Lectura updated successfully');
            $state.go('main.camp.lectu.parc', {ejercId: $stateParams.ejercId, parcId: $stateParams.parcId});
          });
        };

        $scope.back = function() {
          $state.go('main.camp.lectu.parc', {ejercId: $stateParams.ejercId, parcId: $stateParams.parcId});
        };

        $scope.delete = function() {
          var model = {
            id: $stateParams.lectId,
          };

          LecturaModel.delete(model.id).then(function(res) {
            MessageService.success('Lectura borrada');
            $state.go('main.camp.lectu.parc', {ejercId: $stateParams.ejercId, parcId: $stateParams.parcId});
          });

        };

      }

      angular
      .module('App')
      .controller('EditLectuCtrl', EditLectuCtrl);

    })();
