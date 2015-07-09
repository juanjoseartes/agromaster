/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.resumen
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.resumen module
  angular.module('App.main.cmi', [
    'App.main.cmi.especies'
  ]);

  // Module configuration
  angular.module('App.main.cmi')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// RESUMEN //////////////////////
        .state('main.camp.cmi', {
          url: '/cmandos',
          templateUrl: 'scripts/main/camp/cmi/cmi.html',
          controller: 'CmiController',
          resolve: {
            header: function($rootScope, HeaderService) {
              return HeaderService.getItem('resumen');
            },
            navbar: function($rootScope, NavbarService) {
              return NavbarService.getItems('resumen');
            }
          }
        })

      }
    ]
  );
}());
