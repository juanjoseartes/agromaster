/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.mobra
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.mobra module
  angular.module('App.main.mobra', [
    'App.main.mobra.empleados',
    'App.main.mobra.presencia',
    'App.main.mobra.historico',
    'App.main.mobra.tarjetas'
  ]);

  // Module configuration
  angular.module('App.main.mobra')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// MANO DE OBRA //////////////////////
        .state('main.camp', {
          url: '/:ejercId',
          abstract: true,
          parent: 'main',
          template: '<div ui-view></div>',
          controller: ''
        })
        .state('main.camp.mobra', {
          url: '/mobra',
          templateUrl: 'scripts/main/camp/mobra/mobra.html',
          controller: 'MObraController',
          resolve: {

            header: function(HeaderService) {
              return HeaderService.getItem('manoobra');

            },
            navbar: function(NavbarService) {
              return NavbarService.getItems('manoobra');
            }
          }
        })
        .state('main.camp.mobra.presencia', {
          url: '/presencia',
          templateUrl: 'scripts/main/camp/mobra/presencia/presencia.html',
          controller: 'MObraPresencController',
          resolve: {
            resDia: function($stateParams, HttpService, ParteMoModel) {
              var model = {
                ejerc: $stateParams.ejercId
              };
              return ParteMoModel.findToday(model);
            },
          }
        }).

          state('main.camp.mobra.presencia.inicio', {
            url: '/inicio',
            templateUrl: 'scripts/main/camp/mobra/presencia/inicio/inicio.html',
            controller: 'MObraPresencInicController',
            resolve: {
              // resDia: function($stateParams, HttpService, ParteMoModel) {
              //   var model = {
              //     ejerc: $stateParams.ejercId
              //   };
              //   //return HttpService.findToday(model, 'partemo');
              //   return ParteMoModel.findToday(model);
              // },

              resEjercCult: function($stateParams, HttpService, ParteMoModel) {
                var model = {
                  id: $stateParams.ejercId,
                  tipo: 'cultivo'
                };
                //return HttpService.getEjercicio(model, 'partemo');
                return ParteMoModel.getEjercicio(model);
              },
              resEjercRec: function($stateParams, HttpService, ParteMoModel) {
                var model = {
                  id: $stateParams.ejercId,
                  tipo: 'recoleccion'
                };
                //return HttpService.getEjercicio(model, 'partemo');
                return ParteMoModel.getEjercicio(model);
              },
              resEjercEnc: function($stateParams, HttpService, ParteMoModel) {
                var model = {
                  id: $stateParams.ejercId,
                  tipo: 'encargado'
                };
                //return HttpService.getEjercicio(model, 'partemo');
                return ParteMoModel.getEjercicio(model);
              },
            }

          })

      }
    ]
  );
}());
