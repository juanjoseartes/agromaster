(function () {

	'use strict';

	/* @ngInject */

function ConfigController($scope, $rootScope, $state, $stateParams, $sailsSocket, $ionicModal, AppK, HttpService, CurrentFinca, finca, especies, unidades) {

  $scope.appName = AppK.appName;
  $scope.title = "Configuracion";
  $scope.finca = finca;

  $scope.ejercId = $stateParams.ejercId;
  $scope.ejercEspec = especies;
  $scope.unidades = unidades;
  //$scope.maquinaria = maquinaria;



  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  $scope.recalCostCult = function() {
    var model = {
      ejerc: $stateParams.ejercId
    };
    return HttpService.sumTotales(model, 'partecult').then(function(res) {
      $state.go('main.camp.cult.home.plantacion.inic', $stateParams);
    });
  };

  $sailsSocket.subscribe('finca', function(message) {
    console.log('sails published a message for finca: ' + message.verb);
    switch (message.verb) {

      case 'updated':
        HttpService.getOne(message, 'finca').then(function(model) {
          $scope.finca = model;
        });
        break;
    }
  });


  $sailsSocket.subscribe('user', function(message) {
    console.log('sails published a message for user: ' + message.verb);
    var model = {
      id: finca.id
    };
    switch (message.verb) {

      case 'updated':
        HttpService.getOne(model, 'finca').then(function(model) {
          $scope.finca = model;
        });
        break;
      case 'addedTo':
        var model = {
          id: message.addedId
        };
        HttpService.findOne(model, 'user').success(function(aUser) {
          $scope.finca.usuarios.push(aUser);
        }).error(function(aUser) {
          console.log('error');
        });
        break;
      case 'removedFrom':
        $scope.finca.usuarios = $scope.finca.usuarios.filter(function(usuario) {
          return usuario.id != message.removedId;
        });
    }
  });

  $sailsSocket.subscribe('tipodiario', function(message) {
    console.log('sails published a message for tipodiario: ' + message.verb);
    var model = {
      id: finca.id
    };
    switch (message.verb) {

      case 'updated':
        HttpService.getOne(model, 'finca').then(function(model) {
          $scope.finca = model;
        });
        break;
      case 'addedTo':
        var model = {
          id: message.addedId
        };
        HttpService.findOne(model, 'tipodiario').success(function(aDiario) {
          $scope.finca.tipodiarios.push(aDiario);
        }).error(function(aDiario) {
          console.log('error');
        });
        break;
      case 'removedFrom':
        $scope.finca.tipodiarios = $scope.finca.tipodiarios.filter(function(diario) {
          return diario.id != message.removedId;
        });
    }
  });




  $scope.newCamp = {};
  $scope.newParc = {};

  $scope.createCamp = function(u) {

    var model = {
      name: u.name,
      fchinic: u.fchinic,
      fchfin: u.fchfin,
      especies: u.especie,
      finca: finca.id,
      active: u.active
    };

    HttpService.create(model, 'ejercicio').then(function() {

    });

    $scope.addCamp.hide();
  };

  $scope.createParc = function(u) {

    var model = {
      name: u.name,
      supcult: u.supcult,
      finca: finca.id,
    };

    HttpService.create(model, 'parcela').then(function() {

    });

    $scope.addParc.hide();
  };


  $scope.saveFinca = function() {
    var model = {
      id: finca.id,
      name: this.finca.name,
      localidad: this.finca.localidad,
      provincia: this.finca.provincia
    };
    HttpService.update(model, 'finca').then(function() {

    });

    $state.go('finca.detail');
  };

}


angular
.module('App')
.controller('ConfigController', ConfigController);

})();
