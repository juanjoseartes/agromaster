(function () {

  'use strict';

  /* @ngInject */
  function MObraPresencController ($scope, $rootScope, $state, $stateParams, $sailsSocket, ParteMoModel, resDia) {

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

    if (resCult) {
      if (resCult[0]) {
        $scope.nCult = resCult[0].listempleados.length;
      } else {
        $scope.nCult = 0;
      }
    } else {$scope.nCult = 0;};
    if (resEnc) {
      if(resEnc[0]) {
        $scope.nEnc = resEnc[0].listempleados.length;
      } else {
        $scope.nEnc = 0;
      }
    } else {$scope.nEnc = 0;};
    if (resRec) {
      if (resRec[0]) {
        $scope.nRec = resRec[0].listempleados.length;
      } else {
        $scope.nRec = 0;
      }

    } else {$scope.nRec = 0;};


    //Empleados Cultivo
    $sailsSocket.subscribe('listempleado', function(message) {
      console.log('sails published a message for empleados cultivo: ' + message.verb);

      switch (message.verb) {
        case 'created':
        var model = {
          ejerc: $stateParams.ejercId
        };
        ParteMoModel.findToday(model).then(function(modelList) {
          var resCult = modelList.filter(function (el) {
            return el.tipo == 'cultivo';
          });
          var resRec = modelList.filter(function (el) {
            return el.tipo == 'recoleccion';
          });
          var resEnc = modelList.filter(function (el) {
            return el.tipo == 'encargado';
          });

          if (resCult) {
            $scope.nCult = resCult[0].listempleados.length;
          } else {$scope.nCult = '';};
          if (resEnc) {
            $scope.nEnc = resEnc[0].listempleados.length;
          } else {$scope.nEnc = '';};
          if (resRec) {
            $scope.nRec = resRec[0].listempleados.length;
          } else {$scope.nRec = '';};

        });
          break;
        case 'updated':
        var model = {
          ejerc: $stateParams.ejercId
        };
        ParteMoModel.findToday(model).then(function(modelList) {
          var resCult = modelList.filter(function (el) {
            return el.tipo == 'cultivo';
          });
          var resRec = modelList.filter(function (el) {
            return el.tipo == 'recoleccion';
          });
          var resEnc = modelList.filter(function (el) {
            return el.tipo == 'encargado';
          });

          if (resCult) {
            $scope.nCult = resCult[0].listempleados.length;
          } else {$scope.nCult = '';};
          if (resEnc) {
            $scope.nEnc = resEnc[0].listempleados.length;
          } else {$scope.nEnc = '';};
          if (resRec) {
            $scope.nRec = resRec[0].listempleados.length;
          } else {$scope.nRec = '';};

        });
          break;
        case 'destroyed':
        var model = {
          ejerc: $stateParams.ejercId
        };
        ParteMoModel.findToday(model).then(function(modelList) {
          var resCult = modelList.filter(function (el) {
            return el.tipo == 'cultivo';
          });
          var resRec = modelList.filter(function (el) {
            return el.tipo == 'recoleccion';
          });
          var resEnc = modelList.filter(function (el) {
            return el.tipo == 'encargado';
          });

          if (resCult) {
            $scope.nCult = resCult[0].listempleados.length;
          } else {$scope.nCult = '';};
          if (resEnc) {
            $scope.nEnc = resEnc[0].listempleados.length;
          } else {$scope.nEnc = '';};
          if (resRec) {
            $scope.nRec = resRec[0].listempleados.length;
          } else {$scope.nRec = '';};

        });
        }
      });


  }

  angular
  .module('App')
  .controller('MObraPresencController', MObraPresencController);

})();
