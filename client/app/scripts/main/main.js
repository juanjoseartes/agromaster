/**
* Messages component which is divided to following logical components:
*
*  Controllers
*
* All of these are wrapped to 'App.main' angular module.
*/
(function() {
  'use strict';

  // Define App.main angular module
  // Define frontend.core module
  angular.module('App.main', [
    'App.main.login',
    'App.main.finca',
    'App.main.almacen',
    'App.main.analisis',
    'App.main.cmi',
    'App.main.compras',
    'App.main.config',
    'App.main.cultivo',
    'App.main.lecturas',
    'App.main.maquinaria',
    'App.main.mobra',
    'App.main.recoleccion',
    'App.main.residuos',
    'App.main.scout',
    'App.main.tprog',
    'App.main.ventas'
  ]);

  // Module configuration
  angular.module('App.main')
  //.config([
    // '$stateProvider',
    // function config($stateProvider) {
    //   $stateProvider
    //   // MAIN
    //
    // .state('main', {
    //   abstract: true,
    //   parent: 'login',
    //   url: '/inicio',
    //   templateUrl: 'scripts/main/menu.html',
    //   controller: 'MainController',
    //   data: {
    //     access: 1
    //   },
    //   resolve: {
    //
    //   }
    // }).
    //
    //     state('main.finca', {
    //       url: '/home',
    //       templateUrl: 'scripts/main/camp/fincas.html',
    //       controller: ''
    //     }).
    //
    //     state('main.finca.ejerc', {
    //       url: '/:fincaId',
    //       templateUrl: 'scripts/main/camp/ejercicios.html',
    //       controller: 'SelEjercicioController',
    //       resolve: {
    //         campanas: function($stateParams, ORM) {
    //           var model = {
    //             id: $stateParams.fincaId
    //           };
    //           return ORM.getAll(model, 'ejercicio');
    //         }
    //       },
    //     }).
    //       state('main.add', {
    //         url: '/:fincaId',
    //         abstract: true,
    //         template: '<div ui-view></div>'
    //       }).
    //
    //         state('main.add.ejerc', {
    //           url: '/addejerc',
    //           templateUrl: 'scripts/main/camp/ejercicio.html',
    //           controller: 'addEjercCtrl'
    //         }).
    //
    //
    //     state('main.camp', {
    //       url: '/:ejercId',
    //       abstract: true,
    //       template: '<div ui-view></div>',
    //       controller: ''
    //     })
//}])
  ;

}());
