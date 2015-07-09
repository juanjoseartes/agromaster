(function () {

  'use strict';

  /* @ngInject */
  function ResiduosCtrl ($scope, $rootScope, $state, $stateParams, $sailsSocket, HttpService, CurrentFinca, residuos, header, navbar) {

    $scope.title = 'Gestion de Residuos';
    $scope.fincaName = CurrentFinca.fincaCur().fincaname;
    $scope.residuos = residuos;

    $rootScope.headerItem = header;
    $rootScope.navbarItems = navbar;

    $scope.delete = function(res) {
      var model = {
        id: res.id,
      };
      //console.log('Model: ' + JSON.stringify(model));
      HttpService.delete(model, 'residuos').then(function(error) {
        $state.go('^', $stateParams);
      })
    };
    $scope.deleteDoc = function(doc) {
      var model = {
        id: doc.id
      };
      HttpService.delete(model, 'docresiduos').then(function(res) {
        //$scope.analisis.informes.splice(doc.id, 1);
        $state.go('main.camp.residuos', $stateParams);
      });
    };

    //Analisis
    $sailsSocket.subscribe('residuos', function(message) {
      console.log('sails published a message for residuos: ' + message.verb);

      switch (message.verb) {
        case 'created':
          //$scope.residuos.push(message.data);
          var model = {
            ejerc: $stateParams.ejercId,
            //tipo: $stateParams.tipoName
          };
          HttpService.getAll(model, 'residuos').then(function(modelList) {
            $scope.residuos = modelList;
          });
          break;
          case 'updated':
            var model = {
              ejerc: $stateParams.ejercId,
              //tipo: $stateParams.tipoName
            };
            HttpService.getAll(model, 'residuos').then(function(modelList) {
              $scope.residuos = modelList;
            });
            break;
            case 'removedFrom':
              var model = {
                //ejerc: $stateParams.ejercId,
                tipo: $stateParams.tipoName
              };
              HttpService.getAll(model, 'residuos').then(function(modelList) {
                $scope.residuos = modelList;
              });
              break;
              case 'addedTo':
                var idx = message.id;
                $sails.get("/docresiduos/"+message.addedId).success(function (aInfo) {
                  $scope.residuos[idx].albaranes.push(aInfo);
                }).error(function (aInfo) { console.log('error');});
                // var model = {
                //   ejerc: $stateParams.ejercId,
                //   tipo: $stateParams.tipoName
                // };
                // HttpService.getAll(model, 'analisis').then(function(modelList) {
                //   $scope.analisis = modelList;
                // });
                break;
                case 'destroyed':
                  $scope.residuos = $scope.residuos.filter(function(item) {
                    return item.id != message.id;
                  });
                  // var model = {
                  //   ejerc: $stateParams.ejercId,
                  //   tipo: $stateParams.tipoName
                  // };
                  // HttpService.getAll(model, 'analisis').then(function(modelList) {
                  //   $scope.analisis = modelList;
                  // });
                }
              });
  }

  angular
  .module('App')
  .controller('ResiduosCtrl', ResiduosCtrl);

})();

(function () {

  'use strict';

  /* @ngInject */
  function ResiduosAddCtrl ($scope, $rootScope, $state, $stateParams, LocalService, HttpService, PreResiduos, CurrentFinca, residuos, gestCurso, fchCurso) {
    $scope.title = 'Nueva Retirada de Residuos';
    $scope.fchSel = fchCurso;
    $scope.gestSel = gestCurso;
    $rootScope.$on('gestselected', function() {
      $scope.gestSel = PreResiduos.gestCur();
    });
    $rootScope.$on('fechaselected', function() {
      $scope.fchSel = PreResiduos.fchCur();
    });
    $scope.save = function() {
      var model = {
        ejercicio: $stateParams.ejercId,
        gestor: this.gestSel.id,
        fecha: this.fchSel,
        tipo: this.res.tipo,
        nalbaran: this.res.nalbaran,
        obs: this.res.obs
      };
      //console.log('Model: ' + JSON.stringify(model));
      HttpService.create(model, 'residuos').then(function(error) {
        LocalService.unset('ResGestor');
        LocalService.unset('FchRes');
        $state.go('^', $stateParams);
      })
    }
    $scope.back = function() {
      LocalService.unset('ResGestor');
      LocalService.unset('FchRes');
      $state.go('^', $stateParams);
    };

  }

  angular
  .module('App')
  .controller('ResiduosAddCtrl', ResiduosAddCtrl);

})();

