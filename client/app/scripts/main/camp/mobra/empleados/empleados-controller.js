(function () {

  'use strict';

  /* @ngInject */
  function MObraEmpleadCtrl ($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentFinca, HttpService, EmpleadoModel, empleados) {

    $scope.empleados = empleados;
    $scope.emplead = '';

    $scope.save = function(emplead) {
      var model = {
        name: this.emplead.name,
        apellidos: this.emplead.apellidos,
        active: this.emplead.active,
        tel: this.emplead.tel,
        email: this.emplead.email,
        direccion: this.emplead.direccion,
        poblacion: this.emplead.poblacion,
        nif: this.emplead.nif,
        nss: this.emplead.nss,
        fincas: CurrentFinca.fincaCur().fincaId,
        catprof: this.emplead.catprof,
        costjornal: this.emplead.costjornal,
        costhextra: this.emplead.costhextra,
        costportes: this.emplead.costportes
      };
      console.log('Model: ' + JSON.stringify(model));
      EmpleadoModel.create(model).then(function(res) {
        console.log('Res: ' + JSON.stringify(res));
        $state.go('^', $stateParams);
      });
    };
    $scope.back = function() {
      $state.go('^', $stateParams);
    };

    //Maquinaria
    $sailsSocket.subscribe('empleado', function(message) {
      console.log('sails published a message for empleado: ' + message.verb);

      switch (message.verb) {
        case 'created':
          var model = {
            finca: CurrentFinca.fincaCur().fincaId,
          };
          EmpleadoModel.getAll(model).then(function(modelList) {
            $scope.empleados = modelList;
          });
          break;
        case 'updated':
          var model = {
            finca: CurrentFinca.fincaCur().fincaId
          };
          EmpleadoModel.getAll(model).then(function(modelList) {
            $scope.empleados = modelList;
          });
          break;
        case 'destroyed':
          var model = {
            finca: CurrentFinca.fincaCur().fincaId
          };
          EmpleadoModel.getAll(model).then(function(modelList) {
            $scope.empleados = modelList;
          });
        }
      });

  }

  angular
  .module('App')
  .controller('MObraEmpleadCtrl', MObraEmpleadCtrl);

})();


(function () {

  'use strict';

  /* @ngInject */
  function MObraEmpleadEditCtrl ($scope, $rootScope, $state, $stateParams, CurrentFinca, HttpService, EmpleadoModel, empleado) {

    $scope.empleado = empleado;

    $scope.save = function() {
      var model = {
        id: $stateParams.emplId,
        name: this.empleado.name,
        apellidos: this.empleado.apellidos,
        active: this.empleado.active,
        tel: this.empleado.tel,
        email: this.empleado.email,
        direccion: this.empleado.direccion,
        poblacion: this.empleado.poblacion,
        nif: this.empleado.nif,
        nss: this.empleado.nss,
        catprof: this.empleado.catprof,
        costjornal: this.empleado.costjornal,
        costhextra: this.empleado.costhextra,
        costportes: this.empleado.costportes
      };
      console.log('Model: ' + JSON.stringify(model));
      EmpleadoModel.update(model.id, model).then(function(res) {
        //console.log('Res: ' + JSON.stringify(res));
        $state.go('^', $stateParams);
      });
    };
    $scope.back = function() {
      $state.go('^', $stateParams);
    };


    }

  angular
  .module('App')
  .controller('MObraEmpleadEditCtrl', MObraEmpleadEditCtrl);

})();

// angular.module('App.mobra', []).
//
// controller('MObraCtrl',
// function($scope, $rootScope, $state, $stateParams, CurrentUser, AppK) {
//   $scope.appName = AppK.appName;
//   $scope.title = 'Mano de Obra';
//
//   $scope.date = moment().format('LL');
//
//
// })
// ;
