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
  angular.module('App.main.cultivo.diario.hoy', [
    'App.main.cultivo.diario.hoy.inicio',
    'App.main.cultivo.diario.hoy.maquinaria',
    'App.main.cultivo.diario.hoy.materiales',
    'App.main.cultivo.diario.hoy.mobra',
    'App.main.cultivo.diario.hoy.otros',
    'App.main.cultivo.diario.hoy.parcelas'
  ]);

  // Module configuration
  angular.module('App.main.cultivo.diario.hoy')
  // .config(
  //   [
  //     '$stateProvider',
  //     function($stateProvider) {
  //       $stateProvider
  //
  //       //////////////// HOY ///////////////////////////////////
  //       .state('main.camp.cult.home.hoy', {
  //         url: '/hoy',
  //         templateUrl: 'scripts/main/camp/cult/cultivoHoy.html',
  //         controller: 'CultDiaHoyCtrl',
  //         resolve: {
  //           // resDia: function($stateParams, ORM) {
  //           //   var model = {
  //           //     ejerc: $stateParams.ejercId,
  //           //     //tipo: $stateParams.nameDia
  //           //   };
  //           //   return ORM.getToday(model, 'partecult');
  //           // },
  //           // hoy: function($stateParams, CurrentFinca, ORM) {
  //           //   var model = {
  //           //     ejerc: $stateParams.ejercId
  //           //   };
  //           //   return ORM.getToday(model, 'partecult');
  //           // }
  //         }
  //       }).
  //
  //       state('main.camp.cult.home.hoy.inic', {
  //         url: '/inicio',
  //         controller: 'CultDiaInicCtrl',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/inicio/inicio.html',
  //         resolve: {
  //           // resDia: function($stateParams, ORM) {
  //           //   var model = {
  //           //     ejerc: $stateParams.ejercId,
  //           //     //tipo: $stateParams.nameDia
  //           //   };
  //           //   return ORM.getToday(model, 'partecult');
  //           // },
  //           repartoDia: function($stateParams, HttpService) {
  //             var model = {
  //               ejerc: $stateParams.ejercId
  //             };
  //             return HttpService.getToday(model, 'repartocult');
  //           },
  //           resEjerc: function($stateParams, HttpService) {
  //             var model = {
  //               ejerc: $stateParams.ejercId,
  //               //tipo: $stateParams.nameDia
  //             };
  //             return HttpService.getEjercicio(model, 'partecult');
  //           },
  //         }
  //       }).
  //
  //       state('main.camp.cult.home.hoy.diario', {
  //         url: '/:nameDia',
  //         abstract: true,
  //         templateUrl: 'scripts/main/camp/cult/diario/diario.html',
  //         controller: 'CultDiaCtrl',
  //         resolve: {
  //           resDiario: function($stateParams, HttpService) {
  //             var model = {
  //               ejerc: $stateParams.ejercId,
  //               tipo: $stateParams.nameDia
  //             };
  //             return HttpService.getToday(model, 'partecult');
  //           },
  //           resEjercicio: function($stateParams, HttpService) {
  //             var model = {
  //               ejerc: $stateParams.ejercId,
  //               tipo: $stateParams.nameDia
  //             };
  //             return HttpService.getEjercicio(model, 'partecult');
  //           },
  //         }
  //       }).
  //       //////////////// PARCELA ///////////////////
  //       state('main.camp.cult.home.hoy.diario.parcela', {
  //         url: '/parcela',
  //         controller: 'CultDiaParcCtrl',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/parcelas/parcelas.html',
  //         resolve: {
  //           parcelas: function(CurrentFinca, HttpService) {
  //             var model = {
  //               id: CurrentFinca.fincaCur().fincaId
  //             };
  //             return HttpService.getActive(model, 'parcela');
  //           },
  //           detParcelas: function($stateParams, CurrentFinca, HttpService) {
  //             var model = {
  //               ejerc: $stateParams.ejercId,
  //               finca: CurrentFinca.fincaCur().fincaId,
  //               tipo: $stateParams.nameDia
  //             };
  //             return HttpService.findToday(model, 'parccultivo');
  //           },
  //           repartoEjerc: function($stateParams, HttpService) {
  //             var model = {
  //               ejerc: $stateParams.ejercId,
  //               tipo: $stateParams.nameDia
  //             };
  //             return HttpService.getAll(model, 'repartocult');
  //           }
  //         },
  //       }).
  //
  //       state('main.camp.cult.home.hoy.diario.parcela.add', {
  //         url: '/add',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/parcelas/add.html',
  //       }).
  //
  //       state('main.camp.cult.home.hoy.diario.parcela.edit', {
  //         url: '/:parcId',
  //         controller: 'CultDiaEditParcCtrl',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/parcelas/edit.html',
  //         resolve: {
  //           parcela: function($stateParams, HttpService) {
  //             var model = {
  //               id: $stateParams.parcId
  //             };
  //             return HttpService.findOne(model, 'parccultivo');
  //           },
  //         },
  //       }).
  //       /////////// MANO OBRA ////////////////
  //       state('main.camp.cult.home.hoy.diario.mobra', {
  //         url: '/mobra',
  //         controller: 'CultDiaMObraCtrl',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/mobra/mobra.html',
  //         resolve: {
  //           empleados: function($stateParams, CurrentFinca, HttpService) {
  //             var model = {
  //               ejerc: $stateParams.ejercId,
  //               finca: CurrentFinca.fincaCur().fincaId,
  //               tipo: 'cultivo'
  //             };
  //             return HttpService.findToday(model, 'listempleado');
  //           },
  //           detMObra: function($stateParams, CurrentFinca, HttpService) {
  //             var model = {
  //               ejerc: $stateParams.ejercId,
  //               finca: CurrentFinca.fincaCur().fincaId,
  //               tipo: $stateParams.nameDia
  //             };
  //             return HttpService.findToday(model, 'mocultivo');
  //           },
  //         },
  //         onExit: function($stateParams, HttpService) {
  //           var model = {
  //             ejerc: $stateParams.ejercId,
  //             tipo: $stateParams.nameDia
  //           };
  //           return HttpService.getTotalbyDate(model, 'partecult');
  //         }
  //       }).
  //
  //       state('main.camp.cult.home.hoy.diario.mobra.add', {
  //         url: '/add',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/mobra/add.html',
  //       }).
  //
  //       state('main.camp.cult.home.hoy.diario.mobra.edit', {
  //         url: '/:moId',
  //         controller: 'CultDiaEditMObraCtrl',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/mobra/edit.html',
  //         resolve: {
  //           empleado: function($stateParams, HttpService) {
  //             var model = {
  //               id: $stateParams.maqId
  //             };
  //             return HttpService.findOne(model, 'mocultivo');
  //           },
  //         },
  //       }).
  //       ////////// MATERIALES ///////////////
  //       state('main.camp.cult.home.hoy.diario.materiales', {
  //         url: '/materiales',
  //         controller: 'CultDiaMatCtrl',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/materiales/materiales.html',
  //         resolve: {
  //           materiales: function(CurrentFinca, HttpService) {
  //             var model = {
  //               finca: CurrentFinca.fincaCur().fincaId
  //               //almacen: 'material vegetal'
  //             };
  //             return HttpService.getAll(model, 'producto');
  //           },
  //           detMateriales: function($stateParams, CurrentFinca, HttpService) {
  //             var model = {
  //               ejerc: $stateParams.ejercId,
  //               finca: CurrentFinca.fincaCur().fincaId,
  //               tipo: $stateParams.nameDia
  //             };
  //             return HttpService.findToday(model, 'matcultivo');
  //           },
  //         },
  //       }).
  //
  //       state('main.camp.cult.home.hoy.diario.materiales.add', {
  //         url: '/add',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/materiales/add.html',
  //       }).
  //
  //       state('main.camp.cult.home.hoy.diario.materiales.edit', {
  //         url: '/:matId',
  //         controller: 'CultDiaEditMatCtrl',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/materiales/edit.html',
  //         resolve: {
  //           material: function($stateParams, HttpService) {
  //             var model = {
  //               id: $stateParams.matId
  //             };
  //             return HttpService.findOne(model, 'matcultivo');
  //           },
  //           unidades: function(ORM) {
  //             return HttpService.getAll({}, 'unidad');
  //           },
  //         },
  //       }).
  //       ///////////// MAQUINARIA //////////////
  //       state('main.camp.cult.home.hoy.diario.maquinaria', {
  //         url: '/maquinaria',
  //         controller: 'CultDiaMaqCtrl',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/maquinaria.html',
  //         resolve: {
  //           maquinas: function(CurrentFinca, HttpService) {
  //             var model = {
  //               id: CurrentFinca.fincaCur().fincaId,
  //               propiedad: 'propiedad'
  //             };
  //             return HttpService.getAll(model, 'maquinaria');
  //           },
  //           maqAlq: function(CurrentFinca, HttpService) {
  //             var model = {
  //               id: CurrentFinca.fincaCur().fincaId,
  //               propiedad: 'alquiler'
  //             };
  //             return HttpService.getAll(model, 'maquinaria');
  //           },
  //           detMaquinaria: function($stateParams, CurrentFinca, HttpService) {
  //             var model = {
  //               ejerc: $stateParams.ejercId,
  //               finca: CurrentFinca.fincaCur().fincaId,
  //               tipo: $stateParams.nameDia
  //             };
  //             return HttpService.findToday(model, 'maqcultivo');
  //           },
  //
  //         },
  //       }).
  //
  //       state('main.camp.cult.home.hoy.diario.maquinaria.add', {
  //         url: '/add',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/add.html',
  //       }).
  //
  //       state('main.camp.cult.home.hoy.diario.maquinaria.addalq', {
  //         url: '/addalq',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/addAlq.html',
  //       }).
  //
  //       state('main.camp.cult.home.hoy.diario.maquinaria.edit', {
  //         url: '/:maqId',
  //         controller: 'CultDiaEditMaqCtrl',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/edit.html',
  //         resolve: {
  //           maquina: function($stateParams, HttpService) {
  //             var model = {
  //               id: $stateParams.maqId
  //             };
  //             return HttpService.findOne(model, 'maqcultivo');
  //           },
  //         },
  //       }).
  //       ////////// OTROS ///////////////////////
  //       state('main.camp.cult.home.hoy.diario.otros', {
  //         url: '/otros',
  //         controller: 'CultDiaOtrosCtrl',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/otros/otros.html',
  //         resolve: {
  //           detOtros: function($stateParams, CurrentFinca, HttpService) {
  //             var model = {
  //               ejerc: $stateParams.ejercId,
  //               finca: CurrentFinca.fincaCur().fincaId,
  //               tipo: $stateParams.nameDia
  //             };
  //             return HttpService.findToday(model, 'otroscultivo');
  //           },
  //         },
  //       }).
  //
  //       state('main.camp.cult.home.hoy.diario.otros.add', {
  //         url: '/add',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/otros/add.html',
  //       }).
  //
  //       state('main.camp.cult.home.hoy.diario.otros.edit', {
  //         url: '/:otId',
  //         controller: 'CultDiaEditOtrosCtrl',
  //         templateUrl: 'scripts/main/camp/cult/diario/hoy/otros/edit.html',
  //         resolve: {
  //           otro: function($stateParams, HttpService) {
  //             var model = {
  //               id: $stateParams.otId
  //             };
  //             return HttpService.findOne(model, 'otroscultivo');
  //           },
  //         },
  //       })
  //
  //     }
  //   ]
  // );
}());
