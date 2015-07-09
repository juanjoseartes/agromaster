/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.config.usuario
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.config.usuario module
  angular.module('App.main.config.usuario', []);

  // Module configuration
  angular.module('App.main.config.usuario')
  // .config(
  //   [
  //     // '$stateProvider',
  //     // function($stateProvider) {
  //     //   $stateProvider
  //     //
  //     //   ///////////////// USUARIO //////////////////////
  //     //   .state('main.camp.config.user', {
  //     //     url: '/user',
  //     //     abstract: true,
  //     //     template: '<div ui-view></div>'
  //     //   }).
  //     //
  //     //   state('main.camp.config.user.edit', {
  //     //     url: '/:userId',
  //     //     templateUrl: 'scripts/main/camp/config/usuario/usuario.html',
  //     //     controller: 'ConfigUserCtrl',
  //     //     resolve: {
  //     //       curUser: function($stateParams, ORM) {
  //     //         var model = {
  //     //           id: $stateParams.userId
  //     //         };
  //     //         return ORM.findOne(model, 'user');
  //     //       },
  //     //     }
  //     //   }).
  //     //
  //     //   state('main.camp.config.useradd', {
  //     //     url: '/add',
  //     //     templateUrl: 'scripts/main/camp/config/usuario/addUsuario.html',
  //     //     controller: 'AddUserCtrl'
  //     //   })
  //     //
  //     // }
  //   ]
  // );
}());