(function () {

  'use strict';

  /* @ngInject */
  function ResiduosEditCtrl ($scope, $rootScope, $state, $stateParams, HttpService, detResiduos) {
    $scope.title = 'Editar Residuos';
    $scope.residuo = detResiduos;
    $scope.save = function() {
      var model = {
        id: $stateParams.resId,
        nalbaran: this.residuo.nalbaran,
        tipo: this.residuo.tipo,
        obs: this.residuo.obs
      };
      //console.log('Model: ' + JSON.stringify(model));
      HttpService.update(model, 'residuos').then(function(error) {
        $state.go('^', $stateParams);
      })
    };
    $scope.back = function() {
      $state.go('^', $stateParams);
    };

  }

  angular
  .module('App')
  .controller('ResiduosEditCtrl', ResiduosEditCtrl);

})();

(function () {

  'use strict';

  /* @ngInject */
  function ResiduosUploadCtrl ($scope, $rootScope, $state, $stateParams, $timeout, AppK, HttpService) {
    $scope.title = 'Subir Documentos';
    $scope.back = function() {
      $state.go('^', $stateParams);
    };

    /**
    * @property interface
    * @type {Object}
    */
    $scope.interface = {};

    /**
    * @property uploadCount
    * @type {Number}
    */
    $scope.uploadCount = 0;

    /**
    * @property success
    * @type {Boolean}
    */
    $scope.success = false;

    /**
    * @property error
    * @type {Boolean}
    */
    $scope.error = false;
    // Listen for when the interface has been configured.
    $scope.$on('$dropletReady', function whenDropletReady() {

      $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif', 'svg', 'pdf']);
      $scope.interface.setRequestUrl(AppK.appUrl + '/residuos/'+ $stateParams.resId +'/upload');
      $scope.interface.defineHTTPSuccess([/2.{2}/]);
      $scope.interface.useArray(false);
      $scope.interface.disableXFileSize(false);

    });

    // Listen for when the files have been successfully uploaded.
    $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {

      $scope.uploadCount = files.length;
      $scope.success     = true;
      console.log(response, files);

      $timeout(function timeout() {
        $scope.success = false;
      }, 5000);

    });

    // Listen for when the files have failed to upload.
    $scope.$on('$dropletError', function onDropletError(event, response) {

      $scope.error = true;
      console.log(response);

      $timeout(function timeout() {
        $scope.error = false;
      }, 5000);

    });

  }

  angular
  .module('App')
  .controller('ResiduosUploadCtrl', ResiduosUploadCtrl);

})();

(function () {

  'use strict';

  /* @ngInject */
  function ResiduosGestCtrl ($scope, $rootScope, $state, $stateParams, LocalService, CurrentFinca, gestores) {
    $scope.title = 'Seleccione Gestor Residuos'
    $scope.gestores = gestores;
    $scope.selGest = function(gest) {
      LocalService.set('ResGestor', JSON.stringify(gest));
      $rootScope.$broadcast('gestselected');
      $state.go('main.camp.residuos.add', $stateParams);
    };

    $scope.back = function() {
      LocalService.unset('ResGestor');
      $state.go('main.camp.residuos.add');
    };

  }

  angular
  .module('App')
  .controller('ResiduosGestCtrl', ResiduosGestCtrl);

})();

(function () {

  'use strict';

  /* @ngInject */
  function ResiduosFechaCtrl ($scope, $rootScope, $state, $stateParams, LocalService) {
    $scope.title = 'Seleccione Fecha Retirada Residuos'

    $scope.selFch = function(fch) {
      LocalService.set('FchRes', JSON.stringify(fch));
      $rootScope.$broadcast('fechaselected');
      $state.go('main.camp.residuos.add', $stateParams);
    };
    $scope.back = function() {
      LocalService.unset('FchRes');
      $state.go('main.camp.residuos.add');
    };

  }

  angular
  .module('App')
  .controller('ResiduosFechaCtrl', ResiduosFechaCtrl);

})();
