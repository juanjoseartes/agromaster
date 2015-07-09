/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.maquinaria.alquiler
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.maquinaria.alquiler module
  angular.module('App.main.maquinaria.alquiler', []);

  // Module configuration
  angular.module('App.main.maquinaria.alquiler')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// ALQUILER //////////////////////
        .state('main.camp.maq.alq', {
          url: '/alquiler',
          templateUrl: 'scripts/main/camp/maquinaria/alquiler/maqAlq.html',
          controller: 'MaqAlqController',
          resolve: {
            maquinaria: function(CurrentFinca, HttpService) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId,
                propiedad: 'alquiler'
              };
              return HttpService.getAll(model, 'maquinaria');
            },
          }
        }).

        state('main.camp.maq.alq.edit', {
          url: '/:maqId',
          templateUrl: 'scripts/main/camp/maquinaria/alquiler/editMaqAlq.html',
          controller: 'EditMaqController',
          resolve: {
            maquinaria: function($stateParams, HttpService) {
              var model = {
                id: $stateParams.maqId
              };
              return HttpService.findOne(model, 'maquinaria');
            },
            tipomaquinas: function(CurrentFinca, HttpService) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return HttpService.getAll(model, 'tipomaq');
            },
          }
        }).

        state('main.camp.maq.add.alq1', {
          url: '/alquiler/proveedor',
          templateUrl: 'scripts/main/camp/maquinaria/alquiler/addMaqAlqProv.html',
          controller: 'AddMaqAlqController',
          resolve: {
            tipomaquinas: function(CurrentFinca, HttpService) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return HttpService.getAll(model, 'tipomaq');
            },
            proveedores: function(CurrentFinca, HttpService) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId
              };
              return HttpService.getAll(model, 'proveedor');
            },
            proveedor: function($stateParams, HttpService) {
              var model = {
                id: $stateParams.provId
              };
              return HttpService.findOne(model, 'proveedor');
            }
          }
        }).

        state('main.camp.maq.add.alq1.new', {
          url: '/new',
          templateUrl: 'scripts/main/camp/maquinaria/alquiler/newProveed.html',
          controller: 'AddProvMaqAlqController',
        }).

        state('main.camp.maq.add.alq2', {
          url: '/alquiler/proveedor/:provId',
          templateUrl: 'scripts/main/camp/maquinaria/alquiler/addMaqAlq.html',
          controller: 'AddMaqAlqController',
          resolve: {
            tipomaquinas: function(CurrentFinca, HttpService) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return HttpService.getAll(model, 'tipomaq');
            },
            proveedores: function(CurrentFinca, HttpService) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId
              };
              return HttpService.getAll(model, 'proveedor');
            },
            proveedor: function($stateParams, HttpService) {
              var model = {
                id: $stateParams.provId
              };
              return HttpService.findOne(model, 'proveedor');
            }
          }
        })

      }
    ]
  );
}());
