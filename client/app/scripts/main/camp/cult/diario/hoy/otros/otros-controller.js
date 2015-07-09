(function () {

  'use strict';

  /* @ngInject */
  function CultDiaOtrosCtrl ($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentFinca, HttpService, detOtros) {

    $scope.detotros = detOtros;
    $scope.back = function() {
      $state.go('^', $stateParams);
    };
    $scope.getTotal = function() {
      var total = detOtros.reduce(function(memo, res) {
        return memo + (res.cantidad*res.precio)
      }, 0);
      return total;
    };
    $scope.create = function() {
      var model = {
        tipo: $stateParams.nameDia,
        ejercicio: $stateParams.ejercId,
        finca: CurrentFinca.fincaCur().fincaId,
        concepto: this.ot.concepto,
        cantidad: this.ot.cantidad,
        precio: this.ot.precio
      };
      console.log('Select Otros: ' + JSON.stringify(model));
      HttpService.create(model, 'otroscultivo').then(function(err) {
        $state.go('^', $stateParams);
      });

    };
    $scope.deleteOt = function(item) {
      var model = {
        id: item.id
      };
      //console.log('MaqlDel: ' + JSON.stringify(model));
      HttpService.delete(model, 'otroscultivo').then(function(err){
      });
      $scope.detotros.splice($scope.detotros.indexOf(item), 1);
    };

    //Otros
    $sailsSocket.subscribe('otroscultivo', function(message) {
      console.log('sails published a message for otros cultivo: ' + message.verb);

      switch (message.verb) {
        case 'created':
          var model = {
            ejerc: $stateParams.ejercId,
            finca: CurrentFinca.fincaCur().fincaId,
            tipo: $stateParams.nameDia
          };
          HttpService.findToday(model, 'otroscultivo').then(function(modelList) {
            $scope.detotros = modelList;
            $scope.getTotal = function() {
              var total = modelList.reduce(function(memo, res) {
                return memo + (res.cantidad*res.precio)
              }, 0);
              return total;
            };
          });
          break;
          case 'updated':
            var model = {
              ejerc: $stateParams.ejercId,
              finca: CurrentFinca.fincaCur().fincaId,
              tipo: $stateParams.nameDia
            };
            HttpService.findToday(model, 'otroscultivo').then(function(modelList) {
              $scope.detotros = modelList;
              $scope.getTotal = function() {
                var total = modelList.reduce(function(memo, res) {
                  return memo + (res.cantidad*res.precio)
                }, 0);
                return total;
              };
            });
            break;
            case 'destroyed':
              var model = {
                ejerc: $stateParams.ejercId,
                finca: CurrentFinca.fincaCur().fincaId,
                tipo: $stateParams.nameDia
              };
              HttpService.findToday(model, 'otroscultivo').then(function(modelList) {
                $scope.detotros = modelList;
                $scope.getTotal = function() {
                  var total = modelList.reduce(function(memo, res) {
                    return memo + (res.cantidad*res.precio)
                  }, 0);
                  return total;
                };
              });
            }
          });

  }

  angular
  .module('App')
  .controller('CultDiaOtrosCtrl', CultDiaOtrosCtrl);

})();

(function () {

  'use strict';

  /* @ngInject */
  function CultDiaEditOtrosCtrl ($scope, $rootScope, $state, $stateParams, CurrentFinca, HttpService, otro) {

    $scope.otro = otro;


    $scope.save = function() {

      var model = {
        id: $stateParams.otId,
        tipo: $stateParams.nameDia,
        ejercicio: $stateParams.ejercId,
        finca: CurrentFinca.fincaCur().fincaId,
        concepto: this.otro.concepto,
        cantidad: this.otro.cantidad,
        precio: this.otro.precio

      };
      console.log('Select Mat: ' + JSON.stringify(model));
      HttpService.update(model, 'otroscultivo').then(function(err) {

      });
      $state.go('^', $stateParams);
    };
    $scope.back = function() {
      $state.go('^', $stateParams);
    };

  }

  angular
  .module('App')
  .controller('CultDiaEditOtrosCtrl', CultDiaEditOtrosCtrl);

})();
