/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.compras.factura
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.compras.factura module
  angular.module('App.main.compras.factura', []);

  // Module configuration
  angular.module('App.main.compras.factura')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// FACTURA //////////////////////
        .state('main.camp.compras.home.fact', {
          url: '/facturas',
          templateUrl: 'scripts/main/camp/compras/facturas/facturas.html',
          controller: 'FactCompraController',
          resolve: {
            facturas: function(CurrentFinca, HttpService){
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                fchinic: CurrentFinca.fincaCur().ejercCurso.fchinic,
                fchfin: CurrentFinca.fincaCur().ejercCurso.fchfin
              };
              return HttpService.getAll(model, 'factcompra');
            }
          }
        })

      }
    ]
  );
}());
