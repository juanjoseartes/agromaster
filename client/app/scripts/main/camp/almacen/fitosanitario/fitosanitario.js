/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.almacen.fitosanitario
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.almacen.fitosanitario module
  angular.module('App.main.almacen.fitosanitario', []);

  // Module configuration
  angular.module('App.main.almacen.fitosanitario')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// FITOSANITARIO //////////////////////
        .state('main.camp.almac.fito', {
          url: '/fitosanitario',
          templateUrl: 'scripts/main/camp/almacen/fitosanitario/fitosanitario.html',
          controller: 'AlmFitoController',
          resolve: {
            fitos: function(CurrentFinca, HttpService) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                almacen: 'fitosanitarios'
              };
              return HttpService.getAll(model, 'producto');
            },
          }
        }).

        state('main.camp.almac.fito.det', {
          url: '/:fitoId',
          templateUrl: 'scripts/main/camp/almacen/fitosanitario/searchFito.html',
          controller: 'SearchFitoController',
          resolve: {
            fitoList: function(CurrentFinca, HttpService) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return HttpService.getFitos(model, 'articulo');
            }
          }
        }).

        state('main.camp.almac.searchfito', {
          url: '/searchfito',
          templateUrl: 'scripts/main/camp/almacen/fitosanitario/searchFito.html',
          controller: 'SearchFitoController',
          resolve: {
            fitoList: function(CurrentFinca, HttpService) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return HttpService.getFitos(model, 'articulo');
            }
          }
        })

      }
    ]
  );
}());
