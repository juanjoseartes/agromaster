(function() {
  'use strict';

angular.module('App.core.models.orm', ['ngSails'])

.provider('ORM', function() {
  this.$get = function($q, _, $http, $sails) {
    return {
      // socket helper since socket operations are repeated
      // several times within this service.
      _sailsHelper: function(verb, url, body) {
        var d = $q.defer();
        $sails[verb](url, body)
        .success(function(data, status, headers, config) {
          d.resolve(data);
        })
        .error(function(data, status, headers, config) {
          d.reject(data, status);
        });
        return d.promise;
      },

      // http helper since http operations are repeated
      // several times within this service.
      _httpHelper: function(verb, url, body) {
        var d = $q.defer();
        $http[verb](url, body)
        .success(function(data, status, headers, config) {
          d.resolve(data);
        })
        .error(function(data, status, headers, config) {
          d.reject(data, status);
        });
        return d.promise;
      },

      // Create
      create: function(model, modelName) {
        return this._sailsHelper('post', '/'+modelName, model);
      },
      // Update
      update: function(model, modelName) {
        return this._sailsHelper('put', '/'+modelName+'/' + model.id, model);
      },
      // Delete
      delete: function(model, modelName) {
        return this._sailsHelper('delete', '/'+modelName+'/' + model.id);
      },
      // destroy: function(model, modelName) {
      //   return this._sailsHelper('delete', '/'+modelName+'/' + model.id);
      // },
      // All Items
      getAll: function(model, modelName) {
        return this._httpHelper('get', $sails.url+'/'+modelName+'/getAll', model);
        console.log(this._httpHelper('get', $sails.url+'/'+modelName+'/getAll', model));
      },
      // One Item
      findOne: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/' + model.id, model);
      },

      // Especific Methods
      // A
      addEspec: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/addEspec', model);
      },
      addProduct: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/addProduct', model);
      },
      // C
      countToday: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/countToday', model);
      },
      // F
      findDate: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/findDate', model);
      },
      findDiario: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/findDiario', model);
      },
      findEjercicio: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/findEjercicio', model);
      },
      findGetDefault: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/getDefault', model);
      },
      // findOne: function(model, modelName) {
      //   return this._sailsHelper('get', '/'+modelName+'/findOne', model);
      // },
      findText: function(text, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/search?=' + text);
      },
      findToday: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/findToday', model);
      },
      // G
      getAbonos: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/getAbonos', model);
      },
      getActive: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/getActive', model);
      },
      getCurso: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/getCurso', model);
      },
      getEjercicio: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/getEjercicio', model);
      },
      getFincaEjercs: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/getFincaEjercs', model);
      },
      getFitos: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/getFitos', model);
      },
      getMVeg: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/getMVeg', model);
      },
      getNLineas: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/getNLineas', model);
      },
      getProduct: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/getProduct', model);
      },
      getToday: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/getToday', model);
      },
      getTotal: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/getTotal', model);
      },
      getTotalbyDate: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/getTotalbyDate', model);
      },
      getWeekly: function(fincaId, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/getWeekly/' + fincaId);
      },
      // R
      removeEspec: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/removeEspec', model);
      },
      // S
      sumTotales: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/sumTotales', model);
      },
      // U
      unsubscribe: function(model, modelName) {
        return this._sailsHelper('get', '/'+modelName+'/unsubscribe', model);
      },
      upload: function(modelName) {
        return this._httpHelper('post', '/'+modelName+'/upload');
      }

    }
  }
})

}());
