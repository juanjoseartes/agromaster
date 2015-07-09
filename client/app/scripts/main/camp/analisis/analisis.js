/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.analisis
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.analisis module
  angular.module('App.main.analisis', [
    'App.main.analisis.tipo'
  ]);

  // Module configuration
  angular.module('App.main.analisis')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// ANALISIS //////////////////////
        .state('main.camp.analisis', {
          url: '/analisis',
          abstract: true,
          templateUrl: 'scripts/main/camp/analisis/analisis.html',
          controller: 'AnalisisController',
          resolve: {
            header: function($rootScope, HeaderService) {
              return HeaderService.getItem('analisis');
            },
            navbar: function($rootScope, NavbarService) {
              return NavbarService.getItems('analisis');
            }
          }
        })

      }
    ]
  );
}());
