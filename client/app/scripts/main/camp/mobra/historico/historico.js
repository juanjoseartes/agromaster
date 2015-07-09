/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.mobra.empleados
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.mobra.empleados module
  angular.module('App.main.mobra.historico', []);

  // Module configuration
  angular.module('App.main.mobra.historico')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        // EMPLEADOS //
        .state('main.camp.mobra.historico', {
          url: '/historico',
          templateUrl: 'scripts/main/camp/mobra/historico/historico.html',
          controller: 'MObraHistoricoController',
          resolve: {
            partes: function($stateParams, CurrentFinca, ParteMoModel) {
              var model = {
                id: $stateParams.ejercId,
                finca: CurrentFinca.fincaCur().fincaId
              };
              //return HttpService.getAll(model, 'empleado');
              return ParteMoModel.getEjercicio(model);
            },
            resEjercCult: function($stateParams, CurrentFinca, ParteMoModel) {
              var model = {
                id: $stateParams.ejercId,
                tipo: 'cultivo',
                fchinic: CurrentFinca.fincaCur().ejercCurso.fchinic.toString(),
                fchfin: CurrentFinca.fincaCur().ejercCurso.fchfin.toString()
              };
              //return HttpService.getEjercicio(model, 'partemo');
              return ParteMoModel.getEjercicio(model);
            },
            resEjercRec: function($stateParams, CurrentFinca, ParteMoModel) {
              var model = {
                id: $stateParams.ejercId,
                tipo: 'recoleccion',
                fchinic: CurrentFinca.fincaCur().ejercCurso.fchinic.toString(),
                fchfin: CurrentFinca.fincaCur().ejercCurso.fchfin.toString()
              };
              //return HttpService.getEjercicio(model, 'partemo');
              return ParteMoModel.getEjercicio(model);
            },
            resEjercEnc: function($stateParams, CurrentFinca, ParteMoModel) {
              var model = {
                id: $stateParams.ejercId,
                tipo: 'encargado',
                fchinic: CurrentFinca.fincaCur().ejercCurso.fchinic.toString(),
                fchfin: CurrentFinca.fincaCur().ejercCurso.fchfin.toString()
              };
              //return HttpService.getEjercicio(model, 'partemo');
              return ParteMoModel.getEjercicio(model);
            },
          }
        })

        .state('main.camp.mobra.historico.parte', {
          url: '/:parteId',
          templateUrl: 'scripts/main/camp/mobra/historico/parte/parte.html',
          controller: 'MObraParteController',
          resolve: {
            parte: function($stateParams, HttpService, ListEmpleadoModel) {
              var model = {
                id: $stateParams.parteId,
                ejercicio: $stateParams.ejercId
              };
              //return HttpService.findOne(model, 'empleado');
              return ListEmpleadoModel.findDay(model);
            }
          }
        })
      }
    ]
  );
}());
