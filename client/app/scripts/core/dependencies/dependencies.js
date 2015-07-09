/**
* Generic models angular module initialize. This module contains all 3rd party dependencies that application needs to
* actually work.
*/
(function() {
  'use strict';

  angular.module('App.core.dependencies', [
    'ionic',
    'nvd3ChartDirectives',
    'angular-loading-bar',
    'ngAnimate',
    'ngSanitize',
    'ngStorage',
    'ui.router',
    'angularMoment',
    'toastr',
    'sails.io',
    'smart-table',
    'angular.filter',
    'checklist-model'
  ]);
}());
