/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.compras.lineas
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.compras.lineas module
  angular.module('App.main.compras.lineas', []);

  // Module configuration
  angular.module('App.main.compras.lineas')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// COMPRAS //////////////////////
        .state('main.camp.compras.edit', {
          url: '',
          template: '<div ui-view></div>',
          abstract: true,
          controller: '',
        }).

        state('main.camp.compras.edit.alb.det', {
          url: '/det',
          template: '<div ui-view></div>',
          controller: '',
          abstract: true
        }).

        state('main.camp.compras.add', {
          url: '/add',
          template: '<div ui-view></div>',
          abstract: true,
          controller: '',
        }).

        state('main.camp.compras.add.alb', {
          url: '/albaran',
          templateUrl: 'scripts/main/camp/compras/albaranes/addAlbaran.html',
          controller: 'AddAlbCompraCtrl',
          resolve: {
            provCurso: function(PreAlbaran) {
              return PreAlbaran.provCur();
            },
            fchCurso: function(PreAlbaran) {
              return PreAlbaran.fchCur();
            }
          },
        }).

        state('main.camp.compras.sel', {
          url: '/add/albaran',
          template: '<div ui-view></div>',
          abstract: true,
          controller: '',
        }).

        state('main.camp.compras.sel.prov', {
          url: '/proveedores',
          templateUrl: 'scripts/main/camp/compras/albaranes/proveedores.html',
          controller: 'SelProvCtrl',
          resolve: {
            proveedores: function(CurrentFinca, HttpService) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId
              };
              return HttpService.getAll(model, 'proveedor');
            },
            provCurso: function(PreAlbaran) {
              return PreAlbaran.provCur();
            }
          },
        }).

        state('main.camp.compras.sel.fch', {
          url: '/fecha',
          templateUrl: 'scripts/main/camp/compras/albaranes/fecha.html',
          controller: 'SelFchCtrl',
          resolve: {
            fchCurso: function(PreAlbaran) {
              return PreAlbaran.fchCur();
            }
          },
        }).

        state('main.camp.compras.newprov', {
          url: '/compras/alb/newproveed',
          templateUrl: 'scripts/main/camp/compras/albaranes/newproveed.html',
          controller: 'AddProvCtrl',

        }).

        state('main.camp.compras.edit.alb.fertil', {
          url: '/fertil',
          templateUrl: 'scripts/main/camp/compras/lineas/fertilizantes.html',
          controller: 'lCompFertilCtrl',
          resolve: {
            detcompra: function($stateParams, HttpService) {
              var model = {
                id: $stateParams.albId,
                almacen: 'abonos'
              };
              return HttpService.getAll(model, 'detcompra');
            }
          }
        }).



        state('main.camp.compras.edit.alb.det.fito', {
          url: '/:detId/fito',
          templateUrl: 'scripts/main/camp/compras/lineas/detalles/fitosanitario.html',
          controller: 'lCompFitoDetCtrl',
          resolve: {
            detalle: function($stateParams, HttpService) {
              var model = {
                id: $stateParams.detId
              };
              return HttpService.findOne(model, 'detcompra');
            },
            unidades: function(HttpService) {
              return HttpService.getAll({}, 'unidad');
            }
          }
        }).


        state('main.camp.compras.search', {
          url: '/albaran/:albId/search',
          template: '<div ui-view></div>',
          controller: '',
          abstract: true
        }).

        state('main.camp.compras.search.albFertil', {
          url: '/fertil',
          templateUrl: 'scripts/main/camp/compras/lineas/search/fertilizantes.html',
          controller: 'searchFertilCtrl',
          resolve: {
            abonoList: function(CurrentFinca, HttpService) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return HttpService.getAbonos(model, 'articulo');
            }
          }
        }).

        state('main.camp.compras.search.albFito', {
          url: '/fito',
          templateUrl: 'scripts/main/camp/compras/lineas/search/fitosanitarios.html',
          controller: 'searchFitoCtrl',
          resolve: {
            fitoList: function(CurrentFinca, HttpService) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return HttpService.getFitos(model, 'articulo');
            }
          }
        }).

        state('main.camp.compras.edit.alb.fitos', {
          url: '/fitos',
          templateUrl: 'scripts/main/camp/compras/lineas/fitosanitarios.html',
          controller: 'lCompFitoCtrl',
          resolve: {
            detcompra: function($stateParams, HttpService) {
              var model = {
                id: $stateParams.albId,
                almacen: 'fitosanitarios'
              };
              return HttpService.getAll(model, 'detcompra');
            }
          }
        }).
        state('main.camp.compras.edit.alb.mveg', {
          url: '/mveg',
          templateUrl: 'scripts/main/camp/compras/lineas/matvegetal.html',
          controller: 'lCompMVegCtrl',
        }).
        state('main.camp.compras.edit.alb.otros', {
          url: '/otros',
          templateUrl: 'scripts/main/camp/compras/lineas/otros.html',
          controller: 'lCompOtrosCtrl',
        })

      }
    ]
  );
}());
