/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.mobra.presencia.cultivo
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.mobra.presencia.cultivo module
  angular.module('App.main.mobra.presencia.cultivo', []);

  // Module configuration
  angular.module('App.main.mobra.presencia.cultivo')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

          // PRESENCIA - CULTIVO //
          .state('main.camp.mobra.presencia.cultivo', {
            url: '/cultivo',
            templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/cultivo.html',
            controller: 'MObraPresencCultController',
            resolve: {
              empleadAv: function($stateParams, CurrentFinca, HttpService, EmpleadoModel) {
                var model = {
                  finca: CurrentFinca.fincaCur().fincaId,
                  ejercicio: $stateParams.ejercId
                };
                return EmpleadoModel.getAvailable(model);
              },
              presCult: function($stateParams, CurrentFinca, HttpService, ListEmpleadoModel) {
                var model = {
                  ejerc: $stateParams.ejercId,
                  finca: CurrentFinca.fincaCur().fincaId,
                  tipo: 'cultivo'
                };
                //return HttpService.findToday(model, 'listempleado');
                return ListEmpleadoModel.findToday(model);
              },
            }
          })

            .state('main.camp.mobra.presencia.cultivo.add', {
              url: '/add',
              templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/add.html',
              controller: '',
            })

            .state('main.camp.mobra.presencia.cultivo.edit', {
              url: '/:moId/:costId',
              templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/edit.html',
              controller: 'MObraPresencCultEditController',
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

            .state('main.camp.mobra.presencia.cultivo.change', {
              url: '/:moId/change',
              templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/change.html',
              controller: 'MObraPresencCultChangeController',
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
