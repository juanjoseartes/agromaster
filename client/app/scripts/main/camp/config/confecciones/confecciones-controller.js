(function () {

  'use strict';

  /* @ngInject */
  function ConfigConfeccController ($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentUser, CurrentFinca, HttpService, ConfeccionModel, confecciones, especies, unidades) {

    $scope.title = 'Configuracion - Confecciones';
    $scope.confecciones = confecciones;

    $scope.confecc = [];
    $scope.especies = especies;
    $scope.udesPeso = _.filter(unidades, function(uds) {
      return uds.tipo == 'Peso';
    });
    $scope.back = function() {
      $state.go('^', $stateParams);
    };
    $scope.create = function() {
      var data = {
        ejercicio: $stateParams.ejercId,
        name: this.confecc.name,
        //especie: this.confecc.especie,
        categ: this.confecc.categ,
        nenvases: this.confecc.nenvases,
        pesounit: this.confecc.pesounit,
        unidad: this.confecc.unidad
      };
      ConfeccionModel.create(data).then(function onSuccess(){
        var model = {
          ejerc: $stateParams.ejercId
        };
        ConfeccionModel.getActive(model).then(function(modelList) {
          $scope.confecciones = modelList;
        });
      });
      $state.go('main.camp.config.home.confecc');
    };
    $rootScope.$on('confeccUpd', function () {
      var model = {
        ejerc: $stateParams.ejercId
      };
      ConfeccionModel.getActive(model).then(function(modelList) {
        $scope.confecciones = modelList;
      });
    });


  }

  angular
  .module('App')
  .controller('ConfigConfeccController', ConfigConfeccController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function ConfigConfeccEditController ($scope, $rootScope, $state, $stateParams, CurrentUser, CurrentFinca, HttpService, ConfeccionModel, confeccion, especies, unidades) {

    $scope.title = 'Configuracion - Confecciones';
    $scope.confeccion = confeccion;
    $scope.especies = especies;
    $scope.unidades = unidades

    for (var i = 0; i < especies.length; i++) {
      if (especies[i].id == $scope.confeccion.especie.id) {
        $scope.confeccion.especie = especies[i];
        break;
      }
    };
    for (var i = 0; i < $scope.unidades.length; i++) {
      if ($scope.unidades[i].id == $scope.confeccion.unidad.id) {
        $scope.confeccion.unidad = $scope.unidades[i];
        break;
      }
    };


    $scope.back = function() {
      $state.go('main.camp.config.home.confecc');
    };
    $scope.update = function() {
      var data = {
        id: $stateParams.confeccId,
        name: this.confeccion.name,
        //especie: this.confeccion.especie.id,
        categ: this.confeccion.categ,
        nenvases: this.confeccion.nenvases,
        pesounit: this.confeccion.pesounit,
        unidad: this.confeccion.unidad.id
      };
      console.log('Model: ' + JSON.stringify(data));
      ConfeccionModel.update(data.id, data).then(function onSuccess() {
        $rootScope.$broadcast('confeccUpd');
      });
      $state.go('main.camp.config.home.confecc', $stateParams);
    };



  }

  angular
  .module('App')
  .controller('ConfigConfeccEditController', ConfigConfeccEditController);

})();
