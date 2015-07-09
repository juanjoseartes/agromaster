angular.module('App.configUnidad', []).

controller('AddUnidadCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentUser, HttpService, CurrentFinca) {

  $scope.appName = AppK.appName;
  $scope.title = "Nueva - Unidad";

  $scope.save = function() {
    var model = {
      name: this.unidad.name,
      tipo: this.unidad.tipo,
      coefconvert: this.unidad.coefconvert
    };

    HttpService.create(model, 'unidad').then(function(modelNew) {
      // $rootScope.$emit('editUser', diaNew);
    });

    $state.go('main.camp.config.ppal', {ejercId: $stateParams.ejercId});
  };

  $scope.back= function() {
    $state.go('main.camp.config.ppal', {ejercId: $stateParams.ejercId});
  };
}).

controller('EditUnidadCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentUser, HttpService, CurrentFinca, unidad) {

  $scope.appName = AppK.appName;
  $scope.title = "Editar - Unidad";
  $scope.unidad = unidad;
  $scope.save = function() {
    var model = {
      id: $stateParams.udId,
      name: this.unidad.name,
      tipo: this.unidad.tipo,
      coefconvert: this.unidad.coefconvert
    };

    HttpService.update(model, 'unidad').then(function(modelNew) {
      // $rootScope.$emit('editUser', diaNew);
    });

    $state.go('main.camp.config.ppal', {ejercId: $stateParams.ejercId});
  };

  $scope.back= function() {
    $state.go('main.camp.config.ppal', {ejercId: $stateParams.ejercId});
  };
})
;
