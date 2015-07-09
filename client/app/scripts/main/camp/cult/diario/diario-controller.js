(function () {

  'use strict';

  /* @ngInject */
  function CultDiaCtrl ($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentUser, CurrentFinca, AppK, HttpService, ParteCultivoModel, resDiario) {
    $scope.appName = AppK.appName;
    $scope.title = 'Diario de Cultivo';
    $scope.date = moment().format('LL');
    $scope.fincaName = CurrentFinca.fincaCur().fincaname;
    $scope.resDia = resDiario;

    //Parte Cultivo
    $sailsSocket.subscribe('partecult', function(message) {
      console.log('sails published a message for parte cultivo: ' + message.verb);
      switch (message.verb) {
        case 'created':
          var model = {
            ejerc: $stateParams.ejercId,
            tipo: $stateParams.nameDia
          };
          ParteCultivoModel.getToday(model).then(function(modelList) {
            $scope.resDia = modelList;
          });
          break;
          case 'addedTo':
            var model = {
              ejerc: $stateParams.ejercId,
              tipo: $stateParams.nameDia
            };
            ParteCultivoModel.getToday(model).then(function(modelList) {
              $scope.resDia = modelList;
            });
            break;
        case 'updated':
          var model = {
            ejerc: $stateParams.ejercId,
            tipo: $stateParams.nameDia
          };
          ParteCultivoModel.getToday(model).then(function(modelList) {
            $scope.resDia = modelList;
          });
          break;
        case 'destroyed':
          var model = {
            ejerc: $stateParams.ejercId,
            tipo: $stateParams.nameDia
          };
          ParteCultivoModel.getToday(model).then(function(modelList) {
            $scope.resDia = modelList;
          });
          break;
        case 'addedTo':
          var model = {
            ejerc: $stateParams.ejercId,
            tipo: $stateParams.nameDia
          };
          ParteCultivoModel.getToday(model).then(function(modelList) {
            $scope.resDia = modelList;
          });
        }
      });

  }

  angular
  .module('App')
  .controller('CultDiaCtrl', CultDiaCtrl);

})();
