'use strict';
angular.module('App.core.services.preResiduos', [])

.factory('PreResiduos', function(Storage, CurrentUser) {
  return {

	 gestCur: function() {
     if (Storage.get('ResGestor')) {
       return angular.fromJson(Storage.get('ResGestor'));
     } else {
       return {};
     }
   },

   fchCur: function() {
     if (Storage.get('FchRes')) {
       return angular.fromJson(Storage.get('FchRes'));
     } else {
       return {};
     }
   },

  };
});
