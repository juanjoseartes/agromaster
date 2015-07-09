(function () {

  'use strict';

  /* @ngInject */
  function RecoleccController ($scope, $rootScope, $state, $stateParams, CurrentFinca, header, navbar) {

    $scope.title = 'Diario de Recoleccion';
    $scope.date = moment().format('LL');
    $scope.ejercCurso = CurrentFinca.fincaCur().ejercCurso;

    $rootScope.headerItem = header;
    $rootScope.navbarItems = navbar;

  }

  angular
  .module('App')
  .controller('RecoleccController', RecoleccController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function RecoleccHoyCtrl ($scope, $rootScope, $state, $stateParams, $sailsSocket, HttpService, CurrentFinca, confecciones, resDia, confeccHoy) {

    $scope.title = 'Diario de Recoleccion';
    $scope.date = moment().format('LL');
    $scope.resDia = resDia;
    $scope.confeccHoy = confeccHoy;
    $scope.confecciones = confecciones;
    $scope.back = function() {
      $state.go('^', $stateParams);
    };
    $scope.diario = {
      confecciones: []
    };
    $scope.create = function() {
      var model = {
        ejercicio: $stateParams.ejercId,
        especie: $stateParams.especId,
        confecciones: this.diario.confecciones
      };
      //console.log('Confecciones: ' + JSON.stringify(model));
      HttpService.create(model, 'confecdia').then(function(error){
        console.log(error);
      });
      $state.go('^', $stateParams);
    };

    //Parte Recoleccion
    $sailsSocket.subscribe('confecdia', function(message) {
      console.log('sails published a message for confecciones dia: ' + message.verb);

      switch (message.verb) {
        case 'created':
          var model = {
            ejerc: $stateParams.ejercId,
            especie: $stateParams.especId
          };
          HttpService.getToday(model, 'recoleccion').then(function(modelList) {
            $scope.resDia = modelList;
          });
          break;
        case 'updated':
          var model = {
            ejerc: $stateParams.ejercId,
            especie: $stateParams.especId
          };
          HttpService.getToday(model, 'recoleccion').then(function(modelList) {
            $scope.resDia = modelList;
          });
          break;
        case 'destroyed':
          var model = {
            ejerc: $stateParams.ejercId,
            especie: $stateParams.especId
          };
          HttpService.getToday(model, 'recoleccion').then(function(modelList) {
            $scope.resDia = modelList;
          });
        }
      });

  }

  angular
  .module('App')
  .controller('RecoleccHoyCtrl', RecoleccHoyCtrl);

})();
