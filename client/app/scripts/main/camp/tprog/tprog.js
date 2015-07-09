/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.tprog
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.tprog module
  angular.module('App.main.tprog', []);

  // Module configuration
  angular.module('App.main.tprog')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// TAREAS PROGRAMADAS //////////////////////
        .state('main.camp.tprog', {
          url: '/tprogram',
          abstract: true,
          templateUrl: 'scripts/main/camp/tprog/tprogram.html',
          controller: 'TProgramController',
          resolve: {
            header: function($rootScope, HeaderService) {
              return HeaderService.getItem('tareas');
            },
            navbar: function($rootScope, NavbarService) {
              return NavbarService.getItems('tareas');
            }
          }
        }).

        state('main.camp.tprog.riego', {
          url: '/riego',
          templateUrl: 'scripts/main/camp/tprog/riego/riego.html',
          controller: ''
        }).

        state('main.camp.tprog.abonado', {
          url: '/abonado',
          templateUrl: 'scripts/main/camp/tprog/abonado/abonado.html',
          controller: ''
        }).

        state('main.camp.tprog.tratam', {
          url: '/tratamiento',
          templateUrl: 'scripts/main/camp/tprog/tratam/tratam.html',
          controller: ''
        });

      }
    ]
  );
}());
