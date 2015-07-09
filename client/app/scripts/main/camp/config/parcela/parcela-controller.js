(function () {

  'use strict';

  /* @ngInject */
  function ConfigParcController($scope, $rootScope, $state, $stateParams, AppK, CurrentUser, HttpService, CurrentFinca, ParcelaModel, parcelas) {

  $scope.appName = AppK.appName;
  $scope.title = "Alta - Parcela";
  $scope.parcelas = parcelas;
  $scope.create = function() {
    var model = {
      finca: CurrentFinca.fincaCur().fincaId,
      ejercicio: $stateParams.ejercId,
      name: this.parcela.name,
      suptotal: this.parcela.suptotal,
      supcult: this.parcela.supcult,
      active: this.parcela.active
    };
    ParcelaModel.create(model).then(function(error) {
      if (error) return console.log('Error alta parcela: ' + error);
    });
    $state.go('^', $stateParams);
  };
  $scope.update = function(parcela) {
    var model = {
      finca: CurrentFinca.fincaCur().fincaId,
      ejercicio: $stateParams.ejercId,
      id: parcela.id,
      name: parcela.name,
      suptotal: parcela.suptotal,
      supcult: parcela.supcult,
      active: parcela.active
    };
    //console.log('Parcela: ' + JSON.stringify(model));
    ParcelaModel.update(parcela.id, model).then(function onSuccess() {
      var model = {
        id: $stateParams.fincaId
      };
      return HttpService.getAll(model, 'parcela').then(function(modelList) {
        $scope.parcelas = modelList;
      });
    });
    $state.go('main.camp.config.home.parc', $stateParams);
  };

  $scope.back= function() {
    $state.go('^', $stateParams);
  };

}

angular
.module('App')
.controller('ConfigParcController', ConfigParcController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function ConfigEditParcController($scope, $rootScope, $state, $stateParams, AppK, CurrentUser, parcela, HttpService, CurrentFinca, ParcelaModel, parcelas) {

  $scope.appName = AppK.appName;
  $scope.title = "Edicion Parcela";
  $scope.parcela = parcela;
  $scope.parcelas = parcelas;
  $scope.save = function(parcela) {
    var model = {
      finca: CurrentFinca.fincaCur().fincaId,
      ejercicio: $stateParams.ejercId,
      id: parcela.id,
      name: parcela.name,
      suptotal: parcela.suptotal,
      supcult: parcela.supcult,
      active: parcela.active
    };
    //console.log('Parcela: ' + JSON.stringify(model));
    ParcelaModel.update(parcela.id, model).then(function onSuccess() {
      var model = {
        id: $stateParams.fincaId
      };
      HttpService.getAll(model, 'parcela').then(function(modelList) {
        $scope.parcelas = modelList;
      });
    });
    $state.go('main.camp.config.home.parc', $stateParams);
  };

  $scope.back= function() {
    $state.go('^', $stateParams);
  };
}

angular
.module('App')
.controller('ConfigEditParcController', ConfigEditParcController);

})();
