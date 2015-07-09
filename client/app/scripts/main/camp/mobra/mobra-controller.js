(function () {

  'use strict';

  /* @ngInject */
  function MObraController ($scope, $rootScope, $state, $stateParams, UserService, CurrentFinca, AppK, header, navbar) {
    $scope.appName = AppK.appName;
    $scope.title = 'Diario Mano de Obra';
    $scope.date = moment().format('LL');

    $rootScope.headerItem = header;
    $rootScope.navbarItems = navbar;

    var menus = [
      {
        name: 'Presencia',
        state: 'main.camp.mobra.presencia.inicio',
        icon: 'ion-ios-camera-outline'
      },
      {
        name: 'Empleados',
        state: 'main.camp.mobra.empleados',
        icon: 'ion-person-stalker'
      },
      {
        name: 'Tarjetas',
        state: 'main.camp.mobra.tarjetas',
        icon: 'ion-ios-pricetags-outline'
      }
    ];

    $rootScope.menuItems = menus;

  }

  angular
  .module('App')
  .controller('MObraController', MObraController);

})();
