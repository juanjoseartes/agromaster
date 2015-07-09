/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.recoleccion.especies.ejercicio
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.recoleccion.especies.ejercicio module
  angular.module('App.main.recoleccion.especies.ejercicio', []);

  // Module configuration
  angular.module('App.main.recoleccion.especies.ejercicio')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        // EJERCICIO //
        .state('main.camp.recolecc.home.espec.ejerc', {
          url: '/ejerc',
          templateUrl: 'scripts/main/camp/recol/especies/ejercicio.html',
          controller: '',
          resolve: {
            resEjerc: function($stateParams, HttpService) {
              var model = {
                ejerc: $stateParams.ejercId,
                especie: $stateParams.especId
              };
              return HttpService.getEjercicio(model, 'recoleccion');
            }
          }
        }).

        state('main.camp.recolecc.home.espec.ejerc.confecc', {
          url: '/confecciones',
          templateUrl: 'scripts/main/camp/recol/especies/ejercicio/confecciones.html',
          controller: '',
          resolve: {

          }
        }).
        state('main.camp.recolecc.home.espec.ejerc.emplead', {
          url: '/empleados',
          templateUrl: 'scripts/main/camp/recol/especies/ejercicio/empleados.html',
          controller: '',
          resolve: {

          }
        }).
        state('main.camp.recolecc.home.espec.ejerc.parcela', {
          url: '/parcelas',
          templateUrl: 'scripts/main/camp/recol/especies/ejercicio/parcelas.html',
          controller: '',
          resolve: {

          }
        })

      }
    ]
  );
}());
