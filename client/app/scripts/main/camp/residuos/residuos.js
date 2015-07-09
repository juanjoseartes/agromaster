/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.residuos
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.residuos module
  angular.module('App.main.residuos', []);

  // Module configuration
  angular.module('App.main.residuos')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// RESIDUOS //////////////////////
        .state('main.camp.residuos', {
          url: '/residuos',
          templateUrl: 'scripts/main/camp/residuos/residuos.html',
          controller: 'ResiduosCtrl',
          resolve: {
            residuos: function($stateParams, HttpService) {
              var model = {
                ejerc: $stateParams.ejercId
              };
              return HttpService.getAll(model, 'residuos');
            },
            header: function($rootScope, HeaderService) {
              return HeaderService.getItem('residuos');
            },
            navbar: function($rootScope, NavbarService) {
              return NavbarService.getItems('residuos');
            }
          }
        }).

        state('main.camp.residuos.add', {
          url: '/add',
          templateUrl: 'scripts/main/camp/residuos/addResiduos.html',
          controller: 'ResiduosAddCtrl',
          resolve: {
            gestCurso: function(PreResiduos) {
              return PreResiduos.gestCur();
            },
            fchCurso: function(PreResiduos) {
              return PreResiduos.fchCur();
            }
          }
        }).

        state('main.camp.residuos.add.gest', {
          url: '/gestores',
          templateUrl: 'scripts/main/camp/residuos/gestores/gestores.html',
          controller: 'ResiduosGestCtrl',
          resolve: {
            gestores: function($stateParams, CurrentFinca, HttpService) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
              };
              return HttpService.getAll(model, 'proveedor');
            }
          }
        }).

        state('main.camp.residuos.add.fecha', {
          url: '/fecha',
          templateUrl: 'scripts/main/camp/residuos/fecha/fecha.html',
          controller: 'ResiduosFechaCtrl',

        }).

        state('main.camp.residuos.edit', {
          url: '/:resId',
          templateUrl: 'scripts/main/camp/residuos/editResiduos.html',
          controller: 'ResiduosEditCtrl',
          resolve: {
            detResiduos: function($stateParams, HttpService) {
              var model = {
                id: $stateParams.resId
              };
              return HttpService.findOne(model, 'residuos');
            }
          }
        }).

        state('main.camp.residuos.upload', {
          url: '/:resId/upload',
          templateUrl: 'scripts/main/camp/residuos/uploads/upload.html',
          controller: 'ResiduosUploadCtrl'
        })

      }
    ]
  );
}());
