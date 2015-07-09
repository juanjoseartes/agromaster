/**
* Generic models angular module initialize.
*/
(function() {
  'use strict';

  angular.module('App.core.error', []);

  // Module configuration
  angular.module('App.core.error')
  .config(
    [
      '$stateProvider',
      function state($stateProvider) {
        $stateProvider
        .state('error', {
          parent: 'main',
          url: '/error',
          data: {
            access: 0
          },
          views: {
            'content@': {
              templateUrl: 'scripts/core/error/partials/error.html',
              controller: 'ErrorController',
              resolve: {
                _error: function resolve() {
                  return this.self.error;
                }

              }
            }
          }
        })
        ;
      }
    ]
  );
}());
