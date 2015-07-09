/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.cultivo.diario.hoy.parcelas
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.cultivo.diario.hoy.parcelas module
  angular.module('App.main.cultivo.diario.hoy.parcelas', []);

  // Module configuration
  angular.module('App.main.cultivo.diario.hoy.parcelas')
  // .config(
  //   [
  //     // '$stateProvider',
  //     // function($stateProvider) {
  //     //   $stateProvider
  //     //
  //     //   //////////////// PARCELA ///////////////////
  //     //   .state('main.camp.cult.home.hoy.diario.parcela', {
  //     //     url: '/parcela',
  //     //     controller: 'CultDiaParcCtrl',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/parcelas/parcelas.html',
  //     //     resolve: {
  //     //       parcelas: function(CurrentFinca, ORM) {
  //     //         var model = {
  //     //           id: CurrentFinca.fincaCur().fincaId
  //     //         };
  //     //         return ORM.getActive(model, 'parcela');
  //     //       },
  //     //       detParcelas: function($stateParams, CurrentFinca, ORM) {
  //     //         var model = {
  //     //           ejerc: $stateParams.ejercId,
  //     //           finca: CurrentFinca.fincaCur().fincaId,
  //     //           tipo: $stateParams.nameDia
  //     //         };
  //     //         return ORM.findToday(model, 'parccultivo');
  //     //       },
  //     //       repartoEjerc: function($stateParams, ORM) {
  //     //         var model = {
  //     //           ejerc: $stateParams.ejercId,
  //     //           tipo: $stateParams.nameDia
  //     //         };
  //     //         return ORM.getAll(model, 'repartocult');
  //     //       }
  //     //     },
  //     //   }).
  //     //
  //     //   state('main.camp.cult.home.hoy.diario.parcela.add', {
  //     //     url: '/add',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/parcelas/add.html',
  //     //   }).
  //     //
  //     //   state('main.camp.cult.home.hoy.diario.parcela.edit', {
  //     //     url: '/:parcId',
  //     //     controller: 'CultDiaEditParcCtrl',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/hoy/parcelas/edit.html',
  //     //     resolve: {
  //     //       parcela: function($stateParams, ORM) {
  //     //         var model = {
  //     //           id: $stateParams.parcId
  //     //         };
  //     //         return ORM.findOne(model, 'parccultivo');
  //     //       },
  //     //     },
  //     //   })
  //     //
  //     // }
  //   ]
  // );
}());
