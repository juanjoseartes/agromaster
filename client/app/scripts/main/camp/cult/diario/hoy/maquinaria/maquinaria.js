/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.cultivo.diario.hoy
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.cultivo.diario.hoy module
  angular.module('App.main.cultivo.diario.hoy.maquinaria', []);

  // Module configuration
  angular.module('App.main.cultivo.diario.hoy.maquinaria')
  // .config(
  //   [
  //     // '$stateProvider',
  //     // function($stateProvider) {
  //     //   $stateProvider
  //     //
  //     //   ///////////// MAQUINARIA //////////////
  //     //   .state('main.camp.cult.home.hoy.diario.maquinaria', {
  //     //     url: '/maquinaria',
  //     //     controller: 'CultDiaMaqCtrl',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/maquinaria.html',
  //     //     resolve: {
  //     //       maquinas: function(CurrentFinca, ORM) {
  //     //         var model = {
  //     //           id: CurrentFinca.fincaCur().fincaId,
  //     //           propiedad: 'propiedad'
  //     //         };
  //     //         return ORM.getAll(model, 'maquinaria');
  //     //       },
  //     //       maqAlq: function(CurrentFinca, ORM) {
  //     //         var model = {
  //     //           id: CurrentFinca.fincaCur().fincaId,
  //     //           propiedad: 'alquiler'
  //     //         };
  //     //         return ORM.getAll(model, 'maquinaria');
  //     //       },
  //     //       detMaquinaria: function($stateParams, CurrentFinca, ORM) {
  //     //         var model = {
  //     //           ejerc: $stateParams.ejercId,
  //     //           finca: CurrentFinca.fincaCur().fincaId,
  //     //           tipo: $stateParams.nameDia
  //     //         };
  //     //         return ORM.findToday(model, 'maqcultivo');
  //     //       },
  //     //
  //     //     },
  //     //   }).
  //     //
  //     //   state('main.camp.cult.home.hoy.diario.maquinaria.add', {
  //     //     url: '/add',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/add.html',
  //     //   }).
  //     //
  //     //   state('main.camp.cult.home.hoy.diario.maquinaria.addalq', {
  //     //     url: '/addalq',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/addAlq.html',
  //     //   }).
  //     //
  //     //   state('main.camp.cult.home.hoy.diario.maquinaria.edit', {
  //     //     url: '/:maqId',
  //     //     controller: 'CultDiaEditMaqCtrl',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/edit.html',
  //     //     resolve: {
  //     //       maquina: function($stateParams, ORM) {
  //     //         var model = {
  //     //           id: $stateParams.maqId
  //     //         };
  //     //         return ORM.findOne(model, 'maqcultivo');
  //     //       },
  //     //     },
  //     //   })
  //     //
  //     // }
  //   ]
  // );
}());
