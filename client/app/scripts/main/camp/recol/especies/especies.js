/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.recoleccion.especies
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.recoleccion.especies module
  angular.module('App.main.recoleccion.especies', [
    'App.main.recoleccion.especies.ejercicio',
    'App.main.recoleccion.especies.hoy'
  ]);

  // Module configuration
  angular.module('App.main.recoleccion.especies')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// ESPECIES //////////////////////
        .state('main.camp.recolecc.home.espec', {
          url: '/:especId',
          templateUrl: 'scripts/main/camp/recol/especies/inicio.html',
          controller: '',
          resolve: {
            confecciones: function($stateParams, CurrentFinca, HttpService) {
              var model = {
                ejerc: $stateParams.ejercId,
                especie: $stateParams.especId
              };
              //console.log('Model: ' + JSON.stringify(model));
              return HttpService.getActive(model, 'confeccion');
            }
          }
        })

      }
    ]
  );
}());
