angular.module('App.core.models')

.provider('HttpService', function() {
  this.$get = function($q, _, $http, AppK) {
    return {

      // http helper since http operations are repeated
      // several times within this service.
      _httpHelper: function(verb, url, body) {
        var d = $q.defer();
        $http({
          method: verb,
          url: url,
          params: body
        })
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
        return this._httpHelper('post', AppK.appUrl+'/'+modelName, model);
      },
      // Update
      update: function(model, modelName) {
        return this._httpHelper('put', AppK.appUrl+'/'+modelName+'/' + model.id, model);
      },
      // Delete
      delete: function(model, modelName) {
        return this._httpHelper('delete', AppK.appUrl+'/'+modelName+'/' + model.id);
      },
      // destroy: function(model, modelName) {
      //   return this._sailsHelper('delete', '/'+modelName+'/' + model.id);
      // },
      // All Items
      getAll: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getAll', model);
      },
      // One Item
      findOne: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/' + model.id, model);
      },

      // Especific Methods
      // A
      addEspec: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/addEspec', model);
      },
      addProduct: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/addProduct', model);
      },
      // C
      countToday: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/countToday', model);
      },
      // F
      findDate: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/findDate', model);
      },
      findDiario: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/findDiario', model);
      },
      findEjercicio: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/findEjercicio', model);
      },
      findGetDefault: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getDefault', model);
      },
      findOne: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/findOne', model);
      },

      findText: function(text, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/search?=' + text);
      },
      findToday: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/findToday', model);
      },
      // G
      getAbonos: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getAbonos', model);
      },
      getActive: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getActive', model);
      },
      getCurso: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getCurso', model);
      },
      getEjercicio: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getEjercicio', model);
      },
      getFincaEjercs: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getFincaEjercs', model);
      },
      getFitos: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getFitos', model);
      },
      getMVeg: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getMVeg', model);
      },
      getNLineas: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getNLineas', model);
      },
      getOne: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getOne', model);
      },
      getProduct: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getProduct', model);
      },
      getToday: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getToday', model);
      },
      getTotal: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getTotal', model);
      },
      getTotalbyDate: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getTotalbyDate', model);
      },
      getWeekly: function(fincaId, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/getWeekly/' + fincaId);
      },
      // R
      removeEspec: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/removeEspec', model);
      },
      // S
      sumTotales: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/sumTotales', model);
      },
      // U
      unsubscribe: function(model, modelName) {
        return this._httpHelper('get', AppK.appUrl+'/'+modelName+'/unsubscribe', model);
      },
      upload: function(modelName) {
        return this._httpHelper('post', AppK.appUrl+'/'+modelName+'/upload');
      }

    }
  }
})
