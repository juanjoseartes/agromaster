/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.cultivo.diario.hoy.materiales
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.cultivo.diario.hoy.materiales module
  angular.module('App.main.cultivo.diario.hoy.materiales', []);

  // Module configuration
  angular.module('App.main.cultivo.diario.hoy.materiales')
  // .config(
  //   [
  //     // '$stateProvider',
  //     // function($stateProvider) {
  //     //   $stateProvider
  //     //
  //     //   ////////// MATERIALES ///////////////
  //     //   .state('main.camp.cult.home.hoy.diario.materiales', {
  //     //     url: '/materiales',
  //     //     controller: 'CultDiaMatCtrl',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/materiales/materiales.html',
  //     //     resolve: {
  //     //       materiales: function(CurrentFinca, ORM) {
  //     //         var model = {
  //     //           finca: CurrentFinca.fincaCur().fincaId
  //     //           //almacen: 'material vegetal'
  //     //         };
  //     //         return ORM.getAll(model, 'producto');
  //     //       },
  //     //       detMateriales: function($stateParams, CurrentFinca, ORM) {
  //     //         var model = {
  //     //           ejerc: $stateParams.ejercId,
  //     //           finca: CurrentFinca.fincaCur().fincaId,
  //     //           tipo: $stateParams.nameDia
  //     //         };
  //     //         return ORM.findToday(model, 'matcultivo');
  //     //       },
  //     //     },
  //     //   }).
  //     //
  //     //   state('main.camp.cult.home.hoy.diario.materiales.add', {
  //     //     url: '/add',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/materiales/add.html',
  //     //   }).
  //     //
  //     //   state('main.camp.cult.home.hoy.diario.materiales.edit', {
  //     //     url: '/:matId',
  //     //     controller: 'CultDiaEditMatCtrl',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/materiales/edit.html',
  //     //     resolve: {
  //     //       material: function($stateParams, ORM) {
  //     //         var model = {
  //     //           id: $stateParams.matId
  //     //         };
  //     //         return ORM.findOne(model, 'matcultivo');
  //     //       },
  //     //       unidades: function(ORM) {
  //     //         return ORM.getAll({}, 'unidad');
  //     //       },
  //     //     },
  //     //   })
  //     //
  //     // }
  //   ]
  // );
}());
