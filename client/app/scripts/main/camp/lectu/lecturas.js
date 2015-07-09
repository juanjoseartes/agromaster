/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.lecturas
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.lecturas module
  angular.module('App.main.lecturas', [
    'App.main.lecturas.parcelas'
  ]);

  // Module configuration
  angular.module('App.main.lecturas')
  .config(
    [
      '$stateProvider',
      function($stateProvider) {
        $stateProvider

        ///////////////// LECTURAS //////////////////////
        .state('main.camp.lectu', {
          url: '/lecturas',
          abstract: true,
          templateUrl: 'scripts/main/camp/lectu/lecturas.html',
          controller: 'LectuController as lecturas',
          resolve: {
            header: function($rootScope, HeaderService) {
              return HeaderService.getItem('lecturas');
            },
            parcCur: function(CurrentFinca) {
              return CurrentFinca.fincaCur().parcelas[0].id;
            }
          }
        })
        // .state('main.camp.lectu.ph', {
        //   url: '/ph',
        //   // abstract: true,
        //   templateUrl: 'scripts/main/camp/lectu/ph/ph.html',
        //   // controller: 'LectuController as lecturas',
        //   // resolve: {
        //   //   header: function($rootScope, HeaderService) {
        //   //     return HeaderService.getItem('lecturas');
        //   //   },
        //   //   navbar: function($rootScope, NavbarService) {
        //   //     return NavbarService.getItems('lecturas');
        //   //   }
        //   // }
        // })
        .state('main.camp.lectu.ec', {
          url: '/ec',
          // abstract: true,
          templateUrl: 'scripts/main/camp/lectu/ec/ec.html',
          // controller: 'LectuController as lecturas',
          // resolve: {
          //   header: function($rootScope, HeaderService) {
          //     return HeaderService.getItem('lecturas');
          //   },
          //   navbar: function($rootScope, NavbarService) {
          //     return NavbarService.getItems('lecturas');
          //   }
          // }
        })

      }
    ]
  );
}());
