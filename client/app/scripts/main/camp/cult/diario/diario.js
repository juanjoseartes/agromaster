/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.cultivo
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';

  // Define App.main.cultivo module
  angular.module('App.main.cultivo.diario', [
    'App.main.cultivo.diario.ejercicio',
    'App.main.cultivo.diario.hoy'
    ]);


}());
