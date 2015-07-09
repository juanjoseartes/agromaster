/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.maquinaria
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.maquinaria module
  angular.module('App.main.maquinaria', [
    'App.main.maquinaria.alquiler',
    'App.main.maquinaria.propiedad'
  ]);

  // Module configuration
  angular.module('App.main.maquinaria')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// MAQUINARIA //////////////////////
        .state('main.camp.maq', {
          url: '/maquinaria',
          abstract: true,
          templateUrl: 'scripts/main/camp/maquinaria/maquinaria.html',
          controller: 'MaqController',
          resolve: {
            header: function(HeaderService) {
              return HeaderService.getItem('maquinaria');
            },
            navbar: function(NavbarService) {
              return NavbarService.getItems('maquinaria');
            }
          }
        }).

        state('main.camp.maq.add', {
          url: '/add',
          abstract: true,
          template: '<div ui-view></div>'
        })

      }
    ]
  );
}());
