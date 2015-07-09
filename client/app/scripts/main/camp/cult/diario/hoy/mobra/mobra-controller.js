(function () {

  'use strict';

  /* @ngInject */
  function CultDiaMObraCtrl ($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentFinca, HttpService, empleados, detMObra) {
    $scope.listempleados = empleados;
    $scope.detmobra = detMObra;
    $scope.getTotal = function() {
      var total = detMObra.reduce(function(memo, res) {
        return memo + (res.precio*res.coef)
      }, 0);
      return total;
    };
    $scope.diario = {
      empleados: []
    };
    // $scope.getTotal = function(){
    //   var total = 0;
    //   for(var i = 0; i < detMObra.length; i++){
    //     var product = detMObra[i];
    //     total += (product.precio * product.cantidad);
    //   }
    //   return total;
    // };
    $scope.create = function(parc) {
      var model = {
        tipo: $stateParams.nameDia,
        ejercicio: $stateParams.ejercId,
        finca: CurrentFinca.fincaCur().fincaId,
        empleados: this.diario.empleados,

      };
      console.log('Select Empleado: ' + JSON.stringify(model));
      HttpService.create(model, 'mocultivo').then(function(err) {
        $state.go('^', $stateParams);
      });
    };
    $scope.back = function() {
      $state.go('^', $stateParams);
    };
    $scope.delete = function(item) {
      var model = {
        id: item.id
      };
      //console.log('MaqlDel: ' + JSON.stringify(model));
      HttpService.delete(model, 'mocultivo').then(function(err){
        $scope.detmobra.splice($scope.detmobra.indexOf(item), 1);
      });

    };


    //Maquinaria
    $sailsSocket.subscribe('mocultivo', function(message) {
      console.log('sails published a message for mobra cultivo: ' + message.verb);

      switch (message.verb) {
        case 'created':
          var model = {
            ejerc: $stateParams.ejercId,
            finca: CurrentFinca.fincaCur().fincaId,
            tipo: $stateParams.nameDia
          };
          HttpService.findToday(model, 'mocultivo').then(function(modelList) {
            $scope.detmobra = modelList;
            $scope.getTotal = function() {
              var total = modelList.reduce(function(memo, res) {
                return memo + (res.precio*res.coef)
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
            HttpService.findToday(model, 'mocultivo').then(function(modelList) {
              $scope.detmobra = modelList;
              $scope.getTotal = function() {
                var total = modelList.reduce(function(memo, res) {
                  return memo + (res.precio*res.coef)
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
              HttpService.findToday(model, 'mocultivo').then(function(modelList) {
                $scope.detmobra = modelList;
                $scope.getTotal = function() {
                  var total = modelList.reduce(function(memo, res) {
                    return memo + (res.precio*res.coef)
                  }, 0);
                  return total;
                };
              });
            }
          });


  }

  angular
  .module('App')
  .controller('CultDiaMObraCtrl', CultDiaMObraCtrl);

})();

(function () {

  'use strict';

  /* @ngInject */
  function CultDiaEditMObraCtrl ($scope, $rootScope, $state, $stateParams, CurrentFinca, HttpService, maquina) {

    $scope.maquina = maquina;


    $scope.save = function() {

      var model = {
        id: $stateParams.maqId,
        cantidad: this.maquina.cantidad,
        precio: this.maquina.precio
      };
      console.log('Select Maq: ' + JSON.stringify(model));
      HttpService.update(model, 'maqcultivo').then(function(err) {
        $state.go('^', $stateParams);
      })
    };
    $scope.back = function() {
      $state.go('^', $stateParams);
    };

  }

  angular
  .module('App')
  .controller('CultDiaEditMObraCtrl', CultDiaEditMObraCtrl);

})();
