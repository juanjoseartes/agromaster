/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.compras.albaran
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.compras.albaran module
  angular.module('App.main.compras.albaran', []);

  // Module configuration
  angular.module('App.main.compras.albaran')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// ALBARAN //////////////////////
        .state('main.camp.compras.home.alb', {
          url: '/albaran',
          templateUrl: 'scripts/main/camp/compras/albaranes/albaranes.html',
          controller: 'AlbCompraController',
          resolve: {
            albaranes: function(CurrentFinca, HttpService){
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                fchinic: CurrentFinca.fincaCur().ejercCurso.fchinic,
                fchfin: CurrentFinca.fincaCur().ejercCurso.fchfin
              };
              return HttpService.getAll(model, 'albcompra');
            },
          }
        }).

        state('main.camp.compras.home.alb.hoy', {
          url: '/hoy',
          templateUrl: 'scripts/main/camp/compras/albaranes/albaranesList.html',
          controller: 'AlbListCompraController',
          resolve: {
            albaranes: function(CurrentFinca, HttpService){
              var fin = new Date();
              var inicio = new Date(fin);
              inicio.setDate(fin.getDate()-1);
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                fchinic: inicio,
                fchfin: fin
              };
              console.log('Model: ' + JSON.stringify(model));
              return HttpService.getAll(model, 'albcompra');
            },
          }
        }).

        state('main.camp.compras.home.alb.semana', {
          url: '/semana',
          templateUrl: 'scripts/main/camp/compras/albaranes/albaranesList.html',
          controller: 'AlbListCompraController',
          resolve: {
            albaranes: function(CurrentFinca, HttpService){
              var fin = new Date();
              var inicio = new Date(fin);
              inicio.setDate(fin.getDate()-7);
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                fchinic: inicio,
                fchfin: fin
              };
              return HttpService.getAll(model, 'albcompra');
            },
          }
        }).
        state('main.camp.compras.home.alb.mes', {
          url: '/mes',
          templateUrl: 'scripts/main/camp/compras/albaranes/albaranesList.html',
          controller: 'AlbListCompraController',
          resolve: {
            albaranes: function(CurrentFinca, HttpService){
              var fin = new Date();
              var inicio = new Date(fin);
              inicio.setDate(fin.getDate()-30);
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                fchinic: inicio,
                fchfin: fin
              };
              return HttpService.getAll(model, 'albcompra');
            },
          }
        }).
        state('main.camp.compras.home.alb.trim', {
          url: '/trimestre',
          templateUrl: 'scripts/main/camp/compras/albaranes/albaranesList.html',
          controller: 'AlbListCompraController',
          resolve: {
            albaranes: function(CurrentFinca, HttpService){
              var fin = new Date();
              var inicio = new Date(fin);
              inicio.setDate(fin.getDate()-90);
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                fchinic: inicio,
                fchfin: fin
              };
              return HttpService.getAll(model, 'albcompra');
            },
          }
        }).
        state('main.camp.compras.home.alb.all', {
          url: '/all',
          templateUrl: 'scripts/main/camp/compras/albaranes/albaranesList.html',
          controller: 'AlbListCompraController',
          resolve: {
            albaranes: function(CurrentFinca, HttpService){
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                fchinic: CurrentFinca.fincaCur().ejercCurso.fchinic,
                fchfin: CurrentFinca.fincaCur().ejercCurso.fchfin
              };
              return HttpService.getAll(model, 'albcompra');
            },
          }
        }).

        state('main.camp.compras.home.alb.edit', {
          url: '/:albId',
          templateUrl: 'scripts/main/camp/compras/albaranes/editAlbaran.html',
          controller: 'EditAlbCompraController',
          resolve: {
            albaran: function($stateParams, HttpService){
              var model = {
                id: $stateParams.albId
              };
              return HttpService.findOne(model, 'albcompra');
            },
            unidades: function(HttpService) {
              return HttpService.findGetDefault({}, 'unidad');
            },
            detCompra: function($stateParams, HttpService) {
              var model = {
                id: $stateParams.albId
              };
              return HttpService.getAll(model, 'detcompra');
            },

          }
        }).

        state('main.camp.compras.home.alb.edit.fertil', {
          url: '/:detId',
          templateUrl: 'scripts/main/camp/compras/lineas/detalles/fertilizante.html',
          controller: 'lCompFertilDetController',
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
        })

      }
    ]
  );
}());
