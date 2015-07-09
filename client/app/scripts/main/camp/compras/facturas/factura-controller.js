(function() {
  'use strict';

function FactCompraController($scope, $rootScope, $state, $stateParams, AppK, CurrentFinca, facturas) {
  $scope.appName = AppK.appName;
  $scope.title = 'Albaran de Compra';
  $scope.fincaName = CurrentFinca.fincaCur().fincaname;
  $scope.facturas = facturas;

$scope.back= function() {
  $state.go('main.camp.compras.inic', {ejercId: $stateParams.ejercId});
};

}

angular
.module('App')
.controller('FactCompraController', FactCompraController);

})();
