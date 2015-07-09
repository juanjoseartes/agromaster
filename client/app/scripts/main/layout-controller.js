(function () {
  'use strict';

  angular.module('App.main')
  .controller('HeaderController',
  [
    '$scope', '$state', 'HeaderService',
    function HeaderController($scope, $state, HeaderService, header) {

      $scope.header = header;

    }
  ]
);

angular.module('App.main')
.controller('NavbarController', [
  '$scope', '$state', 'NavbarService',
  function($scope, $state, NavbarService, navbar) {

    $scope.navbar = navbar;

    }
  ]);



}());
