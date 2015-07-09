angular.module('App.lcompra', []).

controller('lCompFertilCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentFinca, detcompra, HttpService) {
  //Info Base
  $scope.appName = AppK.appName;
  $scope.title = 'Albaran de Compra';
  $scope.fincaName = CurrentFinca.fincaCur().fincaname;
  $scope.detcompra = detcompra;
  $scope.delete = function() {
    var model = {
      id: this.linea.id
    };
    HttpService.delete(model, 'detcompra').then(function(err){
      if (err) console.log(err);
    });
    $state.go('main.camp.compras.home.alb', {ejercId: $stateParams.ejercId});
  }
}).

controller('lCompFertilDetCtrl',
function($scope, $rootScope, $state, $stateParams, $sailsSocket, AppK, CurrentFinca, detalle, unidades, HttpService) {
  //Info Base
  $scope.appName = AppK.appName;
  $scope.title = 'Detalle Linea Albaran: Fertilizante';
  $scope.fincaName = CurrentFinca.fincaCur().fincaname;
  $scope.detalle = detalle;
  $scope.unidades = unidades;

  for (var i = 0; i < $scope.unidades.length; i++) {
    if ($scope.unidades[i].id == $scope.detalle.udenvase.id) {
        $scope.detalle.udenvase = $scope.unidades[i];
        break;
    }
}

  $scope.save= function(detalle) {
    var model = {
      id: $stateParams.detId,
      cant: detalle.cant,
      precunit: detalle.precunit,
      capenvase: detalle.capenvase,
      udenvase: detalle.udenvase,
      //udsstock: ''
    };

    HttpService.update(model, 'detcompra').then(function(err) {
      if (err) console.log(err);
    })
    $state.go('main.camp.compras.home.alb.edit', {ejercId: $stateParams.ejercId, albId: $stateParams.albId});
  };

  $scope.back= function() {
    $state.go('main.camp.compras.home.alb.edit', {ejercId: $stateParams.ejercId, albId: $stateParams.albId});
  };

  //Detalle Compra
  $sailsSocket.subscribe('detcompra', function(message) {
    console.log('sails published a message for detalle compra: ' + message.verb);

    switch (message.verb) {
      case 'created':
        var alb = {
          id: $stateParams.albId
        };
        DetCompraModel.getAll(alb).then(function(modelList) {
          $scope.detCompra = modelList;
        });
        break;
      case 'updated':
        var alb = {
          id: $stateParams.albId
        };
        DetCompraModel.getAll(alb).then(function(modelList) {
          $scope.detCompra = modelList;
        });
        break;
      case 'addedTo':
        var model = {
          id: message.addedId
        };
        DetcompraModel.findOne(model).success(function(aLinAlb) {
          $scope.albaranes.push(aLinAlb);
        }).error(function(aLinAlb) {
          console.log('error');
        });
        break;
      case 'removedFrom':
        $scope.detCompra = $scope.detCompra.filter(function(linAlb) {
          return linAlb.id != message.removedId;
        });
      }
    });

}).

controller('lCompFitoDetCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentFinca, detalle, unidades, HttpService) {
  //Info Base
  $scope.appName = AppK.appName;
  $scope.title = 'Detalle Linea Albaran: Fertilizante';
  $scope.fincaName = CurrentFinca.fincaCur().fincaname;
  $scope.detalle = detalle;
  $scope.unidades = unidades;

  for (var i = 0; i < $scope.unidades.length; i++) {
    if ($scope.unidades[i].id == $scope.detalle.udenvase.id) {
        $scope.detalle.udenvase = $scope.unidades[i];
        break;
    }
}

  $scope.save= function(detalle) {
    var model = {
      id: $stateParams.detId,
      cant: detalle.cant,
      precunit: detalle.precunit,
      capenvase: detalle.capenvase,
      udenvase: detalle.udenvase,
      udsstock: ''
    };

    HttpService.update(model, 'detcompra').then(function(err) {
      if (err) console.log(err);
    })
    $state.go('main.camp.compras.edit.alb', {ejercId: $stateParams.ejercId, albId: $stateParams.albId});
  };

  $scope.back= function() {
    $state.go('main.camp.compras.edit.alb', {ejercId: $stateParams.ejercId, albId: $stateParams.albId});
  };

}).

controller('lCompFitoCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentFinca, detcompra, HttpService) {
  //Info Base
  $scope.appName = AppK.appName;
  $scope.title = 'Albaran de Compra';
  $scope.fincaName = CurrentFinca.fincaCur().fincaname;
  $scope.detcompra = detcompra;

  $scope.delete = function(linea) {
    //console.log('Linea: ' + linea);
    var model = {
      id: linea.id
    };
    HttpService.delete(model, 'detcompra').then(function(err){
      if (err) console.log(err);
    });
    $state.go('main.camp.compras.home.alb', {ejercId: $stateParams.ejercId});
  };

}).
controller('lCompMVegCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentFinca) {
  //Info Base
  $scope.appName = AppK.appName;
  $scope.title = 'Albaran de Compra';
  $scope.fincaName = CurrentFinca.fincaCur().fincaname;

}).
controller('lCompOtrosCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentFinca) {
  //Info Base
  $scope.appName = AppK.appName;
  $scope.title = 'Albaran de Compra';
  $scope.fincaName = CurrentFinca.fincaCur().fincaname;

}).

controller('searchFertilCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentFinca, HttpService, abonoList) {
  //Info Base
  $scope.appName = AppK.appName;
  $scope.title = 'Albaran de Compra';
  $scope.fincaName = CurrentFinca.fincaCur().fincaname;

  $scope.abonoList = abonoList;
  $scope.itemsByPage=[10, 20, 40, 60, 100];
  $scope.itemInit = $scope.itemsByPage[1];

  $scope.back= function() {
    $state.go('main.camp.compras.home.alb.edit', {ejercId: $stateParams.ejercId, albId: $stateParams.albId});
  };


  $scope.selItem = function(item) {
    var model = {
      finca: CurrentFinca.fincaCur().fincaId,
      articulo: item.id,
      albaran: $stateParams.albId,
      almacen: 'abonos',
      udenvase: CurrentFinca.udSel().data[0].id,
      udsstock: ''
    };

    HttpService.create(model, 'detcompra').then(function(linea) {
      console.log('Linea Compra: ' + linea);
      $state.go('main.camp.compras.home.alb.edit', {ejercId: $stateParams.ejercId, albId: $stateParams.albId});
    });
  };


}).

controller('searchFitoCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentFinca, HttpService, fitoList) {
  //Info Base
  $scope.appName = AppK.appName;
  $scope.title = 'Albaran de Compra';
  $scope.fincaName = CurrentFinca.fincaCur().fincaname;

  $scope.fitoList = fitoList;
  $scope.itemsByPage=[10, 20, 40, 60, 100];
  $scope.itemInit = $scope.itemsByPage[1];

  $scope.back= function() {
    $state.go('main.camp.compras.home.alb.edit', {ejercId: $stateParams.ejercId, albId: $stateParams.albId});
  };

  $scope.selItem = function(item) {
    var model = {
      finca: CurrentFinca.fincaCur().fincaId,
      articulo: item.id,
      albaran: $stateParams.albId,
      almacen: 'fitosanitarios',
      udenvase: CurrentFinca.udSel().data[0].id,
      udsstock: ''
    };

    HttpService.create(model, 'detcompra').then(function(linea) {
      console.log('Linea Compra: ' + linea);
      $state.go('main.camp.compras.home.alb.edit', {ejercId: $stateParams.ejercId, albId: $stateParams.albId});
    });
  };


})


;
