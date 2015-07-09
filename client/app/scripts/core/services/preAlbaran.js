// 'use strict';
// angular.module('App.core.services')
//
// .factory('PreAlbaran', function($localStorage, CurrentUser) {
//   return {
//
// 	 provCur: function() {
//      if ($localStorage.get('AlbProveedor')) {
//        return angular.fromJson($localStorage.get('AlbProveedor'));
//      } else {
//        return {};
//      }
//    },
//
//    fchCur: function() {
//      if ($localStorage.get('FchAlb')) {
//        return angular.fromJson($localStorage.get('FchAlb'));
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

  .factory('PreAlbaran', ['$localStorage', function($localStorage) {
    return {

      provCur: function proveedor() {
        return $localStorage.albaran ? $localStorage.albaran.proveedor : {};
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
        return $localStorage.albaran ? $localStorage.albaran.fecha : {};

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
