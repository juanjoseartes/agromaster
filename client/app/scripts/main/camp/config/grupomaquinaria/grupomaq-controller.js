angular.module('App.configGrupoMaq', []).

controller('ConfigGrupoMaqCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentUser, CurrentFinca, HttpService, grupomaq) {

  $scope.appName = AppK.appName;
  $scope.title = "Edicion - Grupo Maquinaria";
  $scope.grupomaquinaria = grupomaq;

  $scope.saveGrupo = function() {
    var model = {
      id: $stateParams.grupomaqId,
      name: this.grupomaquinaria.name,

    };

    HttpService.update(model, 'grupomaq').then(function(diaUpd) {
      // $rootScope.$emit('editUser', diaUpd);
    });
    $state.go('^', $stateParams);
  };

  $scope.back= function() {
    $state.go('^', $stateParams);
  };
}).

controller('AddGrupoMaqCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentUser, HttpService, CurrentFinca) {

  $scope.appName = AppK.appName;
  $scope.title = "Nuevo - Grupo Maquinaria";

  $scope.saveGrupo = function() {
    var model = {
      name: this.grupomaquinaria.name,
    };

    HttpService.create(model, 'grupomaq').then(function(diaNew) {
      // $rootScope.$emit('editUser', diaNew);
    });

    $state.go('^', $stateParams);
  };

  $scope.back= function() {
    $state.go('^', $stateParams);
  };
})
;
