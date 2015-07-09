
(function () {

  'use strict';

  /* @ngInject */
  function ScoutController ($scope, $rootScope, $state, $stateParams, CurrentFinca, header, navbar) {

    $scope.title = 'Scouting';
    $scope.fincaName = CurrentFinca.fincaCur().fincaname;

    $rootScope.headerItem = header;
    $rootScope.navbarItems = navbar;

  }

  angular
  .module('App')
  .controller('ScoutController', ScoutController);

})();
