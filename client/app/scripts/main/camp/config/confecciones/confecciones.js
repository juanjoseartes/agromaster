/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.config.confecciones
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.config.confecciones module
  angular.module('App.main.config.confecciones', []);

  // Module configuration
  angular.module('App.main.config.confecciones')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// CONFIGURACION //////////////////////
        .state('main.camp.config.home.confecc', {
          url: '/confecciones',
          templateUrl: 'scripts/main/camp/config/confecciones/confecciones.html',
          controller: 'ConfigConfeccController',
          resolve: {
            confecciones: function(ConfeccionModel, $stateParams) {
              var model = {
                ejerc: $stateParams.ejercId
              };
              return ConfeccionModel.getActive(model);
            },

          }
        }).

        state('main.camp.config.home.confecc.add', {
          url: '/add',
          templateUrl: 'scripts/main/camp/config/confecciones/add.html',
          controller: '',
        }).

        state('main.camp.config.home.confecc.edit', {
          url: '/:confeccId',
          templateUrl: 'scripts/main/camp/config/confecciones/edit.html',
          controller: 'ConfigConfeccEditController',
          resolve: {
            confeccion: function($stateParams, ConfeccionModel) {
              var model = {
                id: $stateParams.confeccId
              };
              return ConfeccionModel.findOne(model);
            }
          }
        })

      }
    ]
  );
}());
