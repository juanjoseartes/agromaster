(function () {

  'use strict';

  /* @ngInject */
  function TProgramController ($scope, $rootScope, $state, $stateParams, CurrentFinca, header, navbar) {

    $scope.title = 'Tareas Programadas';
    $scope.fincaName = CurrentFinca.fincaCur().fincaname;

    $rootScope.headerItem = header;
    $rootScope.navbarItems = navbar;

  }

  angular
  .module('App')
  .controller('TProgramController', TProgramController);

})();
