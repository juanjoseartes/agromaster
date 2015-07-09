(function () {

  'use strict';

  /* @ngInject */
  function LectuController ($scope, $rootScope, $state, $stateParams, parcCur, CurrentFinca, header) {
    $scope.title = 'Lecturas';
    $scope.fincaName = CurrentFinca.fincaCur().fincaname;
    $scope.date = moment().format('LL');
    $scope.errors = [];
    $scope.parcelas = CurrentFinca.fincaCur().parcelas;
    $scope.curParc = parcCur;
    $rootScope.headerItem = header;

  }

  angular
    .module('App')
    .controller('LectuController', LectuController);

})();
