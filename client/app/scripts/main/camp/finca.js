/**
* Messages component which is divided to following logical components:
*
*  Controllers
*
* All of these are wrapped to 'App.main.finca' angular module.
*/
(function() {
  'use strict';

  // Define App.main.finca angular module
  // Define frontend.core module
  angular.module('App.main.finca', []);

  // Module configuration
  angular.module('App.main.finca')
  .config([
    '$stateProvider',
    function config($stateProvider) {
      $stateProvider
      // Authors list
      // MAIN

      .state('main', {
        abstract: true,
        url: '/inicio',
        templateUrl: 'scripts/main/menu.html',
        controller: 'MainController',
        data: {
          access: 1
        },
        resolve: {
          header: function(HeaderService) {
            return HeaderService.getItem('inicio');
          },
          navbar: function(NavbarService) {
            return NavbarService.getItems('inicio');
          }
        }
      }).

      state('main.finca', {
        url: '/home',
        templateUrl: 'scripts/main/camp/fincas.html',
        controller: 'FincaController'
      }).

      state('main.finca.ejerc', {
        url: '/:fincaId',
        templateUrl: 'scripts/main/camp/ejercicios.html',
        controller: 'SelEjercicioController',
        resolve: {
          campanas: [
            '$stateParams',
            'HttpService',
            function resolve(
              $stateParams,
              HttpService
            ) {
              var parameters = {
                id: $stateParams.fincaId,
              };
              return HttpService.getAll(parameters, 'ejercicio');
            }
          ],
          especies: function(HttpService, $stateParams) {
            // var model = {
            //   finca: $stateParams.fincaId
            // };
            return HttpService.getAll('', 'especie')
          }
        }
      }).
      state('main.add', {
        url: '/:fincaId',
        abstract: true,
        template: '<div ui-view></div>'
      }).

      state('main.add.ejerc', {
        url: '/addejerc',
        templateUrl: 'scripts/main/camp/ejercicio.html',
        controller: 'addEjercCtrl'
      })
      ;
    }
  ])
  ;
}());
