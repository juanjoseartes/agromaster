(function () {

  'use strict';

  /* @ngInject */
  function ConfigEjercCultCtrl($scope, $rootScope, $state, $stateParams, $sailsSocket, AppK, CurrentUser, CurrentFinca, ejercicio, especies, HttpService, LocalService, PreEjercicio) {

  $scope.appName = AppK.appName;
  $scope.title = "Seleccion Nuevo Cultivo";

  $scope.user = CurrentUser.user();
  $scope.ejercicio = ejercicio;
  $scope.especies = especies;
  $scope.ejercId = $stateParams.ejercId;

  $scope.fchInic = moment(ejercicio.fchinic).format('L')
  $scope.fchFin = ejercicio.fchfin;

  $scope.cultivo = {
    especies: []
  };
  $scope.create = function() {
    var model = {
      ejercid: $stateParams.campId,
      especies: this.cultivo.especies,
    };
    HttpService.addEspec(model, 'ejercicio').then(function(error) {
      if (error) return console.log('Error seleccion cultivo: ' + error);
      //console.log('Res: ' + JSON.stringify(res));
    });

    for (var i = 0; i < model.especies.length; i++) {
      $sails.get("/especie/"+model.especies[i])
      .success(function (aEspec) {
        var resCult = $scope.ejercicio.especies.filter(function (el) {
          return el.id == aEspec.id;
        });
        if (resCult.length == 0) {
          $scope.ejercicio.especies.push(aEspec);
        }
      })
      .error(function (aEspec) {
        console.log('error');
      });
    };

    $state.go('^', $stateParams);
  };


  $scope.back= function() {
    $state.go('^', $stateParams);
  };
}

angular
.module('App')
.controller('ConfigEjercCultCtrl', ConfigEjercCultCtrl);

})();
