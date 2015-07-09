/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.maquinaria.propiedad
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.maquinaria.propiedad module
  angular.module('App.main.maquinaria.propiedad', []);

  // Module configuration
  angular.module('App.main.maquinaria.propiedad')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// PROPIEDAD //////////////////////
        .state('main.camp.maq.prop', {
          url: '/propiedad',
          templateUrl: 'scripts/main/camp/maquinaria/propiedad/maqProp.html',
          controller: 'MaqPropController',
          resolve: {
            maquinaria: function(CurrentFinca, HttpService) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId,
                propiedad: 'propiedad'
              };
              return HttpService.getAll(model, 'maquinaria');
            },
          }
        }).

        state('main.camp.maq.prop.edit', {
          url: '/:maqId',
          templateUrl: 'scripts/main/camp/maquinaria/propiedad/editMaq.html',
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

        state('main.camp.maq.add.prop', {
          url: '/maquinaria/propiedad',
          templateUrl: 'scripts/main/camp/maquinaria/propiedad/addMaqProp.html',
          controller: 'AddMaqController',
          resolve: {
            tipomaquinas: function(CurrentFinca, HttpService) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return HttpService.getAll(model, 'tipomaq');
            },
          }
        })

      }
    ]
  );
}());
