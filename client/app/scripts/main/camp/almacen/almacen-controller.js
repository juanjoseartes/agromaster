(function () {

  'use strict';

function AlmacController($scope, $rootScope, $state, $stateParams, AppK, header, navbar) {
  $scope.appName = AppK.appName;
  $scope.title = 'Almacen';


  $rootScope.headerItem = header;
  $rootScope.navbarItems = navbar;

}

angular
.module('App')
.controller('AlmacController', AlmacController);

})();
