(function () {

  'use strict';


function AlmFitoController($scope, $rootScope, fitos, HttpService, CurrentFinca) {

$scope.fitosanitarios = fitos;

$scope.getStock = function(articulo){
    var totalE = 0;
    for(var i = 0; i < articulo.entradas.length; i++){
        var product = articulo.entradas[i];
        totalE += (product.cant * product.capenvase * product.udsstock);
    };

    var totalS = 0;
    for(var i = 0; i < articulo.salidas.length; i++){
        var product = articulo.salidas[i];
        totalS += (product.cant * product.capenvase * product.udsstock);
    };

    return (totalE - totalS);
};

$scope.getPMed = function(articulo){
    var totalE = 0;
    var totalPrec = 0;
    for(var i = 0; i < articulo.entradas.length; i++){
        var product = articulo.entradas[i];
        totalE += (product.cant * product.capenvase * product.udsstock);
        totalPrec += (product.cant * product.precunit);
    };

    return (totalPrec/(totalE));
};

$scope.$watch('editProduct', function (event, data) {

        var model = {
          finca: CurrentFinca.fincaCur().fincaId,
          almacen: 'fitosanitarios'
        };
        HttpService.getAll(model, 'producto').then(function(updProd) {
          $scope.fitosanitarios = updProd;
        })
  });

}

angular
.module('App')
.controller('AlmFitoController', AlmFitoController);

})();

(function () {

  'use strict';

function SearchFitoController($scope, $rootScope, $state, $stateParams, $http, AppK, fitoList, HttpService, CurrentFinca) {

$scope.fitoList = fitoList;
$scope.itemsByPage=[10, 20, 40, 60, 100];
$scope.itemInit = $scope.itemsByPage[1];

$scope.selItem = function(item) {
  var model = {
    id: item.id,
    finca: CurrentFinca.fincaCur().fincaId,
    almacen: 'fitosanitarios'
  };

  HttpService.addProduct(model, 'producto').then(function(productNew) {

    $scope.$emit('editProduct', productNew);

  });

  $state.go('main.camp.almac.fito', {ejercId: $stateParams.ejercId});
};

$scope.back= function() {
  $state.go('main.camp.almac.fito', {ejercId: $stateParams.ejercId});
};

}

angular
.module('App')
.controller('SearchFitoController', SearchFitoController);

})();
