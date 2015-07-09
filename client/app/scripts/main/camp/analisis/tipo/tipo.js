/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.analisis.tipo
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.analisis.tipo module
  angular.module('App.main.analisis.tipo', []);

  // Module configuration
  angular.module('App.main.analisis.tipo')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// TIPO //////////////////////
        .state('main.camp.analisis.tipo', {
          url: '/:tipoName',
          templateUrl: 'scripts/main/camp/analisis/tipo/tipo.html',
          controller: 'AnalisisTipoController',
          resolve: {
            analisis: function($stateParams, HttpService) {
              var model = {
                ejerc: $stateParams.ejercId,
                tipo: $stateParams.tipoName
              };
              return HttpService.getAll(model, 'analisis');
            }
          }
        }).

        state('main.camp.analisis.tipo.add', {
          url: '/add',
          templateUrl: 'scripts/main/camp/analisis/tipo/add.html',
          controller: 'AnalisisAddController',
          resolve: {
            labCurso: function(PreAnalisis) {
              return PreAnalisis.labCur();
            },
            fchCurso: function(PreAnalisis) {
              return PreAnalisis.fchCur();
            }
          }
        }).

        state('main.camp.analisis.tipo.add.lab', {
          url: '/laboratorios',
          templateUrl: 'scripts/main/camp/analisis/laboratorios/laboratorios.html',
          controller: 'AnalisisLabController',
          resolve: {
            laboratorios: function($stateParams, HttpService) {
              var model = {};
              return HttpService.getAll(model, 'laboratorio');
            }
          }
        }).

        state('main.camp.analisis.tipo.add.fecha', {
          url: '/fecha',
          templateUrl: 'scripts/main/camp/analisis/fecha/fecha.html',
          controller: 'AnalisisFechaController',

        }).

        state('main.camp.analisis.tipo.edit', {
          url: '/:anaId',
          templateUrl: 'scripts/main/camp/analisis/tipo/edit.html',
          controller: 'AnalisisEditController',
          resolve: {
            detAnalisis: function($stateParams, HttpService) {
              var model = {
                id: $stateParams.anaId
              };
              return HttpService.findOne(model, 'analisis');
            }
          }
        }).

        state('main.camp.analisis.tipo.upload', {
          url: '/:anaId/upload',
          templateUrl: 'scripts/main/camp/analisis/tipo/uploads/upload.html',
          controller: 'AnalisisUploadController',
        })

      }
    ]
  );
}());
