angular.module('App.configUser', []).

controller('ConfigUserCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentUser, HttpService, CurrentFinca, curUser) {

  $scope.appName = AppK.appName;
  $scope.title = "Edicion - Usuario";
  $scope.curUser = curUser;

  $scope.saveUser = function() {
    var model = {
      finca: CurrentFinca.fincaCur().fincaId,
      id: curUser.id,
      username: this.curUser.username,
      email: this.curUser.email,
      telefono: this.curUser.telefono,
      admin: this.curUser.admin,
      gerente: this.curUser.gerente,
      active: this.curUser.active
    };

    HttpService.update(model, 'user').then(function(userUpd) {

      // $rootScope.$emit('editUser', userUpd);

    });


    $state.go('main.camp.config.ppal', {ejercId: $stateParams.ejercId});
  };


  $scope.back= function() {
    $state.go('main.camp.config.ppal', {ejercId: $stateParams.ejercId});
  };
}).

controller('AddUserCtrl',
function($scope, $rootScope, $state, $stateParams, AppK, CurrentUser, HttpService, CurrentFinca) {

  $scope.appName = AppK.appName;
  $scope.title = "Nuevo - Usuario";

  $scope.saveUser = function() {
    var model = {

      finca: CurrentFinca.fincaCur().fincaId,
      username: this.newuser.username,
      email: this.newuser.email,
      telefono: this.newuser.telefono,
      admin: this.newuser.admin,
      password: this.newuser.password,
      confirmPassword: this.newuser.confirmPassword,
      gerente: this.newuser.gerente,
      active: this.newuser.active
    };

    HttpService.create(model, 'user').then(function(userNew) {

      // $rootScope.$emit('editUser', userNew);

    });


    $state.go('main.camp.config.ppal', {ejercId: $stateParams.ejercId});
  };


  $scope.back= function() {
    $state.go('main.camp.config.ppal', {ejercId: $stateParams.ejercId});
  };
})
;
