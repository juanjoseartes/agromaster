/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.lecturas.parcelas
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.lecturas.parcelas module
  angular.module('App.main.lecturas.parcelas', []);

  // Module configuration
  angular.module('App.main.lecturas.parcelas')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// PARCELAS //////////////////////
        .state('main.camp.lectu.ph.resumen', {
          url: '/resumen',
          templateUrl: 'scripts/main/camp/lectu/ph/resumenPh.html',
          controller:'LectuResumenController',
          resolve: {
            // hoyPh: function($stateParams, HttpService) {
            //   var model = {
            //     id: $stateParams.ejercId,
            //     tipo: 'ph',
            //     parcela: $stateParams.parcId
            //   };
            //   return HttpService.findToday(model, 'lectura');
            // },
            ejerc: function($stateParams, HttpService) {
              var model = {
                id: $stateParams.ejercId,
                tipo: 'ph'
              };
              return HttpService.findEjercicio(model, 'lectura');
            },
            // hoyEc: function($stateParams, HttpService) {
            //   var model = {
            //     id: $stateParams.ejercId,
            //     tipo: 'ec',
            //     parcela: $stateParams.parcId
            //   };
            //   return HttpService.findToday(model, 'lectura');
            // },
            // ejercEc: function($stateParams, HttpService) {
            //   var model = {
            //     id: $stateParams.ejercId,
            //     tipo: 'ec',
            //     parcela: $stateParams.parcId
            //   };
            //   return HttpService.findEjercicio(model, 'lectura');
            // }
          }
        }).
        state('main.camp.lectu.parc', {
          url: '/:parcId',
          templateUrl: 'scripts/main/camp/lectu/parcelas/parcelas.html',
          controller:'LectuParcController',
          resolve: {
            hoyPh: function($stateParams, HttpService, LecturaModel) {
              var model = {
                id: $stateParams.ejercId,
                tipo: 'ph',
                parcela: $stateParams.parcId
              };
              return LecturaModel.findToday(model);
            },
            ejercPh: function($stateParams, HttpService, LecturaModel) {
              var model = {
                id: $stateParams.ejercId,
                tipo: 'ph',
                parcela: $stateParams.parcId
              };
              return LecturaModel.findEjercicio(model);
            },
            hoyEc: function($stateParams, HttpService, LecturaModel) {
              var model = {
                id: $stateParams.ejercId,
                tipo: 'ec',
                parcela: $stateParams.parcId
              };
              return LecturaModel.findToday(model);
            },
            ejercEc: function($stateParams, HttpService, LecturaModel) {
              var model = {
                id: $stateParams.ejercId,
                tipo: 'ec',
                parcela: $stateParams.parcId
              };
              return LecturaModel.findEjercicio(model);
            }
          }
        }).

        // state('main.camp.lectu.ec.resumen', {
        //   url: '/resumen',
        //   templateUrl: 'scripts/main/camp/lectu/parcelas/parcelas.html',
        //   controller:'LectuParcController',
        //   resolve: {
        //     hoyPh: function($stateParams, HttpService) {
        //       var model = {
        //         id: $stateParams.ejercId,
        //         tipo: 'ph',
        //         parcela: $stateParams.parcId
        //       };
        //       return HttpService.findToday(model, 'lectura');
        //     },
        //     ejercPh: function($stateParams, HttpService) {
        //       var model = {
        //         id: $stateParams.ejercId,
        //         tipo: 'ph',
        //         parcela: $stateParams.parcId
        //       };
        //       return HttpService.findEjercicio(model, 'lectura');
        //     },
        //     hoyEc: function($stateParams, HttpService) {
        //       var model = {
        //         id: $stateParams.ejercId,
        //         tipo: 'ec',
        //         parcela: $stateParams.parcId
        //       };
        //       return HttpService.findToday(model, 'lectura');
        //     },
        //     ejercEc: function($stateParams, HttpService) {
        //       var model = {
        //         id: $stateParams.ejercId,
        //         tipo: 'ec',
        //         parcela: $stateParams.parcId
        //       };
        //       return HttpService.findEjercicio(model, 'lectura');
        //     }
        //   }
        // }).

        // state('main.camp.lectu.ec.parc', {
        //   url: '/:parcId',
        //   templateUrl: 'scripts/main/camp/lectu/parcelas/parcelas.html',
        //   controller:'LectuParcController',
        //   resolve: {
        //     hoyPh: function($stateParams, HttpService) {
        //       var model = {
        //         id: $stateParams.ejercId,
        //         tipo: 'ph',
        //         parcela: $stateParams.parcId
        //       };
        //       return HttpService.findToday(model, 'lectura');
        //     },
        //     ejercPh: function($stateParams, HttpService) {
        //       var model = {
        //         id: $stateParams.ejercId,
        //         tipo: 'ph',
        //         parcela: $stateParams.parcId
        //       };
        //       return HttpService.findEjercicio(model, 'lectura');
        //     },
        //     hoyEc: function($stateParams, HttpService) {
        //       var model = {
        //         id: $stateParams.ejercId,
        //         tipo: 'ec',
        //         parcela: $stateParams.parcId
        //       };
        //       return HttpService.findToday(model, 'lectura');
        //     },
        //     ejercEc: function($stateParams, HttpService) {
        //       var model = {
        //         id: $stateParams.ejercId,
        //         tipo: 'ec',
        //         parcela: $stateParams.parcId
        //       };
        //       return HttpService.findEjercicio(model, 'lectura');
        //     }
        //   }
        // }).

        state('main.camp.lectu.parc.edit', {
          url: '/:lectId',
          templateUrl: 'scripts/main/camp/lectu/parcelas/ph/editPhLectura.html',
          controller: 'EditLectuCtrl',
          resolve: {
            lectura: function($stateParams, HttpService) {
              var model = {
                id: $stateParams.lectId
              };
              return HttpService.findOne(model, 'lectura');
            },
          }
        }).

        state('main.camp.lectu.ec.parc.edit', {
          url: '/:lectId',
          templateUrl: 'scripts/main/camp/lectu/parcelas/ec/editEcLectura.html',
          controller: 'EditLectuCtrl',
          resolve: {
            lectura: function($stateParams, HttpService) {
              var model = {
                id: $stateParams.lectId
              };
              return HttpService.findOne(model, 'lectura');
            },
          }
        })

      }
    ]
  );
}());
