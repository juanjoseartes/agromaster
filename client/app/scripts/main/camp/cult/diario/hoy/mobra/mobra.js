/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.cultivo.diario.hoy.mobra
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.cultivo.diario.hoy.mobra module
  angular.module('App.main.cultivo.diario.hoy.mobra', []);

  // Module configuration
  angular.module('App.main.cultivo.diario.hoy.mobra')
  // .config(
  //   [
  //     // '$stateProvider',
  //     // function($stateProvider) {
  //     //   $stateProvider
  //     //
  //     //   /////////// MANO OBRA ////////////////
  //     //   .state('main.camp.cult.home.hoy.diario.mobra', {
  //     //     url: '/mobra',
  //     //     controller: 'CultDiaMObraCtrl',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/mobra/mobra.html',
  //     //     resolve: {
  //     //       empleados: function($stateParams, CurrentFinca, ORM) {
  //     //         var model = {
  //     //           ejerc: $stateParams.ejercId,
  //     //           finca: CurrentFinca.fincaCur().fincaId,
  //     //           tipo: 'cultivo'
  //     //         };
  //     //         return ORM.findToday(model, 'listempleado');
  //     //       },
  //     //       detMObra: function($stateParams, CurrentFinca, ORM) {
  //     //         var model = {
  //     //           ejerc: $stateParams.ejercId,
  //     //           finca: CurrentFinca.fincaCur().fincaId,
  //     //           tipo: $stateParams.nameDia
  //     //         };
  //     //         return ORM.findToday(model, 'mocultivo');
  //     //       },
  //     //     },
  //     //     onExit: function($stateParams, ORM) {
  //     //       var model = {
  //     //         ejerc: $stateParams.ejercId,
  //     //         tipo: $stateParams.nameDia
  //     //       };
  //     //       return ORM.getTotalbyDate(model, 'partecult');
  //     //     }
  //     //   }).
  //     //
  //     //   state('main.camp.cult.home.hoy.diario.mobra.add', {
  //     //     url: '/add',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/mobra/add.html',
  //     //   }).
  //     //
  //     //   state('main.camp.cult.home.hoy.diario.mobra.edit', {
  //     //     url: '/:moId',
  //     //     controller: 'CultDiaEditMObraCtrl',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/mobra/edit.html',
  //     //     resolve: {
  //     //       empleado: function($stateParams, ORM) {
  //     //         var model = {
  //     //           id: $stateParams.maqId
  //     //         };
  //     //         return ORM.findOne(model, 'mocultivo');
  //     //       },
  //     //     },
  //     //   })
  //     //
  //     // }
  //   ]
  // );
}());
