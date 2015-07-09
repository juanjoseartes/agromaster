(function () {

  'use strict';

  /* @ngInject */
  function CultDiaMaqCtrl ($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentFinca, HttpService, resDiario, maquinas, detMaquinaria, maqAlq) {

    $scope.resDia = resDiario[0].maquinaria;

    $scope.maquinas = maquinas;
    //$scope.detmaquinaria = detMaquinaria;
    $scope.maqalq = maqAlq;
    $scope.diario = {
      maquinas: []
    };
    $scope.getTotal = function() {
      var total = resDiario[0].maquinaria.reduce(function(memo, res) {
        return memo + (res.cantidad*res.precio)
      }, 0);
      return total;
    };

    $scope.create = function(maquinas) {
      var model = {
        tipo: $stateParams.nameDia,
        ejercicio: $stateParams.ejercId,
        finca: CurrentFinca.fincaCur().fincaId,
        maquinas: this.diario.maquinas,

      };
      console.log('Select Maquinaria: ' + JSON.stringify(model));
      HttpService.create(model, 'maqcultivo').then(function(err) {
        $state.go('^', $stateParams);
      })
    };
    $scope.back = function() {
      $state.go('^', $stateParams);
    };
    $scope.deleteMaq = function(item) {
      var model = {
        id: item.id
      };
      //console.log('MaqlDel: ' + JSON.stringify(model));
      HttpService.delete(model, 'maqcultivo').then(function(err){
        $scope.resDia.splice($scope.resDia.indexOf(item), 1);
      })

    };


    //Parte Cultivo
    $sailsSocket.on('partecult', function(message) {
      console.log('sails published a message for parte cultivo: ' + message.verb);
      switch (message.verb) {
        case 'created':
          var model = {
            ejerc: $stateParams.ejercId,
            tipo: $stateParams.nameDia
          };
          HttpService.findToday(model, 'partecult').then(function(modelList) {
            var resModel = modelList[0].maquinaria;
            $scope.resDia = resModel;
            $scope.getTotal = function() {
              var total = resModel.reduce(function(memo, res) {
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
              var resModel = modelList[0].maquinaria;
              $scope.resDia = resModel;
              $scope.getTotal = function() {
                var total = resModel.reduce(function(memo, res) {
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
                var resModel = modelList[0].maquinaria;
                $scope.resDia = resModel;
                $scope.getTotal = function() {
                  var total = resModel.reduce(function(memo, res) {
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
                  var resModel = modelList[0].maquinaria;
                  $scope.resDia = resModel;
                  $scope.getTotal = function() {
                    var total = resModel.reduce(function(memo, res) {
                      return memo + (res.cantidad*res.precio)
                    }, 0);
                    return total;
                  };
                });
              }
            });
    //Maquinaria
    // $sails.on('maqcultivo', function(message) {
    //   console.log('sails published a message for maquinaria cultivo: ' + message.verb);
    //
    //   switch (message.verb) {
    //     case 'created':
    //       var model = {
    //         ejerc: $stateParams.ejercId,
    //         finca: CurrentFinca.fincaCur().fincaId,
    //         tipo: $stateParams.nameDia
    //       };
    //       HttpService.findToday(model, 'maqcultivo').then(function(modelList) {
    //         $scope.detmaquinaria = modelList;
    //         $scope.getTotal = function(){
    //           var total = 0;
    //           for(var i = 0; i < modelList.length; i++){
    //             var product = modelList[i];
    //             total += (product.precio * product.cantidad);
    //           }
    //           return total;
    //         };
    //       });
    //       break;
    //       case 'updated':
    //         var model = {
    //           ejerc: $stateParams.ejercId,
    //           finca: CurrentFinca.fincaCur().fincaId,
    //           tipo: $stateParams.nameDia
    //         };
    //         HttpService.findToday(model, 'maqcultivo').then(function(modelList) {
    //           $scope.detmaquinaria = modelList;
    //           $scope.getTotal = function(){
    //             var total = 0;
    //             for(var i = 0; i < modelList.length; i++){
    //               var product = modelList[i];
    //               total += (product.precio * product.cantidad);
    //             }
    //             return total;
    //           };
    //         });
    //         break;
    //         case 'destroyed':
    //           var model = {
    //             ejerc: $stateParams.ejercId,
    //             finca: CurrentFinca.fincaCur().fincaId,
    //             tipo: $stateParams.nameDia
    //           };
    //           HttpService.findToday(model, 'maqcultivo').then(function(modelList) {
    //             $scope.detmaquinaria = modelList;
    //             $scope.getTotal = function(){
    //               var total = 0;
    //               for(var i = 0; i < modelList.length; i++){
    //                 var product = modelList[i];
    //                 total += (product.precio * product.cantidad);
    //               }
    //               return total;
    //             };
    //           });
    //         }
    //       });


  }

  angular
  .module('App')
  .controller('CultDiaMaqCtrl', CultDiaMaqCtrl);

})();

(function () {

  'use strict';

  /* @ngInject */
  function CultDiaEditMaqCtrl ($scope, $rootScope, $state, $stateParams, CurrentFinca, HttpService, maquina) {

    $scope.maquina = maquina;


    $scope.save = function() {

      var model = {
        id: $stateParams.maqId,
        cantidad: this.maquina.cantidad,
        precio: this.maquina.precio
      };
      //console.log('Select Maq: ' + JSON.stringify(model));
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
  .controller('CultDiaEditMaqCtrl', CultDiaEditMaqCtrl);

})();
