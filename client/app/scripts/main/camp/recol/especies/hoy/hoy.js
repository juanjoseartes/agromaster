/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.recoleccion.especies.hoy
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.recoleccion.especies.hoy module
  angular.module('App.main.recoleccion.especies.hoy', []);

  // Module configuration
  angular.module('App.main.recoleccion.especies.hoy')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// HOY //////////////////////
        .state('main.camp.recolecc.home.espec.hoy', {
          url: '/hoy',
          templateUrl: 'scripts/main/camp/recol/especies/hoy/hoy.html',
          controller: 'RecoleccHoyCtrl',
          resolve: {
            resDia: function($stateParams, HttpService) {
              var model = {
                ejerc: $stateParams.ejercId,
                especie: $stateParams.especId
              };
              return HttpService.getToday(model, 'recoleccion');
            },
            confeccHoy: function($stateParams, HttpService) {
              var model = {
                ejerc: $stateParams.ejercId,
                especie: $stateParams.especId
              };
              return HttpService.getToday(model, 'confecdia');
            }
          }
        }).

        state('main.camp.recolecc.home.espec.hoy.confecc', {
          url: '/confecciones',
          templateUrl: 'scripts/main/camp/recol/especies/hoy/confecciones.html',
          controller: '',
          resolve: {

          }
        }).
        state('main.camp.recolecc.home.espec.hoy.confecc.add', {
          url: '/add',
          templateUrl: 'scripts/main/camp/recol/especies/hoy/addconfecc.html',
          controller: '',
          resolve: {

          }
        }).
        state('main.camp.recolecc.home.espec.hoy.emplead', {
          url: '/empleados',
          templateUrl: 'scripts/main/camp/recol/especies/hoy/empleados.html',
          controller: '',
          resolve: {

          }
        }).
        state('main.camp.recolecc.home.espec.hoy.parcela', {
          url: '/parcelas',
          templateUrl: 'scripts/main/camp/recol/especies/hoy/parcelas.html',
          controller: '',
          resolve: {

          }
        })

      }
    ]
  );
}());
