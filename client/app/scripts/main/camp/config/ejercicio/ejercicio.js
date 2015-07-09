/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.config.ejercicio
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.config.ejercicio module
  angular.module('App.main.config.ejercicio', []);

  // Module configuration
  angular.module('App.main.config.ejercicio')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// EJERICICIO //////////////////////
        .state('main.camp.config.home.ejerc', {
          url: '/ejercicios',
          templateUrl: 'scripts/main/camp/config/ejercicio/ejercicios.html',
          controller: 'ConfigEjercController',
          resolve: {
            ejercicios: function(CurrentFinca, EjercicioModel) {
              var model = {
                id:CurrentFinca.fincaCur().fincaId
              };
              return EjercicioModel.getAll(model);
            },
          }
        }).

        state('main.camp.config.home.ejerc.edit', {
          url: '/:campId',
          templateUrl: 'scripts/main/camp/config/ejercicio/edit/edit.html',
          controller: 'ConfigEditEjercController',
          resolve: {
            ejercicio: function($stateParams, HttpService) {
              var model = {
                id: $stateParams.campId
              };
              return HttpService.findOne(model, 'ejercicio');
            },
          }
        }).

        state('main.camp.config.home.ejerc.edit.fchini', {
          url: '/inicio',
          templateUrl: 'scripts/main/camp/config/ejercicio/edit/fecha/fechaInic.html',
          controller: 'ConfigEditEjercFchController',
        }).
        state('main.camp.config.home.ejerc.edit.fchfin', {
          url: '/fin',
          templateUrl: 'scripts/main/camp/config/ejercicio/edit/fecha/fechaFin.html',
          controller: 'ConfigEditEjercFchController',
        }).

        state('main.camp.config.home.ejerc.edit.cult', {
          url: '/cultivo',
          templateUrl: 'scripts/main/camp/config/ejercicio/cultivo/cultivo.html',
          controller: 'ConfigEjercCultController',
        }).

        state('main.camp.config.home.ejerc.add', {
          url: '/add',
          templateUrl: 'scripts/main/camp/config/ejercicio/add/add.html',
          resolve: {
            cultCur: function(PreEjercicio) {
              return PreEjercicio.cultCur();
            },
            fchInic: function(PreEjercicio) {
              return PreEjercicio.fchInic();
            },
            fchFin: function(PreEjercicio) {
              return PreEjercicio.fchFin();
            }
          },
        }).

        state('main.camp.config.home.ejerc.add.fchini', {
          url: '/inicio',
          templateUrl: 'scripts/main/camp/config/ejercicio/edit/fecha/fechaInic.html',
          controller: 'ConfigEditEjercFchController',
        }).
        state('main.camp.config.home.ejerc.add.fchfin', {
          url: '/fin',
          templateUrl: 'scripts/main/camp/config/ejercicio/edit/fecha/fechaFin.html',
          controller: 'ConfigEditEjercFchController',
        }).

        state('main.camp.config.home.ejerc.add.cult', {
          url: '/cultivo',
          templateUrl: 'scripts/main/camp/config/ejercicio/cultivo/cultivo.html',
          controller: 'ConfigEjercCultController',
        })

      }
    ]
  );
}());
