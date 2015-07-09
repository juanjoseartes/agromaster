(function () {

  'use strict';

  /* @ngInject */
  function MObraHistoricoController ($scope, $rootScope, $state, $stateParams, $sailsSocket, ParteMoModel, partes, resEjercCult, resEjercRec, resEjercEnc) {

    $scope.partes = partes;
    $scope.resEjercCult = resEjercCult;
    $scope.back = function() {
      $state.go('main.camp.mobra.historico');
    };
    $scope.searchPartes = function(parte) {
      var model = {
        id: $stateParams.ejercId,
        tipo: 'cultivo',
        fchinic: parte.fchinic.toString(),
        fchfin: parte.fchfin.toString()
      };
      ParteMoModel.getPeriod(model).then(function(modelList) {
        $scope.resEjercCult = modelList;
        var totalCult = function() {
          var sumCult = resEjercCult.reduce(function(memo, diario) {return memo + diario.totalcult}, 0);
          return sumCult;
        };
        var nCultTotal = function() {
          var nCult = resEjercCult.reduce(function(memo, dia) {return memo + dia.ncult}, 0);
          return nCult;
        };

        $scope.getEjercCultivo = totalCult;
        $scope.nEjercCult = nCultTotal;
      });
      var model = {
        id: $stateParams.ejercId,
        tipo: 'recoleccion',
        fchinic: parte.fchinic.toString(),
        fchfin: parte.fchfin.toString()
      };
      ParteMoModel.getPeriod(model).then(function(modelList) {
        $scope.resEjercRec = modelList;
        var totalRecol = function() {
          var sumRec = resEjercRec.reduce(function(memo, diario) {return memo + diario.totalrecol}, 0);
          return sumRec;
        };
        var nRecolTotal = function() {
          var nRec = resEjercRec.reduce(function(memo, dia) {return memo + dia.nrecol}, 0);
          return nRec;
        };

        $scope.getEjercRecol = totalRecol;
        $scope.nEjercRecol = nRecolTotal;
      });
      var model = {
        id: $stateParams.ejercId,
        tipo: 'encargado',
        fchinic: parte.fchinic.toString(),
        fchfin: parte.fchfin.toString()
      };
      ParteMoModel.getPeriod(model).then(function(modelList) {
        $scope.resEjercEnc = modelList;

        var totalEncarg = function() {
          var sumEnc = resEjercEnc.reduce(function(memo, diario) {return memo + diario.totalencarg}, 0);
          return sumEnc;
        };
        var nEncargTotal = function() {
          var nEnc = resEjercEnc.reduce(function(memo, dia) {return memo + dia.nencarg}, 0);
          return nEnc;
        };

        $scope.getEjercEncarg = totalEncarg;
        $scope.nEjercEncarg = nEncargTotal;
      });
      var model = {
        id: $stateParams.ejercId,
        fchinic: parte.fchinic.toString(),
        fchfin: parte.fchfin.toString()
      };
      ParteMoModel.getPeriod(model).then(function(modelList) {
        $scope.partes = modelList;
      });

    };


    var totalCult = function() {
      var sumCult = resEjercCult.reduce(function(memo, diario) {return memo + diario.totalcult}, 0);
      return sumCult;
    };
    var nCultTotal = function() {
      var nCult = resEjercCult.reduce(function(memo, dia) {return memo + dia.ncult}, 0);
      return nCult;
    };
    var totalRecol = function() {
      var sumRec = resEjercRec.reduce(function(memo, diario) {return memo + diario.totalrecol}, 0);
      return sumRec;
    };
    var nRecolTotal = function() {
      var nRec = resEjercRec.reduce(function(memo, dia) {return memo + dia.nrecol}, 0);
      return nRec;
    };
    var totalEncarg = function() {
      var sumEnc = resEjercEnc.reduce(function(memo, diario) {return memo + diario.totalencarg}, 0);
      return sumEnc;
    };
    var nEncargTotal = function() {
      var nEnc = resEjercEnc.reduce(function(memo, dia) {return memo + dia.nencarg}, 0);
      return nEnc;
    };
    $scope.getEjercCultivo = totalCult;
    $scope.getEjercRecol = totalRecol;
    $scope.getEjercEncarg = totalEncarg;
    $scope.nEjercCult = nCultTotal;
    $scope.nEjercRecol = nRecolTotal;
    $scope.nEjercEncarg = nEncargTotal;

  }

  angular
  .module('App')
  .controller('MObraHistoricoController', MObraHistoricoController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function MObraParteController ($scope, $rootScope, $state, $stateParams, $sailsSocket, ParteMoModel, parte) {

    $scope.parte = parte;

  }

  angular
  .module('App')
  .controller('MObraParteController', MObraParteController);

})();
