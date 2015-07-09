(function () {

  'use strict';


function AlmMVegController($scope, $rootScope, $state, $stateParams, CurrentUser, AppK, variedades) {

$scope.variedades = variedades;


}

angular
.module('App')
.controller('AlmMVegController', AlmMVegController);

})();
