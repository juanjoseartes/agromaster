(function () {

  'use strict';

  /* @ngInject */
  function MObraPresencEncController ($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentFinca, ListEmpleadoModel, HttpService, presEnc, empleadAv) {
    $scope.presEnc = presEnc;
    //$scope.listEmplead = empleados;
    $scope.empleadAv = empleadAv;
    //console.log('Lista Disponibles: ' + JSON.stringify(empleadAv));
    $scope.sortType     = 'empleado.name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchText   = '';     // set the default search/filter term

    $scope.diario = {
      empleados: []
    };
    $scope.getTotal = function(){
      var sumTotal = presEnc.reduce(function(memo, resCu) {
        return memo + ((resCu.precjornal * resCu.njornal) + (resCu.prechextra * resCu.nhextra) + (resCu.nportes * resCu.precporte)); // return previous total plus current age
      }, 0); // initialize age with 0 that will be passed as memo
      return sumTotal;
    };
    $scope.create = function(parcelas) {
      var date = this.diario.fecha.toString()
      var model = {
        fecha: date,
        tipo: 'encargado',
        ejerc: $stateParams.ejercId,
        finca: CurrentFinca.fincaCur().fincaId,
        empleados: this.diario.empleados,
      };
      //console.log('Select Parc: ' + JSON.stringify(model));
      ListEmpleadoModel.create(model).then(function(err) {
        $state.go('^', $stateParams);
      })
    };
    $scope.delete = function(emplead) {
      //console.log('Select Empleados: ' + JSON.stringify(model.empleados));
      ListEmpleadoModel.delete(emplead).then(function onSuccess() {
        var model = {
          ejerc: $stateParams.ejercId,
          finca: CurrentFinca.fincaCur().fincaId,
          tipo: 'encargado'
        };
        //return HttpService.findToday(model, 'listempleado');
        return ListEmpleadoModel.findToday(model).then(function(modelList) {
          $scope.presCult = modelList;
        });
      });
    };
    $scope.back = function() {
      $state.go('^', $stateParams);
    };


    //Empleados Cultivo
    $sailsSocket.subscribe('listempleado', function(message) {
      console.log('sails published a message for empleados cultivo: ' + message.verb);

      switch (message.verb) {
        case 'created':
        var model = {
          ejerc: $stateParams.ejercId,
          finca: CurrentFinca.fincaCur().fincaId,
          tipo: 'encargado'
        };
        HttpService.findToday(model, 'listempleado').then(function(modelList) {
          $scope.presEnc = modelList;
          $scope.getTotal = function(){
            var sumTotal = modelList.reduce(function(memo, resCu) {
              return memo + ((resCu.precjornal * resCu.njornal) + (resCu.prechextra * resCu.nhextra) + (resCu.nportes * resCu.precporte)); // return previous total plus current age
            }, 0); // initialize age with 0 that will be passed as memo
            return sumTotal;
          };
        });
        break;
        case 'updated':
        var model = {
          ejerc: $stateParams.ejercId,
          finca: CurrentFinca.fincaCur().fincaId,
          tipo: 'encargado'
        };
        HttpService.findToday(model, 'listempleado').then(function(modelList) {
          $scope.presEnc = modelList;
          $scope.getTotal = function(){
            var sumTotal = modelList.reduce(function(memo, resCu) {
              return memo + ((resCu.precjornal * resCu.njornal) + (resCu.prechextra * resCu.nhextra) + (resCu.nportes * resCu.precporte)); // return previous total plus current age
            }, 0); // initialize age with 0 that will be passed as memo
            return sumTotal;
          };
        });
        break;
        case 'destroyed':
        var model = {
          ejerc: $stateParams.ejercId,
          finca: CurrentFinca.fincaCur().fincaId,
          tipo: 'encargado'
        };
        HttpService.findToday(model, 'listempleado').then(function(modelList) {
          $scope.presEnc = modelList;
          $scope.getTotal = function(){
            var sumTotal = modelList.reduce(function(memo, resCu) {
              return memo + ((resCu.precjornal * resCu.njornal) + (resCu.prechextra * resCu.nhextra) + (resCu.nportes * resCu.precporte)); // return previous total plus current age
            }, 0); // initialize age with 0 that will be passed as memo
            return sumTotal;
          };
        });
      }
    });

  }

  angular
  .module('App')
  .controller('MObraPresencEncController', MObraPresencEncController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function MObraPresencEncEditController ($scope, $rootScope, $state, $stateParams, CurrentFinca, ListEmpleadoModel, HttpService, empleado) {

    $scope.empleado = empleado;

    $scope.save = function() {
      var model = {
        id: $stateParams.moId,
        njornal: this.empleado.njornal,
        precjornal: this.empleado.precjornal,
        nhextra: this.empleado.nhextra,
        prechextra: this.empleado.prechextra,
        nportes: this.empleado.nportes,
        precporte: this.empleado.precporte,
        partemo: this.empleado.partemo
      };
      //console.log('Select Parc: ' + JSON.stringify(model));
      ListEmpleadoModel.update(model.id, model).then(function(err) {
        $state.go('^', $stateParams);
      })
    };
    $scope.back = function() {
      $state.go('^', $stateParams);
    };
  }

  angular
  .module('App')
  .controller('MObraPresencEncEditController', MObraPresencEncEditController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function MObraPresencEncChangeController ($scope, $rootScope, $state, $stateParams, CurrentFinca, ListEmpleadoModel, HttpService, empleado) {

    $scope.empleado = empleado;

    $scope.change = function(t, parte) {
      var model = {
        ejerc: $stateParams.ejercId,
        id: $stateParams.moId,
        tipo: t,
        parteId: parte
      };
      //console.log('Select Parc: ' + JSON.stringify(model));
      ListEmpleadoModel.change(model).then(function(err) {
        $state.go('^', $stateParams);
      })
    };

    $scope.back = function() {
      $state.go('^', $stateParams);
    };
  }

  angular
  .module('App')
  .controller('MObraPresencEncChangeController', MObraPresencEncChangeController);

})();
