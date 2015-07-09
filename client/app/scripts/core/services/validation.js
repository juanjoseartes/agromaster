'use strict';
angular.module('App.core.services.validation', [])

/**
 * A simple example service that returns some data.
 */
.factory('ValidationService', function() {
  return {
    resetForm: function(form, user) {
      user.mail = "";
      user.username = "";
      user.password = "";
      user.confirmPassword = "";
      form.$setPristine();
    },

    inputValid: function(form) {
      return form.$valid && form.$dirty;
    },

    inputInvalid: function(form) {
      return form.$invalid && form.$dirty;
    },

    showError: function(form, error) {
      return form.$error[error];
    },
  };
});
