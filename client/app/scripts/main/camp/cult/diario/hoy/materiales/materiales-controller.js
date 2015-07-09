(function () {

  'use strict';

  /* @ngInject */
  function CultDiaMatCtrl ($scope, $rootScope, $state, $stateParams, $sailsSocket, HttpService, resDiario, materiales, detMateriales, CurrentFinca) {
    //Obtengo Abonos del almacen
    //$scope.resDia = resDiario[0].materiales;
    $scope.detmateriales = detMateriales;
    $scope.getTotal = function() {
      var total = detMateriales.reduce(function(memo, res) {
        return memo + (res.cantidad*res.precio)
      }, 0);
      return total;
    };

    var abonos = materiales.filter(function (el) {
      return el.almacen == 'abonos';
    });
    $scope.abonos = abonos;
    // Obtengo fitosanitarios del almacen
    var fitos = materiales.filter(function (el) {
      return el.almacen == 'fitosanitarios';
    });
    $scope.fitos = fitos;
    // Obtengo material vegetal del almacen
    var matveg = materiales.filter(function (el) {
      return el.almacen == 'material vegetal';
    });
    $scope.matveg = matveg;
    //
    // $scope.detmateriales = detMateriales;



    $scope.diario = {
      materiales: []
    };
    $scope.create = function(parcelas) {
      var model = {
        tipo: $stateParams.nameDia,
        ejercicio: $stateParams.ejercId,
        finca: CurrentFinca.fincaCur().fincaId,
        materiales: this.diario.materiales,

      };
      console.log('Select Materiales: ' + JSON.stringify(model));
      HttpService.create(model, 'matcultivo').then(function(err) {
        $state.go('^', $stateParams);
      });
      //$state.go('main.camp.cult.home.hoy.diario.materiales', $stateParams);
    };
    $scope.back = function() {
      $state.go('^', $stateParams);
    };
    $scope.deleteMat = function(item) {
      var model = {
        id: item.id
      };
      //console.log('MaqlDel: ' + JSON.stringify(model));
      HttpService.delete(model, 'matcultivo').then(function(err){
        $scope.resDia.splice($scope.resDia.indexOf(item), 1);
      });

    };

    //Parte Cultivo
    $sailsSocket.subscribe('partecult', function(message) {
      console.log('sails published a message for parte cultivo: ' + message.verb);
      switch (message.verb) {
        case 'created':
          var model = {
            ejerc: $stateParams.ejercId,
            tipo: $stateParams.nameDia
          };
          HttpService.findToday(model, 'partecult').then(function(modelList) {
            $scope.resDia = modelList[0].materiales;
            $scope.getTotal = function() {
              var total = modelList[0].materiales.reduce(function(memo, res) {
                return memo + (res.cantidad*res.precio)
              }, 0);
              return total;
            };
          });
          break;
        case 'updated':
          var model = {
            ejerc: $stateParams.ejercId,
            tipo: $stateParams.nameDia
          };
          HttpService.findToday(model, 'partecult').then(function(modelList) {
            $scope.resDia = modelList[0].materiales;
            $scope.getTotal = function() {
              var total = modelList[0].materiales.reduce(function(memo, res) {
                return memo + (res.cantidad*res.precio)
              }, 0);
              return total;
      };
      });
    break;
      case 'destroyed':
        var model = {
        ejerc: $stateParams.ejercId,
        tipo: $stateParams.nameDia
      };
      HttpService.findToday(model, 'partecult').then(function(modelList) {
        $scope.resDia = modelList[0].materiales;
        $scope.getTotal = function() {
          var total = modelList[0].materiales.reduce(function(memo, res) {
            return memo + (res.cantidad*res.precio)
          }, 0);
          return total;
        };
      });
      break;
        case 'addedTo':
        var model = {
          ejerc: $stateParams.ejercId,
          tipo: $stateParams.nameDia
        };
        HttpService.findToday(model, 'partecult').then(function(modelList) {
          $scope.resDia = modelList[0].materiales;
          $scope.getTotal = function() {
              var total = modelList[0].materiales.reduce(function(memo, res) {
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
  .controller('CultDiaMatCtrl', CultDiaMatCtrl);
})();

        (function () {

          'use strict';

          /* @ngInject */
          function CultDiaEditMatCtrl ($scope, $rootScope, $state, $stateParams, CurrentFinca, HttpService, material, unidades) {

            $scope.material = material;
            $scope.unidades = unidades;

            $scope.save = function() {

              var model = {
                id: $stateParams.matId,
                producto: material.producto,
                cantidad: this.material.cantidad,
                unidad: this.material.unidad
              };
              console.log('Select Mat: ' + JSON.stringify(model));
              HttpService.update(model, 'matcultivo').then(function(err) {

              });
              $state.go('^', $stateParams);
            };
            $scope.back = function() {
              $state.go('^', $stateParams);
            };

          }

          angular
          .module('App')
          .controller('CultDiaEditMatCtrl', CultDiaEditMatCtrl);

        })();
