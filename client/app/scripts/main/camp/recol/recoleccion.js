/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.recoleccion
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.recoleccion module
  angular.module('App.main.recoleccion', [
    'App.main.recoleccion.especies'
  ]);

  // Module configuration
  angular.module('App.main.recoleccion')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// RECOLECCION //////////////////////
        .state('main.camp.recolecc', {
          url: '',
          abstract: true,
          template: '<div ui-view></div>',
          controller: 'RecoleccController',
          resolve: {
            header: function($rootScope, HeaderService) {
              return HeaderService.getItem('recoleccion');
            },
            navbar: function($rootScope, NavbarService) {
              return NavbarService.getItems('recoleccion');
            }
          }
        }).

        state('main.camp.recolecc.home', {
          url: '/recoleccion',
          templateUrl: 'scripts/main/camp/recol/recoleccion.html',
          controller: '',
        })

      }
    ]
  );
}());
