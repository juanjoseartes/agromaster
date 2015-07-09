(function () {

  'use strict';


  function AlmAbonoController($scope, $rootScope, $sailsSocket, abonos, HttpService, CurrentFinca) {

    $scope.abonos = abonos;

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

    $sailsSocket.subscribe('producto', function(message) {
      console.log('sails published a message for abono: ' + message.verb);
      var model = {
        finca: CurrentFinca.fincaCur().fincaId,
        almacen: 'abonos'
      };
      switch (message.verb) {

        case 'updated':
          HttpService.getAll(model, 'producto').then(function(model) {
            $scope.abonos = model;
          });
          break;
          case 'addedTo':
            var model = {
              id: message.addedId
            };
            HttpService.findOne(model, 'articulo').success(function(aArt) {
              $scope.abonos.articulo.push(aArt);
            }).error(function(aParc) {
              console.log('error');
            });
            break;
            case 'removedFrom':
              $scope.abonos.articulo = $scope.abonos.articulo.filter(function(articulo) {
                return articulo.id != message.removedId;
              });
            }
          });

    $scope.$watch('editProduct', function (event, data) {

      var model = {
        finca: CurrentFinca.fincaCur().fincaId,
        almacen: 'abonos'
      };
      HttpService.getAll(model, 'producto').then(function(updProd) {
        $scope.fitosanitarios = updProd;
      })
    });

  }

  angular
  .module('App')
  .controller('AlmAbonoController', AlmAbonoController);

})();

(function () {

  'use strict';

  function SearchAbonoController($scope, $rootScope, $state, $stateParams, $http, AppK, abonoList, HttpService, CurrentFinca) {

    $scope.abonoList = abonoList;
    $scope.itemsByPage=[10, 20, 40, 60, 100];
    $scope.itemInit = $scope.itemsByPage[1];

    $scope.selItem = function(item) {
      var model = {
        id: item.id,
        finca: CurrentFinca.fincaCur().fincaId,
        almacen: 'abonos'
      };

      HttpService.addProduct(model, 'producto').then(function(productNew) {

        $scope.$emit('editAbon', productNew);

      });

      $state.go('main.camp.almac.abono', {ejercId: $stateParams.ejercId});
    };

    $scope.back= function() {
      $state.go('main.camp.almac.abono', {ejercId: $stateParams.ejercId});
    };

  }

  angular
  .module('App')
  .controller('SearchAbonoController', SearchAbonoController);

})();
