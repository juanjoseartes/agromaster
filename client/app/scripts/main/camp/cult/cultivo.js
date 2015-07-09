/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.cultivo
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.cultivo module
  angular.module('App.main.cultivo', [
    'App.main.cultivo.diario'
  ]);

  // Module configuration
  angular.module('App.main.cultivo')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// CULTIVO //////////////////////
        .state('main.camp.cult', {
          url: '',
          abstract: true,
          template: '<div ui-view></div>',
          controller: '',

        }).

        state('main.camp.cult.home', {
          url: '/cultivo',
          templateUrl: 'scripts/main/camp/cult/cultivo.html',
          controller: 'CultivoController',
          resolve: {
            diarios: function($stateParams, CurrentFinca, HttpService, TipoDiarioModel) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                ejerc: $stateParams.ejercId
              };
              //return HttpService.getAll(model, 'tipodiario');
              return TipoDiarioModel.getAll(model);
            },
            resDia: function($stateParams, HttpService, ParteCultivoModel) {
              var model = {
                ejerc: $stateParams.ejercId,
                tipo: $stateParams.nameDia
              };
              //return HttpService.getToday(model, 'partecult');
              return ParteCultivoModel.getToday(model);
            },
            header: function(HeaderService) {
              return HeaderService.getItem('cultivo');

            },
            navbar: function(NavbarService) {
              return NavbarService.getItems('cultivo');
            }
          }
        })

        //////////////// HOY ///////////////////////////////////
        .state('main.camp.cult.home.hoy', {
          url: '/hoy',
          templateUrl: 'scripts/main/camp/cult/cultivoHoy.html',
          controller: 'CultDiaHoyController',
          resolve: {
            diarios: function($stateParams, CurrentFinca, HttpService, TipoDiarioModel) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                ejerc: $stateParams.ejercId
              };
              //return HttpService.getAll(model, 'tipodiario');
              return TipoDiarioModel.getAll(model);
            },
            // resDia: function($stateParams, HttpService) {
            //   var model = {
            //     ejerc: $stateParams.ejercId,
            //     //tipo: $stateParams.nameDia
            //   };
            //   return HttpService.getToday(model, 'partecult');
            // },
            // hoy: function($stateParams, CurrentFinca, HttpService) {
            //   var model = {
            //     ejerc: $stateParams.ejercId
            //   };
            //   return HttpService.getToday(model, 'partecult');
            // }
          }
        })

        ////////////// INICIO ///////////////////////////////////
        .state('main.camp.cult.home.hoy.inic', {
          url: '/inicio',
          controller: 'CultDiaInicController',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/inicio/inicio.html',
          resolve: {
            // cultDia: function($stateParams, ParteCultivoModel) {
            //   var model = {
            //     ejerc: $stateParams.ejercId,
            //     //tipo: $stateParams.nameDia
            //   };
            //   return ParteCultivoModel.getToday(model);
            // },
            repartoDia: function($stateParams, HttpService, RepartoCultivoModel) {
              var model = {
                ejerc: $stateParams.ejercId
              };
              //return HttpService.getToday(model, 'repartocult');
              return RepartoCultivoModel.getToday(model);
            },
            resEjerc: function($stateParams, HttpService, ParteCultivoModel) {
              var model = {
                ejerc: $stateParams.ejercId,
                //tipo: $stateParams.nameDia
              };
              //return HttpService.getEjercicio(model, 'partecult');
              return ParteCultivoModel.getEjercicio(model);
            },
          }
        })

        .state('main.camp.cult.home.hoy.diario', {
          url: '/:nameDia',
          abstract: true,
          templateUrl: 'scripts/main/camp/cult/diario/diario.html',
          controller: 'CultDiaCtrl',
          resolve: {
            resDiario: function($stateParams, HttpService, ParteCultivoModel) {
              var model = {
                ejerc: $stateParams.ejercId,
                tipo: $stateParams.nameDia
              };
              //return HttpService.getToday(model, 'partecult');
              return ParteCultivoModel.getToday(model);
            },
            resEjercicio: function($stateParams, HttpService, ParteCultivoModel) {
              var model = {
                ejerc: $stateParams.ejercId,
                tipo: $stateParams.nameDia
              };
              //return HttpService.getEjercicio(model, 'partecult');
              return ParteCultivoModel.getEjercicio(model);
            },
          }
        }).

        // .state('main.camp.cult.home.hoy.inic', {
        //   url: '/inicio',
        //   controller: 'CultDiaInicCtrl',
        //   templateUrl: 'scripts/main/camp/cult/diario/hoy/inicio/inicio.html',
        //   resolve: {
        //     // resDia: function($stateParams, HttpService) {
        //     //   var model = {
        //     //     ejerc: $stateParams.ejercId,
        //     //     //tipo: $stateParams.nameDia
        //     //   };
        //     //   return HttpService.getToday(model, 'partecult');
        //     // },
        //     repartoDia: function($stateParams, HttpService) {
        //       var model = {
        //         ejerc: $stateParams.ejercId
        //       };
        //       return HttpService.getToday(model, 'repartocult');
        //     },
        //     resEjerc: function($stateParams, HttpService) {
        //       var model = {
        //         ejerc: $stateParams.ejercId,
        //         //tipo: $stateParams.nameDia
        //       };
        //       return HttpService.getEjercicio(model, 'partecult');
        //     },
        //   }
        // }).

        // state('main.camp.cult.home.hoy.diario', {
        //   url: '/:nameDia',
        //   abstract: true,
        //   templateUrl: 'scripts/main/camp/cult/diario/diario.html',
        //   controller: 'CultDiaCtrl',
        //   resolve: {
        //     resDiario: function($stateParams, HttpService) {
        //       var model = {
        //         ejerc: $stateParams.ejercId,
        //         tipo: $stateParams.nameDia
        //       };
        //       return HttpService.getToday(model, 'partecult');
        //     },
        //     resEjercicio: function($stateParams, HttpService) {
        //       var model = {
        //         ejerc: $stateParams.ejercId,
        //         tipo: $stateParams.nameDia
        //       };
        //       return HttpService.getEjercicio(model, 'partecult');
        //     },
        //   }
        // }).
        //////////////// PARCELA ///////////////////
        state('main.camp.cult.home.hoy.diario.parcela', {
          url: '/parcela',
          controller: 'CultDiaParcCtrl',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/parcelas/parcelas.html',
          resolve: {
            parcelas: function(CurrentFinca, HttpService, ParcelaModel) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              //return HttpService.getActive(model, 'parcela');
              return ParcelaModel.getActive(model);
            },
            detParcelas: function($stateParams, CurrentFinca, HttpService, ParcelaCultivoModel) {
              var model = {
                ejerc: $stateParams.ejercId,
                finca: CurrentFinca.fincaCur().fincaId,
                tipo: $stateParams.nameDia
              };
              //return HttpService.findToday(model, 'parccultivo');
              return ParcelaCultivoModel.findToday(model);
            },
            repartoEjerc: function($stateParams, HttpService, RepartoCultivoModel) {
              var model = {
                ejerc: $stateParams.ejercId,
                tipo: $stateParams.nameDia
              };
              //return HttpService.getAll(model, 'repartocult');
              return RepartoCultivoModel.getAll(model);
            }
          },
        }).

        state('main.camp.cult.home.hoy.diario.parcela.add', {
          url: '/add',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/parcelas/add.html',
        }).

        state('main.camp.cult.home.hoy.diario.parcela.edit', {
          url: '/:parcId',
          controller: 'CultDiaEditParcCtrl',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/parcelas/edit.html',
          resolve: {
            parcela: function($stateParams, HttpService, ParcelaCultivoModel) {
              var model = {
                id: $stateParams.parcId
              };
              //return HttpService.findOne(model, 'parccultivo');
              return ParcelaCultivoModel.findOne(model);
            },
          },
        }).
        /////////// MANO OBRA ////////////////
        state('main.camp.cult.home.hoy.diario.mobra', {
          url: '/mobra',
          controller: 'CultDiaMObraCtrl',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/mobra/mobra.html',
          resolve: {
            empleados: function($stateParams, CurrentFinca, HttpService, ListEmpleadoModel) {
              var model = {
                ejerc: $stateParams.ejercId,
                finca: CurrentFinca.fincaCur().fincaId,
                tipo: 'cultivo'
              };
              //return HttpService.findToday(model, 'listempleado');
              return ListEmpleadoModel.findToday(model);
            },
            detMObra: function($stateParams, CurrentFinca, HttpService, MOCultivoModel) {
              var model = {
                ejerc: $stateParams.ejercId,
                finca: CurrentFinca.fincaCur().fincaId,
                tipo: $stateParams.nameDia
              };
              //return HttpService.findToday(model, 'mocultivo');
              return MOCultivoModel.findToday(model);
            },
          },
          // onExit: function($stateParams, HttpService, ParteCultivoModel) {
          //   var model = {
          //     ejerc: $stateParams.ejercId,
          //     tipo: $stateParams.nameDia
          //   };
          //   //return HttpService.getTotalbyDate(model, 'partecult');
          //   return ParteCultivoModel.getTotalbyDate(model);
          // }
        }).

        state('main.camp.cult.home.hoy.diario.mobra.add', {
          url: '/add',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/mobra/add.html',
        }).

        state('main.camp.cult.home.hoy.diario.mobra.edit', {
          url: '/:moId',
          controller: 'CultDiaEditMObraCtrl',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/mobra/edit.html',
          resolve: {
            empleado: function($stateParams, HttpService, MOCultivoModel) {
              var model = {
                id: $stateParams.maqId
              };
              //return HttpService.findOne(model, 'mocultivo');
              return MOCultivoModel.findOne(model);
            },
          },
        }).
        ////////// MATERIALES ///////////////
        state('main.camp.cult.home.hoy.diario.materiales', {
          url: '/materiales',
          controller: 'CultDiaMatCtrl',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/materiales/materiales.html',
          resolve: {
            materiales: function(CurrentFinca, HttpService, ProductoModel) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId
                //almacen: 'material vegetal'
              };
              //return HttpService.getAll(model, 'producto');
              return ProductoModel.getAll(model);
            },
            detMateriales: function($stateParams, CurrentFinca, HttpService, MatCultivoModel) {
              var model = {
                ejerc: $stateParams.ejercId,
                finca: CurrentFinca.fincaCur().fincaId,
                tipo: $stateParams.nameDia
              };
              //return HttpService.findToday(model, 'matcultivo');
              return MatCultivoModel.findToday(model);
            },
          },
        }).

        state('main.camp.cult.home.hoy.diario.materiales.add', {
          url: '/add',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/materiales/add.html',
        }).

        state('main.camp.cult.home.hoy.diario.materiales.edit', {
          url: '/:matId',
          controller: 'CultDiaEditMatCtrl',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/materiales/edit.html',
          resolve: {
            material: function($stateParams, HttpService, MatCultivoModel) {
              var model = {
                id: $stateParams.matId
              };
              //return HttpService.findOne(model, 'matcultivo');
              return MatCultivoModel.findOne(model);
            },
            unidades: function(HttpService, UnidadModel) {
              return HttpService.getAll({}, 'unidad');
              return UnidadModel.getAll()
            },
          },
        }).
        ///////////// MAQUINARIA //////////////
        state('main.camp.cult.home.hoy.diario.maquinaria', {
          url: '/maquinaria',
          controller: 'CultDiaMaqCtrl',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/maquinaria.html',
          resolve: {
            maquinas: function(CurrentFinca, HttpService, MaquinariaModel) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId,
                propiedad: 'propiedad'
              };
              //return HttpService.getAll(model, 'maquinaria');
              return MaquinariaModel.getll(model);
            },
            maqAlq: function(CurrentFinca, HttpService, MaquinariaModel) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId,
                propiedad: 'alquiler'
              };
              //return HttpService.getAll(model, 'maquinaria');
              return MaquinariaModel.getAll(model);
            },
            detMaquinaria: function($stateParams, CurrentFinca, HttpService, MaqCultivoModel) {
              var model = {
                ejerc: $stateParams.ejercId,
                finca: CurrentFinca.fincaCur().fincaId,
                tipo: $stateParams.nameDia
              };
              //return HttpService.findToday(model, 'maqcultivo');
              return MaqCultivoModel.findToday(model);
            },

          },
        }).

        state('main.camp.cult.home.hoy.diario.maquinaria.add', {
          url: '/add',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/add.html',
        }).

        state('main.camp.cult.home.hoy.diario.maquinaria.addalq', {
          url: '/addalq',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/addAlq.html',
        }).

        state('main.camp.cult.home.hoy.diario.maquinaria.edit', {
          url: '/:maqId',
          controller: 'CultDiaEditMaqCtrl',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/edit.html',
          resolve: {
            maquina: function($stateParams, HttpService, MaqCultivoModel) {
              var model = {
                id: $stateParams.maqId
              };
              //return HttpService.findOne(model, 'maqcultivo');
              return MaqCultivoModel.findOne(model);
            },
          },
        }).
        ////////// OTROS ///////////////////////
        state('main.camp.cult.home.hoy.diario.otros', {
          url: '/otros',
          controller: 'CultDiaOtrosCtrl',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/otros/otros.html',
          resolve: {
            detOtros: function($stateParams, CurrentFinca, HttpService, OtrosCultivoModel) {
              var model = {
                ejerc: $stateParams.ejercId,
                finca: CurrentFinca.fincaCur().fincaId,
                tipo: $stateParams.nameDia
              };
              //return HttpService.findToday(model, 'otroscultivo');
              return OtrosCultivoModel.findToday(model);
            },
          },
        }).

        state('main.camp.cult.home.hoy.diario.otros.add', {
          url: '/add',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/otros/add.html',
        }).

        state('main.camp.cult.home.hoy.diario.otros.edit', {
          url: '/:otId',
          controller: 'CultDiaEditOtrosCtrl',
          templateUrl: 'scripts/main/camp/cult/diario/hoy/otros/edit.html',
          resolve: {
            otro: function($stateParams, HttpService, OtrosCultivoModel) {
              var model = {
                id: $stateParams.otId
              };
              //return HttpService.findOne(model, 'otroscultivo');
              return OtrosCultivoModel.findOne(model);
            },
          },
        })

        ////////// EJERCICIO /////////////
        .state('main.camp.cult.home.ejerc', {
          url: '/ejercicio',
          templateUrl: 'scripts/main/camp/cult/cultivoEjerc.html',
          controller: 'CultDiaEjercController',
          resolve: {
            ejercicio: function($stateParams, CurrentFinca, HttpService, ParteCultivoModel) {
              var model = {
                ejerc: $stateParams.ejercId
              };
              //return HttpService.getEjercicio(model, 'partecult');
              return ParteCultivoModel.getEjercicio(model);
            },
            diarios: function($stateParams, CurrentFinca, HttpService, TipoDiarioModel) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                ejerc: $stateParams.ejercId
              };
              //return HttpService.getAll(model, 'tipodiario');
              return TipoDiarioModel.getAll(model);
            },
          }
        })

        .state('main.camp.cult.home.ejerc.inic', {
          url: '/inicio',
          controller: 'CultDiaEjercController',
          templateUrl: 'scripts/main/camp/cult/diario/ejercicio/inicio/inicio.html',
          resolve: {

          }
        })

      }

    ]
  );
}());
