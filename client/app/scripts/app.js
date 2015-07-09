// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function() {
  'use strict';

  angular.module('App', [
    'App.core',
    //'App.states',
    'App.main',

  ]);

  angular.module('App')
  .config(
    [
      '$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$sailsSocketProvider',
      'cfpLoadingBarProvider', 'toastrConfig', 'AccessLevels',
      function config($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $sailsSocketProvider,
        cfpLoadingBarProvider, toastrConfig, AccessLevels
      ) {

        $httpProvider.defaults.useXDomain = true;

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // Add interceptors for $httpProvider and $sailsSocketProvider
        $httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.interceptors.push('ErrorInterceptor');
        //
        // // Iterate $httpProvider interceptors and add those to $sailsSocketProvider
        angular.forEach($httpProvider.interceptors, function iterator(interceptor) {
          $sailsSocketProvider.interceptors.push(interceptor);
        });
        // Set tooltip options
        // $tooltipProvider.options({
        //   appendToBody: true
        // });

        // Disable spinner from cfpLoadingBar
        cfpLoadingBarProvider.includeSpinner = true;

        // Extend default toastr configuration with application specified configuration
        angular.extend(
          toastrConfig,
          {
            allowHtml: true,
            closeButton: true,
            extendedTimeOut: 3000
          }
        );

        // Yeah we wanna to use HTML5 urls!
        // $locationProvider
        // .html5Mode({
        //   enabled: true,
        //   requireBase: false
        // })
        // .hashPrefix('!')
        // ;

        // Routes that needs authenticated user
        $stateProvider
        .state('login', {
          url: '/',
          templateUrl: 'scripts/main/login/login.html',
          controller: 'LoginController',
          data: {
            access: AccessLevels.anon
          }
        })
        ;
        // For any unmatched url, redirect to /about
        $urlRouterProvider.otherwise('/');

  }
]
);

angular.module('App')
.run(
  [
    '$rootScope', '$state', '$stateParams', '$injector', '$ionicPlatform', 'AuthService', 'amMoment',
    function($rootScope, $state, $stateParams, $injector, $ionicPlatform, AuthService, amMoment) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });

      amMoment.changeLocale('es');

      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      /**
      * Route state change start event, this is needed for following:
      *  1) Check if user is authenticated to access page, and if not redirect user back to login page
      */

      $rootScope.$on('$stateChangeStart', function stateChangeStart(event, toState) {
        if (!AuthService.authorize(toState.data.access)) {
          event.preventDefault();

          $state.go('login');
        }
      });

      /**
      * Check for state change errors.
      */
      $rootScope.$on('$stateChangeError', function stateChangeError(event, toState, toParams, fromState, fromParams, error) {
        event.preventDefault();

        $injector.get('MessageService')
        .error('Error loading the page');

        $state.get('error').error = {
          event: event,
          toState: toState,
          toParams: toParams,
          fromState: fromState,
          fromParams: fromParams,
          error: error
        };
        console.log($state.get('error').error);

        return $state.go('error');
      });

    }
  ]
);

}());
