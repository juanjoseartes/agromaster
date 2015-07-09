'use strict';
angular.module('App.core.services.preEjercicio', [])

.factory('PreEjercicio', function(Storage) {
  return {

	 cultCur: function() {
     if (Storage.get('CultEjercicio')) {
       return angular.fromJson(Storage.get('CultEjercicio'));
     } else {
       return {};
     }
   },

   fchInic: function() {
     if (Storage.get('FchInic')) {
       return angular.fromJson(Storage.get('FchInic'));
     } else {
       return {};
     }
   },

   fchFin: function() {
     if (Storage.get('FchFin')) {
       return angular.fromJson(Storage.get('FchFin'));
     } else {
       return {};
     }
   },

  };
});
