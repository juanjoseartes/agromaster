/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.almacen.abono
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.almacen.abono module
  angular.module('App.main.almacen.abono', []);

  // Module configuration
  angular.module('App.main.almacen.abono')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// ABONO //////////////////////
        .state('main.camp.almac.abono', {
          url: '/abono',
          templateUrl: 'scripts/main/camp/almacen/abono/abono.html',
          controller: 'AlmAbonoController',
          resolve: {
            abonos: function(CurrentFinca, HttpService) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                almacen: 'abonos'
              };
              return HttpService.getAll(model, 'producto');
            },
          }
        }).

        state('main.camp.almac.searchabono', {
          url: '/searchabono',
          templateUrl: 'scripts/main/camp/almacen/abono/searchAbono.html',
          controller: 'SearchAbonoController',
          resolve: {
            abonoList: function(CurrentFinca, HttpService) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return HttpService.getAbonos(model, 'articulo');
            }
          }
        })

      }
    ]
  );
}());
