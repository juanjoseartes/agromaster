/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.resumen.especies
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.resumen.especies module
  angular.module('App.main.cmi.especies', []);

  // Module configuration
  angular.module('App.main.cmi.especies')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// ESPECIES //////////////////////
        .state('main.camp.cmi.espec', {
          url: '/:especId',
          templateUrl: 'scripts/main/camp/cmi/especies/especies.html',
          controller: 'CmiEspecController',
          resolve: {
            especName: function($stateParams, CurrentFinca) {
              if ($stateParams.especId) {
                return CurrentFinca.fincaCur().ejercCurso.especies.filter(function(item) {
                  return item.id == $stateParams.especId;
                });
              }

            }
          }
        }).

        state('main.camp.cmi.espec.total', {
          url: '/total',
          templateUrl: 'scripts/main/camp/cmi/especies/total.html',
          controller: 'CmiTotalController',
          resolve: {
            diarios: function($stateParams, CurrentFinca, HttpService) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                ejerc: $stateParams.ejercId
              };
              return HttpService.getAll(model, 'tipodiario');
            },
            reparto: function($stateParams, CurrentFinca, HttpService) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                ejerc: $stateParams.ejercId
              };
              return HttpService.getAll(model, 'repartocult')
            },
            totales: function($stateParams, HttpService) {
              var model = {
                ejerc: $stateParams.ejercId
              };
              return HttpService.getTotal(model, 'partecult')
            },
            amortizacion: function($stateParams, HttpService, CurrentFinca) {
              var model = {
                ejerc: $stateParams.ejercId,
                finca: CurrentFinca.fincaCur().fincaId,
                propiedad: 'propiedad'
              };
              //console.log('Model: ' + JSON.stringify(model));
              return HttpService.getActive(model, 'maquinaria');
            }
          }

        }).

        state('main.camp.cmi.espec.total.costes', {
          url: '/:tipoId',
          templateUrl: 'scripts/main/camp/cmi/especies/costes/tipo.html'
        }).

        // state('main.camp.cmi.espec.total.amort', {
        //   url: '/amortizaciones',
        //   templateUrl: 'scripts/main/camp/cmi/especies/costes/amortizaciones.html'
        // }).


        state('main.camp.cmi.espec.total.isos', {
          url: '/:confeccId',
          templateUrl: 'scripts/main/camp/cmi/especies/ingresos/confeccion.html'
        }).

        state('main.camp.cmi.espec.ha', {
          url: '/ha',
          templateUrl: 'scripts/main/camp/cmi/especies/costes/costes.html'
        }).

        state('main.camp.cmi.espec.kg', {
          url: '/kg',
          templateUrl: 'scripts/main/camp/cmi/especies/costes/costes.html'
        })

      }
    ]
  );
}());
