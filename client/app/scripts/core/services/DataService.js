/**
* Generic data service to interact with Sails.js backend. This will just
* wrap $sailsSocket methods to a single service, that is used from application.
*
* This is needed because we need to make some common url handling for sails
* endpoint.
*/
(function() {
  'use strict';
  angular.module('App.core.services')
  .factory('DataService', [
    '$sailsSocket',
    '_',
    'BackendConfig',
    function factory(
      $sailsSocket,
      _,
      BackendConfig
    ) {
      /**
      * Helper function to get "proper" end point url for sails backend API.
      *
      * @param {string} endPoint Name of the end point
      * @param {number} [identifier] Identifier of endpoint object
      *
      * @returns {string}
      * @private
      */
      function _parseEndPointUrl(endPoint, identifier) {
        if (!_.isUndefined(identifier)) {
          endPoint = endPoint + '/' + identifier;
        }
        return BackendConfig.url + '/' + endPoint;
      }
      /**
      * Helper function to parse used parameters in 'get' and 'count' methods.
      *
      * @param {{}} parameters Used query parameters
      *
      * @returns {{params: {}}}
      * @private
      */
      function _parseParameters(parameters) {
        parameters = parameters || {};
        return {params: parameters};
      }
      return {
        /**
        * Service method to get count of certain end point objects.
        *
        * @param {string} endPoint Name of the end point
        * @param {{}} parameters Used query parameters
        *
        * @returns {Promise|*}
        */
        count: function count(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint) + '/count/', _parseParameters(parameters));
        },
        /**
        * Service method to get data from certain end point. This will always return a collection
        * of data.
        *
        * @param {string} endPoint Name of the end point
        * @param {{}} parameters Used query parameters
        *
        * @returns {Promise|*}
        */
        collection: function collection(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint), _parseParameters(parameters));
        },

        change: function change(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint) + '/change', _parseParameters(parameters));
        },

        getAll: function getAll(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint) + '/getAll', _parseParameters(parameters));
        },
        getOne: function getOne(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint) + '/getOne', _parseParameters(parameters));
        },

        getAvailable: function getAvailable(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint) + '/getAvailable', _parseParameters(parameters));
        },

        getPeriod: function getPeriod(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint) + '/getPeriod', _parseParameters(parameters));
        },

        getEjercicio: function getEjercicio(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint) + '/getEjercicio', _parseParameters(parameters));
        },

        getActive: function getActive(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint) + '/getActive', _parseParameters(parameters));
        },

        getToday: function getToday(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint) + '/getToday', _parseParameters(parameters));
        },

        getTotalbyDate: function getTotalbyDate(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint) + '/getTotalbyDate', _parseParameters(parameters));
        },

        findToday: function findToday(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint) + '/findToday', _parseParameters(parameters));
        },

        findDay: function findDay(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint) + '/findDay', _parseParameters(parameters));
        },

        findEjercicio: function findEjercicio(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint) + '/findEjercicio', _parseParameters(parameters));
        },

        findOne: function findOne(endPoint, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint) + '/findOne', _parseParameters(parameters));
        },
        /**
        * Service method to get data from certain end point. This will return just a one
        * record as an object.
        *
        * @param {string} endPoint Name of the end point
        * @param {number} identifier Identifier of endpoint object
        * @param {{}} parameters Used query parameters
        *
        * @returns {Promise|*}
        */
        fetch: function fetch(endPoint, identifier, parameters) {
          return $sailsSocket
          .get(_parseEndPointUrl(endPoint, identifier), _parseParameters(parameters));
        },
        /**
        * Service method to create new object to specified end point.
        *
        * @param {string} endPoint Name of the end point
        * @param {{}} data Data to update
        *
        * @returns {Promise|*}
        */
        create: function create(endPoint, data) {
          return $sailsSocket
          .post(_parseEndPointUrl(endPoint), data);
        },
        /**
        * Service method to update specified end point object.
        *
        * @param {string} endPoint Name of the end point
        * @param {number} identifier Identifier of endpoint object
        * @param {{}} data Data to update
        *
        * @returns {Promise|*}
        */
        update: function update(endPoint, identifier, data) {
          return $sailsSocket
          .put(_parseEndPointUrl(endPoint, identifier), data);
        },
        /**
        * Service method to delete specified object.
        *
        * @param {string} endPoint Name of the end point
        * @param {number} identifier Identifier of endpoint object
        *
        * @returns {Promise|*}
        */
        delete: function remove(endPoint, identifier) {
          return $sailsSocket
          .delete(_parseEndPointUrl(endPoint, identifier));
        }
      };
    }
  ])
  ;
}());
