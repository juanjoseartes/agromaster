(function() {
  'use strict';
  angular.module('App.core.services')

  .factory('TitleService', function($document) {
    var suffix, title;
    suffix = title = " - AgroApp";

    return {
      setSuffix: function(s) {
        return suffix = s;
      },
      getSuffix: function() {
        return suffix;
      },
      setTitle: function(t) {
        if (suffix !== "") {
          title = t + suffix;
        } else {
          title = t;
        }
        return $document.prop('title', title);
      },
      getTitle: function() {
        return $document.prop('title');
      }
    };
  });
}());
