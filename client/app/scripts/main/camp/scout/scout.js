/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.scout
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.scout module
  angular.module('App.main.scout', []);

  // Module configuration
  angular.module('App.main.scout')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// SCOUTING //////////////////////
        .state('main.camp.scout', {
          url: '/scouting',
          templateUrl: 'scripts/main/camp/scout/scouting.html',
          controller: 'ScoutController',
          resolve: {
            header: function($rootScope, HeaderService) {
              return HeaderService.getItem('scouting');
            },
            navbar: function($rootScope, NavbarService) {
              return NavbarService.getItems('scouting');
            }
          }
        });

      }
    ]
  );
}());
