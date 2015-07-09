(function () {
  'use strict';

  angular.module('App.main')
  .controller('LoginController',
  [
    '$scope', '$state', 'AuthService', 'FocusOnService', 'AppK', '$ionicModal', 'HttpService',
    function LoginController($scope, $state, AuthService, FocusOnService, AppK, $ionicModal, HttpService
    ) {
      // Already authenticated so redirect back to books list
      if (AuthService.isAuthenticated()) {
        $state.go('main.finca');
      }

      $scope.appName = AppK.appName;
      $scope.date = moment().format('LL');

      // Scope function to perform actual login request to server
      $scope.login = function login() {
        AuthService
        .login($scope.credentials)
        .then(
          function successCallback() {
            $state.go('main.finca');
            _reset();
          },
          function errorCallback() {
            _reset();
          }
        );
      };

      $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.createUser = function(newUser) {

        HttpService.create(newUser, 'user');
        $scope.modal.hide();
      };


      /**
      * Private helper function to reset credentials and set focus to username input.
      *
      * @private
      */
      function _reset() {
        FocusOnService.focus('username');

        // Initialize credentials
        $scope.credentials = {
          identifier: '',
          password: ''
        };
      }

      _reset();
    }
  ]
);

angular.module('App.main')
.controller('MainController', [
  '$scope', '$rootScope', '$state', '$stateParams', '$ionicPopover', '$ionicSideMenuDelegate',
  'UserService', 'CurrentFinca', 'AuthService', 'AppK', 'TitleService', 'header', 'navbar',
  function($scope, $rootScope, $state, $stateParams, $ionicPopover, $ionicSideMenuDelegate,
    UserService, CurrentFinca, AuthService, AppK, TitleService, header, navbar) {
      $scope.appName = AppK.appName;
      //$scope.moduleName = $state;
      TitleService.setTitle('Home');

      $rootScope.headerItem = header;
      $rootScope.navbarItems = navbar;
      // $scope.usernamePlaceholder = 'Enter your username';
      $scope.date = moment().format('LL');
      $scope.errors = [];
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
      $scope.user = UserService.user();
      $scope.curfinca = CurrentFinca.fincaCur();
      $scope.curParc = CurrentFinca.parcCur();

      // if ($scope.curfinca.fincaId) {
      //   $scope.curParc = CurrentFinca.fincaCur().parcelas[0].id;
      //   $scope.especCurso = $scope.curfinca.ejercCurso.especies[0].id;
      // }


      // $ionicPopover.fromTemplateUrl('templates/popover-fincas.html', function(popOpcFincas) {
      //   $scope.popOpcFincas = popOpcFincas;
      // });

      $ionicPopover.fromTemplateUrl('templates/popover-fincas.html', {
        scope: $scope,
      }).then(function(popOpcFincas) {
        $scope.popOpcFincas = popOpcFincas;
      });

      $ionicPopover.fromTemplateUrl('templates/popover-ejercicios.html', {
        scope: $scope,
      }).then(function(popOpcEjerc) {
        $scope.popOpcEjerc = popOpcEjerc;
      });


      $scope.closePopover = function() {
        $scope.popover.hide();
      };


      // $ionicPopover.fromTemplateUrl('templates/popover-ejercicios.html', function(popOpcEjerc) {
      //   $scope.popOpcEjerc = popOpcEjerc;
      // });

      $rootScope.$on('curfinca', function (event, data) {
        $scope.curfinca = CurrentFinca.fincaCur();
        $scope.curParc = CurrentFinca.parcCur();
      });

      $rootScope.$on('editEjerc', function (event, data) {

        var model = {
          id: CurrentFinca.fincaCur().id
        };
        // ORM.getAll(model, 'ejercicio').then(function(listEjerc) {
        //   $scope.campanas = listEjerc;
        // });

      });

      $scope.logout = function() {
        AuthService.logout();
        //$state.go('login');
      };

    }]);

    angular.module('App.main')
    .controller('PopFincasCtrl', function($scope, $rootScope, $state, $stateParams, $ionicPopover, UserService, CurrentFinca) {
      'use strict';
      $scope.user = UserService.user();
      $scope.curfinca = CurrentFinca.fincaCur();


      $scope.closePopover = function(finca) {
        var fincaCur = this.finca.id;

        $scope.popover.hide();
        $state.go('main.finca.ejerc', {fincaId: fincaCur});

      };

    });

    angular.module('App.main')
    .controller('PopEjercCtrl', function($scope, $rootScope, $state, $stateParams, $ionicPopover, UserService, CurrentFinca, AppK, $localStorage) {
      'use strict';
      $scope.user = UserService.user();
      $rootScope.$on('curfinca', function (event, data) {
        $scope.curfinca = CurrentFinca.fincaCur();
      });


      $scope.closePopover = function(ejerc) {

        var ejercicioCur = ejerc.id;

        // ORM.getFincaEjercs(ejerc, 'ejercicio').then(function(result) {
        //   LocalService.set('fincaEjercs', JSON.stringify(result));
        //   $rootScope.$broadcast('curfinca');
        // });

        $scope.popover.hide();
        $state.go('main.camp.mobra', {ejercId: ejercicioCur});

      };

    });

  }());
