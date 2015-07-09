(function () {

  'use strict';

  /* @ngInject */
  function AnalisisController ($scope, $rootScope, $state, $stateParams, CurrentFinca, header, navbar) {

    $scope.title = 'Analisis';
    $scope.fincaName = CurrentFinca.fincaCur().fincaname;

    $rootScope.headerItem = header;
    $rootScope.navbarItems = navbar;

  }

  angular
  .module('App')
  .controller('AnalisisController', AnalisisController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function AnalisisTipoController ($scope, $rootScope, $state, $stateParams, $sailsSocket, HttpService, CurrentFinca, analisis) {

    $scope.analisis = analisis;
    $scope.delete = function(ana) {
      var model = {
        id: ana.id,
      };
      //console.log('Model: ' + JSON.stringify(model));
      HttpService.delete(model, 'analisis').then(function(error) {
        $state.go('^', $stateParams);
      })
    };
    $scope.deleteDoc = function(doc) {
      var model = {
        id: doc.id
      };
      HttpService.delete(model, 'infolab').then(function(res) {
        //$scope.analisis.informes.splice(doc.id, 1);
        $state.go('main.camp.analisis.tipo', $stateParams);
      });
    };

    //Analisis
    $sailsSocket.subscribe('analisis', function(message) {
      console.log('sails published a message for parte cultivo: ' + message.verb);

      switch (message.verb) {
        case 'created':
          $scope.analisis.push(message.data);
          // var model = {
          //   ejerc: $stateParams.ejercId,
          //   tipo: $stateParams.tipoName
          // };
          // HttpService.getAll(model, 'analisis').then(function(modelList) {
          //   $scope.analisis = modelList;
          // });
          break;
          case 'updated':
            var model = {
              ejerc: $stateParams.ejercId,
              tipo: $stateParams.tipoName
            };
            HttpService.getAll(model, 'analisis').then(function(modelList) {
              $scope.analisis = modelList;
            });
            break;
            case 'removedFrom':
              var model = {
                ejerc: $stateParams.ejercId,
                tipo: $stateParams.tipoName
              };
              HttpService.getAll(model, 'analisis').then(function(modelList) {
                $scope.analisis = modelList;
              });
              break;
            case 'addedTo':
              var idx = message.id;
              $sails.get("/infolab/"+message.addedId).success(function (aInfo) {
                $scope.analisis[idx].informes.push(aInfo);
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
              $scope.analisis = $scope.analisis.filter(function(item) {
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
  .controller('AnalisisTipoController', AnalisisTipoController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function AnalisisAddController ($scope, $rootScope, $state, $stateParams, HttpService, PreAnalisis, CurrentFinca, analisis, labCurso, fchCurso) {
    $scope.title = 'Nuevo Analisis';
    $scope.fchSel = fchCurso;
    $scope.labSel = labCurso;
    $rootScope.$on('labselected', function() {
      $scope.labSel = PreAnalisis.labCur();
    });
    $rootScope.$on('fechaselected', function() {
      $scope.fchSel = PreAnalisis.fchCur();
    });
    $scope.save = function() {
      var model = {
        ejercicio: $stateParams.ejercId,
        tipo: $stateParams.tipoName,
        laboratorio: this.labSel.id,
        fecha: this.fchSel,
        nref: this.ana.nref,
        muestra: this.ana.muestra,
        motivo: this.ana.motivo
      };
      //console.log('Model: ' + JSON.stringify(model));
      HttpService.create(model, 'analisis').then(function(error) {
        delete $localStorage.analisis.laboratorio;
        delete $localStorage.analisis.fecha;
        //LocalService.unset('AnaLaboratorio');
        //LocalService.unset('FchAna');
        $state.go('^', $stateParams);
      })
    }
    $scope.back = function() {
      delete $localStorage.analisis.laboratorio;
      delete $localStorage.analisis.fecha;
      //LocalService.unset('AnaLaboratorio');
      //LocalService.unset('FchAna');
      $state.go('^', $stateParams);
    };

  }

  angular
  .module('App')
  .controller('AnalisisAddController', AnalisisAddController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function AnalisisEditController ($scope, $rootScope, $state, $stateParams, HttpService, detAnalisis) {
    $scope.title = 'Editar Analisis';
    $scope.analisis = detAnalisis;
    $scope.save = function() {
      var model = {
        id: $stateParams.anaId,
        nref: this.analisis.nref,
        muestra: this.analisis.muestra,
        motivo: this.analisis.motivo
      };
      //console.log('Model: ' + JSON.stringify(model));
      HttpService.update(model, 'analisis').then(function(error) {
        $state.go('^', $stateParams);
      })
    };
    $scope.back = function() {
      $state.go('^', $stateParams);
    };

  }

  angular
  .module('App')
  .controller('AnalisisEditController', AnalisisEditController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function AnalisisUploadController ($scope, $rootScope, $state, $stateParams, $timeout, AppK, HttpService) {
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
      $scope.interface.setRequestUrl(AppK.appUrl + '/analisis/'+ $stateParams.anaId +'/upload');
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
  .controller('AnalisisUploadController', AnalisisUploadController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function AnalisisLabController ($scope, $rootScope, $state, $stateParams, CurrentFinca, laboratorios) {
    $scope.title = 'Seleccione Laboratorio'
    $scope.laboratorios = laboratorios;
    $scope.selLab = function(lab) {
      $localStorage.analisis.laboratorio = JSON.stringify(lab);
      //LocalService.set('AnaLaboratorio', JSON.stringify(lab));
      $rootScope.$broadcast('labselected');
      $state.go('main.camp.analisis.tipo.add', $stateParams);
    };

    $scope.back = function() {
      delete $localStorage.analisis.laboratorio;
      //LocalService.unset('AnaLaboratorio');
      $state.go('main.camp.analisis.tipo.add');
    };

  }

  angular
  .module('App')
  .controller('AnalisisLabController', AnalisisLabController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function AnalisisFechaController ($scope, $rootScope, $state, $stateParams, LocalService) {
    $scope.title = 'Seleccione Laboratorio'

    $scope.selFch = function(fch) {
      $localStorage.analisis.fecha = JSON.stringify(fch);
      //LocalService.set('FchAna', JSON.stringify(fch));
      $rootScope.$broadcast('fechaselected');
      $state.go('main.camp.analisis.tipo.add', $stateParams);
    };
    $scope.back = function() {
      LocalService.unset('FchAna');
      $state.go('main.camp.analisis.tipo.add');
    };

  }

  angular
  .module('App')
  .controller('AnalisisFechaController', AnalisisFechaController);

})();
