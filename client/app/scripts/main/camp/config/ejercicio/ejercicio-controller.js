(function () {

  'use strict';

  /* @ngInject */
  function ConfigEjercController($scope, $rootScope, $state, $stateParams, $sailsSocket, AppK, CurrentUser, CurrentFinca, ejercicios, EjercicioModel, HttpService) {

    $scope.appName = AppK.appName;
    $scope.title = "Datos Ejercicio";
    $scope.ejercicios = ejercicios;
    $scope.back= function() {
      $state.go('^', $stateParams);
    };
    $rootScope.$on('ejercUpd', function () {
      var model = {
        id:CurrentFinca.fincaCur().fincaId
      };
      return EjercicioModel.getAll(model).then(function(modelList) {
        $scope.ejercicios = modelList;
      });
    });

    $scope.selFchInic = function(fch) {
      LocalService.set('FchInic', JSON.stringify(fch));
      $state.go('^', $stateParams);
    };
    $scope.selFchInic = function(fch) {
      LocalService.set('FchFin', JSON.stringify(fch));
      $state.go('^', $stateParams);
    };


  }

  angular
  .module('App')
  .controller('ConfigEjercController', ConfigEjercController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function ConfigEditEjercController($scope, $rootScope, $state, $stateParams, AppK, CurrentUser, CurrentFinca, ejercicio, EjercicioModel, HttpService) {

    $scope.appName = AppK.appName;
    $scope.title = "Edicion Ejercicio";
    $scope.ejercicio = ejercicio;
    $scope.back= function() {
      $state.go('^', $stateParams);
    };
	$scope.update = function() {
	var data = {
		id: $stateParams.campId,
		name: this.ejercicio.name,
		active: this.ejercicio.active
	};
		EjercicioModel.update(data.id, data).then(function onSuccess() {
      $rootScope.$broadcast('ejercUpd');
		});
    $state.go('^', $stateParams);
	};

    $scope.deleteEspec = function(id) {
      console.log('EspecId: ' + id);
      var model = {
        ejercid: $stateParams.campId,
        especie: id,
      };
      HttpService.removeEspec(model, 'ejercicio').then(function(ejercUpd) {
      });
      $scope.ejercicio.especies.splice($scope.ejercicio.especies.indexOf(id), 1);
      $state.go('main.camp.config.home.ejerc.edit', $stateParams);
    };

  }

  angular
  .module('App')
  .controller('ConfigEditEjercController', ConfigEditEjercController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function ConfigEditEjercFchController ($scope, $rootScope, $state, $stateParams, HttpService) {
    $scope.title = 'Fechas Campaña'

    $scope.selFchInic = function(fch) {
      var model = {
        id: $stateParams.campId,
        fchinic: this.fch.fchinic
      };
      HttpService.update(model, 'ejercicio').then(function(error) {
        if (error) return console.log('Error modificacion fecha inicio: ' + error);

        $state.go('^', $stateParams);
      });
    };
    $scope.selFchInic = function(fch) {
      var model = {
        id: $stateParams.campId,
        fchfin: this.fch.fchfin
      };
      HttpService.update(model, 'ejercicio').then(function(error) {
        if (error) return console.log('Error modificacion fecha fin: ' + error);

        $state.go('^', $stateParams);
      });
    };
    $scope.back = function() {
      $state.go('^', $stateParams);
    };

  }

  angular
  .module('App')
  .controller('ConfigEditEjercFchController', ConfigEditEjercFchController);

})();
