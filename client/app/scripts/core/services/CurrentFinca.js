(function() {
  'use strict';

  angular.module('App.core.services')

  .factory('CurrentFinca', ['$localStorage', function($localStorage) {
    return {

      fincaCur: function finca() {

        return $localStorage.fincaEjercs ? $localStorage.fincaEjercs.data : {};

        // if ($localStorage('fincaEjercs')) {
        //   return angular.fromJson($localStorage('fincaEjercs')).data;
        // } else {
        //   return {};
        // }
      },

      parcCur: function parcela() {

        return $localStorage.fincaEjercs ? $localStorage.fincaEjercs.data.parcelas[0].id : {};

      },

      // fincaCur: function() {
      //   if ($localStorage('fincaEjercs')) {
      //     return angular.fromJson($localStorage('fincaEjercs')).data;
      //   } else {
      //     return {};
      //   }
      // },

      ejercCur: function() {
        if ($localStorage.get('ejercCur')) {
          return angular.fromJson($localStorage.get('ejercCur')).ejercicio;
        } else {
          return {};
        }
      },

      udSel: function() {
        if ($localStorage.get('uds')) {
          return angular.fromJson($localStorage.get('uds'));
        } else {
          return {};
        }
      },

    };
  }
]);
}());
