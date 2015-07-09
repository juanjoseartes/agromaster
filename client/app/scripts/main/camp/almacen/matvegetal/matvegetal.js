/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.almacen.matvegetal
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.almacen.matvegetal module
  angular.module('App.main.almacen.matvegetal', []);

  // Module configuration
  angular.module('App.main.almacen.matvegetal')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// ALMACEN //////////////////////
        .state('main.camp.almac.matveg', {
          url: '/mvegetal',
          templateUrl: 'scripts/main/camp/almacen/matvegetal/matvegetal.html',
          controller: 'AlmMVegController',
          resolve: {
            variedades: function(CurrentFinca, HttpService) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId,
                almacen: 'material vegetal'
              };
              return HttpService.getAll(model, 'producto');
            },
          }
        })

      }
    ]
  );
}());
