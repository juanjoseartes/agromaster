/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.ventas
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.ventas module
  angular.module('App.main.ventas', []);

  // Module configuration
  angular.module('App.main.ventas')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// VENTAS //////////////////////
        .state('main.camp.vtas', {
          url: '/ventas',
          templateUrl: 'scripts/main/camp/vtas/ventas.html',
          controller: 'VtasController',
          resolve: {
            header: function($rootScope, HeaderService) {
              return HeaderService.getItem('ventas');
            },
            navbar: function($rootScope, NavbarService) {
              return NavbarService.getItems('ventas');
            }
          }
        });

      }
    ]
  );
}());
