angular.module('App.configDiario', []).

controller('ConfigDiarioCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentUser, CurrentFinca, HttpService, diario) {

  $scope.appName = AppK.appName;
  $scope.title = "Edicion - Diario Cultivo";
  $scope.diario = diario;

  $scope.saveDiario = function() {
    var model = {
      id: $stateParams.diaId,
      name: this.diario.name,
      //pathname: this.diario.pathname,
      orden: this.diario.orden,
      active: this.diario.active
    };

    HttpService.update(model, 'tipodiario').then(function(diaUpd) {
      // $rootScope.$emit('editUser', diaUpd);
    });
    $state.go('main.camp.config.ppal', {ejercId: $stateParams.ejercId});
  };

  $scope.back= function() {
    $state.go('main.camp.config.ppal', {ejercId: $stateParams.ejercId});
  };
}).

controller('AddDiarioCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentUser, HttpService, CurrentFinca) {

  $scope.appName = AppK.appName;
  $scope.title = "Nuevo - Diario";

  $scope.saveDiario = function() {
    var model = {
      finca: CurrentFinca.fincaCur().fincaId,
      name: this.diario.name,
      //pathname: this.diario.pathname,
      orden: parseInt(this.diario.orden)
    };

    HttpService.create(model, 'tipodiario').then(function(diaNew) {
      // $rootScope.$emit('editUser', diaNew);
    });

    $state.go('main.camp.config.ppal', {ejercId: $stateParams.ejercId});
  };

  $scope.back= function() {
    $state.go('main.camp.config.ppal', {ejercId: $stateParams.ejercId});
  };
})
;
