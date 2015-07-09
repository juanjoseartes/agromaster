/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.almacen
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.almacen module
  angular.module('App.main.almacen', [
    'App.main.almacen.abono',
    'App.main.almacen.fitosanitario',
    'App.main.almacen.matvegetal'
  ]);

  // Module configuration
  angular.module('App.main.almacen')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// ALMACEN //////////////////////
        .state('main.camp.almac', {
          url: '/almacen',
          templateUrl: 'scripts/main/camp/almacen/almacen.html',
          controller: 'AlmacController',
          resolve: {
            header: function($rootScope, HeaderService) {
              return HeaderService.getItem('almacen');
            },
            navbar: function($rootScope, NavbarService) {
              return NavbarService.getItems('almacen');
            }
          }
        })

      }
    ]
  );
}());
