(function() {
  'use strict';


  function VtasController($scope, $rootScope, $state, $stateParams, $ionicModal, $ionicPopover, $ionicLoading, AppK, header, navbar) {
    $scope.appName = AppK.appName;
    $scope.title = 'Inicio';


    $rootScope.headerItem = header;
    $rootScope.navbarItems = navbar;


  }

  angular
  .module('App')
  .controller('VtasController', VtasController);

})();
