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
  angular.module('App.main.mobra.empleados', []);

  // Module configuration
  angular.module('App.main.mobra.empleados')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        // EMPLEADOS //
        .state('main.camp.mobra.empleados', {
          url: '/empleados',
          templateUrl: 'scripts/main/camp/mobra/empleados/empleados.html',
          controller: 'MObraEmpleadCtrl',
          resolve: {
            empleados: function($stateParams, CurrentFinca, HttpService, EmpleadoModel) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId
              };
              //return HttpService.getAll(model, 'empleado');
              return EmpleadoModel.getAll(model);
            }
          }
        })

        .state('main.camp.mobra.empleados.activos', {
          url: '/activos',
          templateUrl: 'scripts/main/camp/mobra/empleados/activos.html',
          controller: 'MObraEmpleadActCtrl',
          resolve: {
            empleados: function($stateParams, CurrentFinca, HttpService, EmpleadoModel) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId
              };
              //return HttpService.getAll(model, 'empleado');
              return EmpleadoModel.getActive(model);
            }
          }
        })

        .state('main.camp.mobra.empleados.add', {
          url: '/add',
          templateUrl: 'scripts/main/camp/mobra/empleados/addEmpleado.html',
          controller: 'MObraEmpleadCtrl'
        })

        .state('main.camp.mobra.empleados.edit', {
          url: '/:emplId',
          templateUrl: 'scripts/main/camp/mobra/empleados/editEmpleado.html',
          controller: 'MObraEmpleadEditCtrl',
          resolve: {
            empleado: function($stateParams, HttpService, EmpleadoModel) {
              var model = {
                id: $stateParams.emplId
              };
              //return HttpService.findOne(model, 'empleado');
              return EmpleadoModel.findOne(model);
            }
          }
        })
      }
    ]
  );
}());
