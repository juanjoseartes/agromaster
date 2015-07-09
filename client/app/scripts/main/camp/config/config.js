/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.config
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.config module
  angular.module('App.main.config', [
    'App.main.config.confecciones',
    'App.main.config.diario',
    'App.main.config.ejercicio',
    'App.main.config.grupomaquinaria',
    'App.main.config.parcela',
    'App.main.config.unidad',
    'App.main.config.usuario'
  ]);

  // Module configuration
  angular.module('App.main.config')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// CONFIGURACION //////////////////////
        .state('main.camp.config', {
          url: '',
          abstract: true,
          template: '<div ui-view></div>',
          controller: '',
          resolve: {

            unidades: function(UnidadModel) {
              return UnidadModel.getAll();
            },
          }
        }).

        state('main.camp.config.home', {
          url: '/config',
          templateUrl: 'scripts/main/camp/config/config.html',
          controller: 'ConfigController',
          resolve: {
            finca: function(FincaModel, CurrentFinca) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return FincaModel.findOne(model);
            },
            tiposdiario: function(TipoDiarioModel) {
              var model = {};
              return TipoDiarioModel.getAll();
            },
            especies: function(EspecieModel, CurrentFinca) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return EspecieModel.getAll(model);
            },
            maquinaria: function(CurrentFinca, TipoMaquinariaModel) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return TipoMaquinariaModel.getAll(model);
            },

          }
        })

      }
    ]
  );
}());
