/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.config.unidad
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.config.unidad module
  angular.module('App.main.config.unidad', []);

  // Module configuration
  angular.module('App.main.config.unidad')
  // .config(
  //   [
  //     // '$stateProvider',
  //     // function($stateProvider) {
  //     //   $stateProvider
  //     //
  //     //   ///////////////// UNIDAD //////////////////////
  //     //   .state('main.camp.config.udadd', {
  //     //     url: '/addunit',
  //     //     templateUrl: 'scripts/main/camp/config/unidad/addUnidad.html',
  //     //     controller: 'AddUnidadCtrl'
  //     //   }).
  //     //
  //     //   state('main.camp.config.udedit', {
  //     //     url: '/:udId/editunit',
  //     //     templateUrl: 'scripts/main/camp/config/unidad/editUnidad.html',
  //     //     controller: 'EditUnidadCtrl',
  //     //     resolve: {
  //     //       unidad: function($stateParams, ORM){
  //     //         var model = {
  //     //           id: $stateParams.udId
  //     //         };
  //     //         return ORM.findOne(model, 'unidad');
  //     //       }
  //     //     }
  //     //   })
  //     //
  //     // }
  //   ]
  // );
}());
