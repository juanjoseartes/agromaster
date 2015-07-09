(function () {

  'use strict';

  /* @ngInject */
  function CultDiaParcCtrl ($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentFinca, parcelas, HttpService, ParcelaCultivoModel, detParcelas, resDiario, repartoEjerc) {
    $scope.parcelas = parcelas;
    $scope.detparcelas = detParcelas;
    $scope.resDia = resDiario;
    $scope.getTotal = function() {
      // var total = resDiario[0].reduce(function(memo, res) {
      //   return memo + (res.totalmobra+res.totalmat+res.totalmaq+res.totalotros)
      // }, 0);
      return (resDiario.totalmobra+resDiario.totalmat+resDiario.totalmaq+resDiario.totalotros);
    };
    $scope.inicio = false;
    $scope.fin = false;

    $scope.toggleIni = function() {
      $scope.inicio = !$scope.inicio;
      $scope.fin = false;
    };
    $scope.toggleFin = function() {
      $scope.fin = !$scope.fin;
      $scope.inicio = false;
    };

    $scope.diario = {
      parcelas: []
    };
    $scope.tReparto = 's';
    var hoy = new Date();
    $scope.create = function(parcelas) {
      var model = {
        fecha: new Date(),
        tipo: $stateParams.nameDia,
        ejercicio: $stateParams.ejercId,
        finca: CurrentFinca.fincaCur().fincaId,
        parcelas: this.diario.parcelas,
        treparto: this.tReparto,
        inicio: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0),
        fin: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0)
      };
      console.log('Select Parc: ' + JSON.stringify(model));
      ParcelaCultivoModel.create(model).then(function(err) {
        var model = {
          ejerc: $stateParams.ejercId,
          finca: CurrentFinca.fincaCur().fincaId,
          tipo: $stateParams.nameDia
        };
        //return HttpService.findToday(model, 'parccultivo');
        return ParcelaCultivoModel.findToday(model).then(function(modelList) {
          $scope.parcelas = modelList;
        });
      });
      $state.go('^', $stateParams);
    };
    $scope.back = function() {
      $state.go('^', $stateParams);
    };
    $scope.deleteParc = function(item) {
      var model = {
        id: item.id
      };
      //console.log('ModelDel: ' + JSON.stringify(model));
      HttpService.delete(model, 'parccultivo').then(function(err){
        //$scope.detparcelas.splice($scope.detparcelas.indexOf(item), 1);
      })

    };


    //GENERACION graficos
    //Materiales
    var grafTarea = function() {
      var currentMObra = [];
      var currentMat = [];
      var currentMaq = [];
      var currentOtros = [];
      for (var i = 0; i < repartoEjerc.length; i++) {
        var totalMObra = 0;
        var totalMat = 0;
        var totalMaq = 0;
        var totalOtros = 0;
        var fchTarea = new Date (repartoEjerc[i].createdAt);
        var fechaTarea = new Date(fchTarea.getFullYear(), fchTarea.getMonth(), fchTarea.getDate(), 8,0,0,0);
        var date = fechaTarea.getTime();
        totalMObra = repartoEjerc[i].mobra;
        currentMObra.push([date, totalMObra]);
        totalMat = repartoEjerc[i].mat;
        currentMat.push([date, totalMat]);
        totalMaq = repartoEjerc[i].maq;
        currentMaq.push([date, totalMaq]);
        totalOtros = repartoEjerc[i].otros;
        currentOtros.push([date, totalOtros]);
      }
      var mobraData = {'key': "Mano Obra", 'values': currentMObra};
      var matData = {'key': "Materiales", 'values': currentMat};
      var maqData = {'key': "Maquinaria", 'values': currentMaq};
      var otrosData = {'key': "Otros", 'values': currentOtros};
      var chartOutputData = [mobraData, matData, maqData, otrosData];
      return chartOutputData;
    };
    //SCOPES graficos
    $scope.gTarea = grafTarea;
    //CONFIG graficos
    $scope.xFunction = function(){
      return function(d) {
        return d.key;
      };
    };
    $scope.yFunction = function(){
      return function(d){
        return d.y;
      };
    };
    $scope.xAxisTickFormat = function(){
      return function(d){
        // return d3.time.format('%X')(new Date(d)); //uncomment for time format
        return d3.time.format('%d/%m/%Y')(new Date(d)); //uncomment for date format
      }
    };
    $scope.yAxisTickFormat = function(){
      return function(d){
        return d3.format(',.2f')(d);
      }
    };
    $scope.toolTipContentFunction = function(){
      return function(key, x, y, e, graph) {
        return  'Tooltip' +
        '<h2>' + key + '</h2>' +
        '<p>' +  y + ' at ' + x + '</p>'
      }
    };
    $scope.toolTipPie = function(){
      return function(key, x, y, e, graph) {
        return  '<h3>'+key+'</h3>' +
        '<b>Total: '+x+'€</b>'
      }
    };

    //Parcelas
    $sailsSocket.subscribe('parccultivo', function(message) {
      console.log('sails published a message for parcela cultivo: ' + message.verb);

      switch (message.verb) {
        case 'created':
          var model = {
            ejerc: $stateParams.ejercId,
            finca: CurrentFinca.fincaCur().fincaId,
            tipo: $stateParams.nameDia
          };
          HttpService.findToday(model, 'parccultivo').then(function(modelList) {
            $scope.detparcelas = modelList;
          });
          break;
        case 'updated':
          var model = {
            ejerc: $stateParams.ejercId,
            finca: CurrentFinca.fincaCur().fincaId,
            tipo: $stateParams.nameDia
          };
          HttpService.findToday(model, 'parccultivo').then(function(modelList) {
            $scope.detparcelas = modelList;
          });
          break;
          case 'destroyed':
            var model = {
              ejerc: $stateParams.ejercId,
              finca: CurrentFinca.fincaCur().fincaId,
              tipo: $stateParams.nameDia
            };
            HttpService.findToday(model, 'parccultivo').then(function(modelList) {
              $scope.detparcelas = modelList;
            });
        }
      });

  }

  angular
  .module('App')
  .controller('CultDiaParcCtrl', CultDiaParcCtrl);

})();

(function () {

  'use strict';

  /* @ngInject */
  function CultDiaEditParcCtrl ($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentFinca, parcelas, HttpService, parcela) {

    $scope.parcela = parcela;
    var inicio = new Date (parcela.inicio);
    var fin = new Date (parcela.fin);

    $scope.inicioHora = inicio.getHours();
    $scope.inicioMinuto = inicio.getMinutes();
    $scope.finHora = fin.getHours();
    $scope.finMinuto = fin.getMinutes();

    $scope.save = function(time) {
      var hoy = new Date();
      var hInicio =new Date (hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), this.inicioHora, this.inicioMinuto, 0)
      var hFin =new Date (hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), this.finHora, this.finMinuto, 0)
      var model = {
        id: $stateParams.parcId,
        inicio: hInicio,
        fin: hFin
      };
      console.log('Select Parc: ' + JSON.stringify(model));
      HttpService.update(model, 'parccultivo').then(function(err) {

      });
      $state.go('^', $stateParams);
    };
    $scope.back = function() {
      $state.go('^', $stateParams);
    };

  }

  angular
  .module('App')
  .controller('CultDiaEditParcCtrl', CultDiaEditParcCtrl);

})();
