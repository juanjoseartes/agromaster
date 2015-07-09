/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.mobra.presencia.encargados
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.mobra.presencia.encargados module
  angular.module('App.main.mobra.presencia.encargados', []);

  // Module configuration
  angular.module('App.main.mobra.presencia.encargados')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

          // PRESENCIA - ENCARGADOS //
          .state('main.camp.mobra.presencia.encargados', {
            url: '/encargado',
            templateUrl: 'scripts/main/camp/mobra/presencia/encargados/encargados.html',
            controller: 'MObraPresencEncController',
            resolve: {
              empleadAv: function($stateParams, CurrentFinca, HttpService, EmpleadoModel) {
                var model = {
                  finca: CurrentFinca.fincaCur().fincaId,
                  ejercicio: $stateParams.ejercId
                };
                return EmpleadoModel.getAvailable(model);
              },
              presEnc: function($stateParams, CurrentFinca, HttpService, ListEmpleadoModel) {
                var model = {
                  ejerc: $stateParams.ejercId,
                  finca: CurrentFinca.fincaCur().fincaId,
                  tipo: 'encargado'
                };
                //return HttpService.findToday(model, 'listempleado');
                return ListEmpleadoModel.findToday(model);
              },
            }
          })

            .state('main.camp.mobra.presencia.encargados.add', {
              url: '/add',
              templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/add.html',
              controller: '',
            })

            .state('main.camp.mobra.presencia.encargados.edit', {
              url: '/:moId/:costId',
              templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/edit.html',
              controller: 'MObraPresencEncEditController',
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

            .state('main.camp.mobra.presencia.encargados.change', {
              url: '/:moId/change',
              templateUrl: 'scripts/main/camp/mobra/presencia/encargados/change.html',
              controller: 'MObraPresencEncChangeController',
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
