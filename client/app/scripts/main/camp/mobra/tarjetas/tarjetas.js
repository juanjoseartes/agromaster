/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.mobra.tarjetas
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.mobra.tarjetas module
  angular.module('App.main.mobra.tarjetas', []);

  // Module configuration
  angular.module('App.main.mobra.tarjetas')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        // TARJETAS //
        .state('main.camp.mobra.tarjetas', {
          url: '/tarjetas',
          //abstract: true,
          templateUrl: 'scripts/main/camp/mobra/tarjetas/tarjetas.html',
          controller: 'TarjetasController',
          resolve: {
            tarjetas: function($stateParams, HttpService, CurrentFinca, TagModel) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
              };
              //return HttpService.getAll(model, 'tag');
              return TagModel.getAll(model);
            }
          }
        })

          .state('main.camp.mobra.tarjetas.asignac', {
            url: '/asignacion',
            templateUrl: 'scripts/main/camp/mobra/tarjetas/asignacion.html',
            controller: ''
          })

          .state('main.camp.mobra.tarjetas.inventario', {
            url: '/inventario',
            templateUrl: 'scripts/main/camp/mobra/tarjetas/inventario.html',
            controller: '',
          });

      }
    ]
  );
}());
