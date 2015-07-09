(function () {

  'use strict';

  /* @ngInject */
  function TarjetasController ($scope, $rootScope, $state, $stateParams, HttpService, tarjetas) {

    $scope.tarjetas = tarjetas;


  }

  angular
  .module('App')
  .controller('TarjetasController', TarjetasController);

})();
