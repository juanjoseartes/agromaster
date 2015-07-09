/**
* This file contains all necessary Angular controller definitions for 'frontend.examples.book' module.
*
* Note that this file should only contain controllers and nothing else.
*/
(function () {
  'use strict';


  angular.module('App.main')
  .controller('FincaController', [
    '$scope', '$rootScope', '$state', '$http', '$stateParams', '$localStorage', 'UserService', 'HttpService', '$ionicModal',
    function controller($scope, $rootScope, $state, $http, $stateParams, $localStorage, UserService, HttpService, $ionicModal) {

      $scope.user = UserService.user();

      $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.createFinca = function(newFinca) {
        var model = {
          usuario: UserService.user().id,
          name: newFinca.name,
          localidad: newFinca.localidad,
          provincia: newFinca.provincia
        };
        console.log('New Finca: ' + JSON.stringify(model));
        HttpService.create(model, 'finca').then(function onSuccess() {
          var model = {
            id: UserService.user().id
          };
          HttpService.getOne(model, 'user').then(function(modelList) {
            $scope.user = modelList;
            $localStorage.credentials.user.fincas = modelList.fincas;
          });
        });
        $scope.modal.hide();
      };

}]);


  angular.module('App.main.finca')
  .controller('SelEjercicioController', [
    '$scope', '$rootScope', '$state', '$http', '$stateParams', '$localStorage', '$ionicModal', 'UserService', 'campanas', 'EjercicioModel', 'HttpService', 'CurrentFinca', 'especies',
    function controller($scope, $rootScope, $state, $http, $stateParams, $localStorage, $ionicModal, UserService, campanas, EjercicioModel, HttpService, CurrentFinca, especies) {

    $scope.ejercicios = campanas;
    $scope.especies = especies;
    $scope.selecFinca = UserService.user();

    $ionicModal.fromTemplateUrl('templates/ejerc-modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalEjerc = modal;
    });

    $scope.createEjercicio = function(newEjerc) {
      var model = {
        finca: $stateParams.fincaId,
        name: newEjerc.name,
        especies: newEjerc.especies,
        fchinic: newEjerc.fchinic,
        fchfin: newEjerc.fchfin
      };
      console.log('New Ejerc: ' + JSON.stringify(model));
      HttpService.create(model, 'ejercicio').then(function onSuccess() {
        var model = {
          id: $stateParams.fincaId
        };
        HttpService.getAll(model, 'ejercicio').then(function(modelList) {
          $scope.ejercicios = modelList;
        });
      });
      $scope.modalEjerc.hide();
    };


    $scope.selectEjerc = function(ejerc) {
      var model = {
        id: this.ejerc.id,
        finca: $stateParams.fincaId
      };
      HttpService.getFincaEjercs(model, 'ejercicio').then(function(result) {
        $localStorage.fincaEjercs = result;
        // Storage.set('fincaEjercs', JSON.stringify(result));
        // LocalStorage.setObject('fincaEjercs', result);
        $rootScope.$broadcast('curfinca');
      });
      $state.go('main.camp.mobra.presencia.inicio', {ejercId: model.id});
    };


}]);

angular.module('App.main')
  .controller('addEjercCtrl', [
    '$scope', '$rootScope', '$state', '$stateParams', '$localStorage', 'ORM',
  function($scope, $rootScope, $state, $stateParams, $localStorage, ORM) {

    $scope.finca = $stateParams.fincaId;


    $scope.newEjerc = function() {
      var model = {
        finca: $stateParams.fincaId,
        name: this.ejercicio.name,
        fchinic: this.ejercicio.fchinic,
        fchfin: this.ejercicio.fchfin
      };

      ORM.create(model, 'ejercicio').then(function(result) {

        $localStorage.set('fincaEjercs', JSON.stringify(result));
        // LocalStorage.setObject('fincaEjercs', result);
        $rootScope.$emit('newEjecicio');
      });



      $state.go('main.finca.ejerc', {fincaId: $stateParams.fincaId});
    };

    $scope.back = function() {
      $state.go('main.finca.ejerc', {fincaId: $stateParams.fincaId});
    };

  }])
  ;

}());
