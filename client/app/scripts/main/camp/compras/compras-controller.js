// angular.module('App.compras', []).
//
// controller('ComprasCtrl',
// function($scope, $rootScope, $state, $stateParams, AppK, CurrentFinca, LocalService) {
//   $scope.appName = AppK.appName;
//   $scope.title = 'Compras';
//   $scope.fincaName = CurrentFinca.fincaCur().fincaname;
//
//   LocalService.unset('AlbProveedor');
//   LocalService.unset('FchAlb');
// })
// ;

(function () {

  'use strict';

  /* @ngInject */
  function ComprasController ($scope, $rootScope, $state, $stateParams, AppK, CurrentFinca, header, navbar) {
    this.appName = AppK.appName;
    this.title = 'Compras';
    this.fincaName = CurrentFinca.fincaCur().fincaname;


    $rootScope.headerItem = header;
    $rootScope.navbarItems = navbar;
  }

  angular
  .module('App')
  .controller('ComprasController', ComprasController);

})();
