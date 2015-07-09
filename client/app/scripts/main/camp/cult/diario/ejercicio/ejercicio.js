/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.cultivo.diario.ejercicio
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.cultivo.diario.ejercicio module
  angular.module('App.main.cultivo.diario.ejercicio', []);

  // Module configuration
  angular.module('App.main.cultivo.diario.ejercicio')
  // .config(
  //   [
  //     // '$stateProvider',
  //     // function($stateProvider) {
  //     //   $stateProvider
  //     //
  //     //   ////////// EJERCICIO /////////////
  //     //   .state('main.camp.cult.home.ejerc', {
  //     //     url: '/ejercicio',
  //     //     templateUrl: 'scripts/main/camp/cult/diario/ejercicio/ejercicio.html',
  //     //     controller: 'CultDiaEjercCtrl',
  //     //     resolve: {
  //     //       ejercicio: function($stateParams, CurrentFinca, ORM) {
  //     //         var model = {
  //     //           ejerc: $stateParams.ejercId
  //     //         };
  //     //         return ORM.getEjercicio(model, 'partecult');
  //     //       }
  //     //     }
  //     //   })
  //     //
  //     // }
  //   ]
  // );
}());
