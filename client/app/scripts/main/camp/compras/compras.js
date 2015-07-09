/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.compras
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.compras module
  angular.module('App.main.compras', [
    'App.main.compras.albaran',
    'App.main.compras.factura',
    'App.main.compras.lineas'
  ]);

  // Module configuration
  angular.module('App.main.compras')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// COMPRAS //////////////////////
        .state('main.camp.compras', {
          url: '/compras',
          template: '<div ui-view></div>',
          controller: 'ComprasController',
          abstract: true
        }).

        state('main.camp.compras.home', {
          url: '',
          templateUrl: 'scripts/main/camp/compras/compras.html',
          controller: 'ComprasController as compras',
          resolve: {
            provCurso: function(PreAlbaran) {
              return PreAlbaran.provCur();
            },
            fchCurso: function(PreAlbaran) {
              return PreAlbaran.fchCur();
            },
            header: function($rootScope, HeaderService) {
              return HeaderService.getItem('compras');
            },
            navbar: function($rootScope, NavbarService) {
              return NavbarService.getItems('compras');
            }
          },
        })

      }
    ]
  );
}());
