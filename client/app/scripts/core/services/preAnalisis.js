// 'use strict';
// angular.module('App.core.services.preAnalisis', [])
//
// .factory('PreAnalisis', function(Storage, CurrentUser) {
//   return {
//
// 	 labCur: function() {
//      if (Storage.get('AnaLaboratorio')) {
//        return angular.fromJson(Storage.get('AnaLaboratorio'));
//      } else {
//        return {};
//      }
//    },
//
//    fchCur: function() {
//      if (Storage.get('FchAna')) {
//        return angular.fromJson(Storage.get('FchAna'));
//      } else {
//        return {};
//      }
//    },
//
//   };
// });

(function() {
  'use strict';

  angular.module('App.core.services')

  .factory('PreAnalisis', ['$localStorage', function($localStorage) {
    return {

      labCur: function laboratorio() {
        return $localStorage.analisis ? $localStorage.analisis.laboratorio : {};
        // var data = $localStorage.get('AlbProveedor');
        // if (data) {
        //   return angular.fromJson(data).user;
        // } else {
        //   return {};
        // }
        // if ($localStorage.get('AlbProveedor')) {
        //   return angular.fromJson($localStorage.get('AlbProveedor'));
        // } else {
        //   return {};
        // }
      },

      fchCur: function fecha() {
        return $localStorage.analisis ? $localStorage.analisis.fecha : {};

        // var data = $localStorage.get('FchAlb');
        //
        // if (data) {
        //   return angular.fromJson(data).user;
        // } else {
        //   return {};
        // }

        // if ($localStorage.get('FchAlb')) {
        //   return angular.fromJson($localStorage.get('FchAlb'));
        // } else {
        //   return {};
        // }
      },

    };
  }
]);
}());
