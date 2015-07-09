/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.config.parcela
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.config.parcela module
  angular.module('App.main.config.parcela', []);

  // Module configuration
  angular.module('App.main.config.parcela')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// PARCELA //////////////////////
        .state('main.camp.config.home.parc', {
          url: '/parcelas',
          templateUrl: 'scripts/main/camp/config/parcela/parcelas.html',
          controller: 'ConfigParcController',
          resolve: {
            parcelas: function(CurrentFinca, ParcelaModel) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return ParcelaModel.getAll(model);
            },
          }
        }).

        state('main.camp.config.home.parc.add', {
          url: '/add',
          templateUrl: 'scripts/main/camp/config/parcela/add.html',
          controller: ''
        }).

        state('main.camp.config.home.parc.edit', {
          url: '/:parcId',
          templateUrl: 'scripts/main/camp/config/parcela/edit.html',
          controller: 'ConfigParcController',
          resolve: {
            parcela: function($stateParams, ParcelaModel) {
              var model = {
                id: $stateParams.parcId
              };
              return ParcelaModel.findOne(model);
            }
          }
        })

      }
    ]
  );
}());
