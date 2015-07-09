/**
* This file contains all necessary Angular controller definitions for 'frontend.auth.login' module.
*
* Note that this file should only contain controllers and nothing else.
*/
(function() {
  'use strict';

  /**
  * Login controller to handle user's login to application. Controller uses 'Auth' service to make actual HTTP
  * request to server and try to authenticate user.
  *
  * After successfully login Auth service will store user data and JWT token via 'Storage' service where those are
  * asked whenever needed in application.
  *
  * @todo
  *  1) different authentication providers
  *  2) user registration
  */
  angular.module('App.main.login')

}());


// angular.module('App.login', []).
//
// controller('LoginController',
// function($scope, $http, $rootScope, $state, $stateParams, $ionicLoading, Auth, ValidationService, AppK) {
//   $scope.appName = AppK.appName;
//
//   $scope.usernamePlaceholder = "Enter your username"
//   $scope.user = {};
//   $scope.date = moment().format('LL');
//   $scope.formAction = 'login';
//   $scope.errors = [];
//
//   // Form validation is handled by the ValidationService
//   $scope.inputValid = ValidationService.inputValid;
//   $scope.inputInvalid = ValidationService.inputInvalid;
//   $scope.showError = ValidationService.showError;
//   $scope.canSubmit = ValidationService.canSubmit;
//
//   // Flash message.  Used to indicate error messages to the user
//   $scope.signupLoginError = false;
//   $scope.flashMessage = "";
//   $scope.dismiss = function() {
//     $scope.signupLoginError = false;
//   };
//
//   // Trigger the loading indicator
//   $scope.show = function() {
//
//     // Show the loading overlay and text
//     $scope.loading = $ionicLoading.show({
//       content: 'Loading...',
//       animation: 'fade-in',
//       showBackdrop: true,
//       maxWidth: 200,
//       showDelay: 500
//     });
//   };
//
//
//   $scope.login = function() {
//     $scope.errors = [];
//     Auth.login($scope.user).success(function(result) {
//       $state.go('main.finca');
//     }).error(function(err) {
//       $scope.errors.push(err);
//     });
//   }
//
// });
