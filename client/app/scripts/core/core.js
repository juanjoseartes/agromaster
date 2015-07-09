/**
* Angular module for 'core' component. This component is divided to following logical components:

*/
(function() {
  'use strict';

  // Define App.core module
  angular.module('App.core', [
    'App.core.dependencies',
    'App.core.services',
    'App.core.auth',
    'App.core.components',
    'App.core.directives',
    'App.core.error',
    //'App.core.constants',
    'App.core.filters',
    'App.core.interceptors',
    //'App.core.layout',
    'App.core.libraries',
    'App.core.models',
  ]);
}());
