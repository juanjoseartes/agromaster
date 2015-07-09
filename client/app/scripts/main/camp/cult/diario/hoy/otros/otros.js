/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.cultivo.diario.hoy.otros
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.cultivo.diario.hoy.otros module
  angular.module('App.main.cultivo.diario.hoy.otros', []);

  // Module configuration
  angular.module('App.main.cultivo.diario.hoy.otros')
  // .config(
  //   [
  //     // '$stateProvider',
  //     // function($stateProvider) {
  //     //   $stateProvider
  //     //
  //     //   ////////// OTROS ///////////////////////
  //     //   .state('main.camp.cult.home.hoy.diario.otros', {
  //     //     url: '/otros',
  //     //     controller: 'CultDiaOtrosCtrl',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/otros/otros.html',
  //     //     resolve: {
  //     //       detOtros: function($stateParams, CurrentFinca, ORM) {
  //     //         var model = {
  //     //           ejerc: $stateParams.ejercId,
  //     //           finca: CurrentFinca.fincaCur().fincaId,
  //     //           tipo: $stateParams.nameDia
  //     //         };
  //     //         return ORM.findToday(model, 'otroscultivo');
  //     //       },
  //     //     },
  //     //   }).
  //     //
  //     //   state('main.camp.cult.home.hoy.diario.otros.add', {
  //     //     url: '/add',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/otros/add.html',
  //     //   }).
  //     //
  //     //   state('main.camp.cult.home.hoy.diario.otros.edit', {
  //     //     url: '/:otId',
  //     //     controller: 'CultDiaEditOtrosCtrl',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/otros/edit.html',
  //     //     resolve: {
  //     //       otro: function($stateParams, ORM) {
  //     //         var model = {
  //     //           id: $stateParams.otId
  //     //         };
  //     //         return ORM.findOne(model, 'otroscultivo');
  //     //       },
  //     //     },
  //     //   })
  //     //
  //     // }
  //   ]
  // );
}());
