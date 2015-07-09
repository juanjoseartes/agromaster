/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.mobra.presencia.recoleccion
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.mobra.presencia.recoleccion module
  angular.module('App.main.mobra.presencia.recoleccion', []);

  // Module configuration
  angular.module('App.main.mobra.presencia.recoleccion')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        // PRESENCIA - RECOLECCION //
        .state('main.camp.mobra.presencia.recoleccion', {
          url: '/recoleccion',
          templateUrl: 'scripts/main/camp/mobra/presencia/recoleccion/recoleccion.html',
          controller: 'MObraPresencRecController',
          resolve: {
            empleadAv: function($stateParams, CurrentFinca, HttpService, EmpleadoModel) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                ejercicio: $stateParams.ejercId
              };
              return EmpleadoModel.getAvailable(model);
            },
            presRec: function($stateParams, CurrentFinca, HttpService, ListEmpleadoModel) {
              var model = {
                ejerc: $stateParams.ejercId,
                finca: CurrentFinca.fincaCur().fincaId,
                tipo: 'recoleccion'
              };
              //return HttpService.findToday(model, 'listempleado');
              return ListEmpleadoModel.findToday(model);
            },
          }
        })

        .state('main.camp.mobra.presencia.recoleccion.add', {
          url: '/add',
          templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/add.html',
          controller: '',
        })

        .state('main.camp.mobra.presencia.recoleccion.edit', {
          url: '/:moId/:costId',
          templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/edit.html',
          controller: 'MObraPresencRecEditController',
          resolve: {
            empleado: function($stateParams, HttpService, ListEmpleadoModel) {
              var model = {
                id: $stateParams.moId
              };
              //return HttpService.findOne(model, 'listempleado');
              return ListEmpleadoModel.findOne(model);
            }
          }
        })

        .state('main.camp.mobra.presencia.recoleccion.change', {
          url: '/:moId/change',
          templateUrl: 'scripts/main/camp/mobra/presencia/recoleccion/change.html',
          controller: 'MObraPresencRecChangeController',
          resolve: {
            empleado: function($stateParams, HttpService, ListEmpleadoModel) {
              var model = {
                id: $stateParams.moId
              };
              //return HttpService.findOne(model, 'listempleado');
              return ListEmpleadoModel.findOne(model);
            }
          }
        })

      }
    ]
  );
}());
