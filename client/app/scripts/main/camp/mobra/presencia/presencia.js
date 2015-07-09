/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.mobra.presencia
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.mobra.presencia module
  angular.module('App.main.mobra.presencia', [
    'App.main.mobra.presencia.cultivo',
    'App.main.mobra.presencia.encargados',
    'App.main.mobra.presencia.inicio',
    'App.main.mobra.presencia.recoleccion'
  ]);

  // Module configuration
  angular.module('App.main.mobra.presencia')
  // .config(
  //   [
  //     // '$stateProvider',
  //     // function($stateProvider) {
  //     //   $stateProvider
  //     //
  //     //   // PRESENCIA //
  //     //   .state('main.camp.mobra.presencia', {
  //     //     url: '/presencia',
  //     //     templateUrl: 'scripts/main/camp/mobra/presencia/presencia.html',
  //     //     controller: 'MObraPresencCtrl',
  //     //     onExit: function($stateParams, ORM) {
  //     //       var model = {
  //     //         ejerc: $stateParams.ejercId
  //     //       };
  //     //       return ORM.unsubscribe(model, 'partemo');
  //     //     },
  //     //   })
  //     //
  //     // }
  //   ]
  // );
}());
