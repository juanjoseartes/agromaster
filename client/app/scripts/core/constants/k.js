/**
 * Frontend application backend constant definitions. This is something that you must define
 * in your application.
 *
 * Note that 'BackendConfig.url' is configured in index.html and you _must_ change it to match
 * your backend API url.
 */
(function() {
    'use strict';

    angular.module('App')
        .constant('AppK', {
          appName: 'AgroApp',
          appUrl: 'http://localhost:1337'
        });
}());



//
// 'use strict';
//
// angular.module('constants', [])
//
//
// // .config(['$sailsProvider', function ($sailsProvider) {
// //     $sailsProvider.url = 'http://localhost:1337';
// // }])
//
// .constant('AppK', {
//
// })
//
// .constant('CSRF_TOKEN', function($http, AppK) {
//
// })
//
// .constant('angularMomentConfig', {
//     preprocess: 'unix', // optional
//     timezone: 'Europe/London' // optional
// })
//
// // .constant('WUNDERGROUND_API_KEY', '1cc2d3de40fa5af0')
// // .constant('FORECASTIO_KEY', '4cd3c5673825a361eb5ce108103ee84a')
// // .constant('FLICKR_API_KEY', '504fd7414f6275eb5b657ddbfba80a2c')
// .filter('int', function() {
//   return function(v) {
//     return parseInt(v) || '';
//   };
// });
