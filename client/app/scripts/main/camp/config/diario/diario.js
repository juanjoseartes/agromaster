/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.config.diario
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.config.diario module
  angular.module('App.main.config.diario', []);

  // Module configuration
  angular.module('App.main.config.diario')
  // .config(
  //   [
  //     // '$stateProvider',
  //     // function($stateProvider) {
  //     //   $stateProvider
  //     //
  //     //   ///////////////// CONFIGURACION //////////////////////
  //     //   .state('main.camp.config.dia', {
  //     //     url: '/diario',
  //     //     abstract: true,
  //     //     template: '<div ui-view></div>'
  //     //   }).
  //     //
  //     //   state('main.camp.config.dia.edit', {
  //     //     url: '/:diaId',
  //     //     templateUrl: 'scripts/main/camp/config/diario/diario.html',
  //     //     controller: 'ConfigDiarioCtrl',
  //     //     resolve: {
  //     //       diario: function($stateParams, ORM) {
  //     //         var model = {
  //     //           id: $stateParams.diaId
  //     //         };
  //     //         return ORM.findOne(model, 'tipodiario');
  //     //       }
  //     //     }
  //     //   }).
  //     //
  //     //   state('main.camp.config.adddia', {
  //     //     url: '/addDiario',
  //     //     abstract: true,
  //     //     template: '<div ui-view></div>'
  //     //   }).
  //     //
  //     //   state('main.camp.config.adddia.new', {
  //     //     url: '/new',
  //     //     templateUrl: 'scripts/main/camp/config/diario/addDiario.html',
  //     //     controller: 'AddDiarioCtrl'
  //     //   })
  //     //
  //     // }
  //   ]
  // );
}());
