(function () {

  'use strict';

  /* @ngInject */


  function MaqController($scope, $rootScope, $state, $stateParams, AppK, header, navbar) {
    $scope.appName = AppK.appName;
    $scope.urlImg = AppK.appUrl;
    $scope.title = 'Maquinaria';

    $rootScope.headerItem = header;
    $rootScope.navbarItems = navbar;


  }

  angular
  .module('App')
  .controller('MaqController', MaqController);

})();


(function () {

  'use strict';

  /* @ngInject */
  function MaqPropController($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentFinca, HttpService, maquinaria) {

    $scope.fincaName = CurrentFinca.fincaCur().fincaname;
    $scope.maquinaria = maquinaria;

    //Maquinaria
    $sailsSocket.subscribe('maquinaria', function(message) {
      console.log('sails published a message for maquinaria: ' + message.verb);

      switch (message.verb) {
        case 'created':
          var model = {
            id: CurrentFinca.fincaCur().fincaId,
            propiedad: 'propiedad'
          };
          HttpService.getAll(model, 'maquinaria').then(function(modelList) {
            $scope.maquinaria = modelList;
          });
          break;
          case 'updated':
            var model = {
              id: CurrentFinca.fincaCur().fincaId,
              propiedad: 'propiedad'
            };
            HttpService.getAll(model, 'maquinaria').then(function(modelList) {
              $scope.maquinaria = modelList;
            });
          }
        });

  }

  angular
  .module('App')
  .controller('MaqPropController', MaqPropController);

})();

(function () {

  'use strict';

  /* @ngInject */
  function MaqAlqController($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentFinca, HttpService, maquinaria) {

    $scope.fincaName = CurrentFinca.fincaCur().fincaname;
    $scope.maquinaria = maquinaria;

    //Maquinaria
    $sailsSocket.subscribe('maquinaria', function(message) {
      console.log('sails published a message for maquinaria: ' + message.verb);

      switch (message.verb) {
        case 'created':
          var model = {
            id: CurrentFinca.fincaCur().fincaId,
            propiedad: 'alquiler'
          };
          HttpService.getAll(model, 'maquinaria').then(function(modelList) {
            $scope.maquinaria = modelList;
          });
          break;
          case 'updated':
            var model = {
              id: CurrentFinca.fincaCur().fincaId,
              propiedad: 'alquiler'
            };
            HttpService.getAll(model, 'maquinaria').then(function(modelList) {
              $scope.maquinaria = modelList;
            });
          }
        });

  }

  angular
  .module('App')
  .controller('MaqAlqController', MaqAlqController);

})();


(function () {

  'use strict';

  /* @ngInject */

  function EditMaqController($scope, $rootScope, $state, $stateParams, $timeout, CurrentFinca, AppK, maquinaria, HttpService, tipomaquinas) {

    $scope.maquinaria = maquinaria;
    $scope.tipomaquinas = tipomaquinas;

    for (var i = 0; i < $scope.tipomaquinas.length; i++) {
      if ($scope.tipomaquinas[i].id == $scope.maquinaria.tipomaq.id) {
        $scope.maquinaria.tipomaq = $scope.tipomaquinas[i];
        break;
      }
    };
    $scope.title = 'Edicion Maquinaria';
    $scope.back = function(){
      if (maquinaria.propiedad === 'propiedad') {
        $state.go('main.camp.maq.prop', {ejercId: $stateParams.ejercId});
      } else {
        $state.go('main.camp.maq.alq', {ejercId: $stateParams.ejercId});
      }
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

      $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif', 'svg']);
      $scope.interface.setRequestUrl(AppK.appUrl + '/maquinaria/'+ $stateParams.maqId +'/upload');
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


    $scope.save = function(maquinaria){
      var model = {
        id: $stateParams.maqId,
        marca: this.maquinaria.marca,
        modelo: this.maquinaria.modelo,
        tipomaq: this.maquinaria.tipomaq.id,
        grupomaq: this.maquinaria.tipomaq.grupo,
        matricula: this.maquinaria.matricula,
        potencia: this.maquinaria.potencia,
        capfuel: this.maquinaria.capfuel,
        year: this.maquinaria.year,
        vida: this.maquinaria.vida,
        valor: this.maquinaria.valor,
        notas: this.maquinaria.notas
      };
      //console.log("Datos Save: " + JSON.stringify(model));
      HttpService.update(model, 'maquinaria').then(function(res) {
        if (res[0].propiedad === 'propiedad') {
          $state.go('main.camp.maq.prop', {ejercId: $stateParams.ejercId});
        } else {
          $state.go('main.camp.maq.alq', {ejercId: $stateParams.ejercId});
        }

      });
    };

  }

  angular
  .module('App')
  .controller('EditMaqController', EditMaqController);

})();


(function () {

  'use strict';

  /* @ngInject */

  function AddMaqController($scope, $rootScope, $state, $stateParams, CurrentFinca, HttpService, tipomaquinas) {

    $scope.title = 'Alta Maquinaria';
    $scope.back = function(){
      $state.go('main.camp.maq.prop', {ejercId: $stateParams.ejercId});
    };

    $scope.maquinaria = '';

    $scope.tipomaquinas = tipomaquinas;

    $scope.saveProp = function(){
      var model = {
        marca: this.maquinaria.marca,
        modelo: this.maquinaria.modelo,
        finca: CurrentFinca.fincaCur().fincaId,
        tipomaq: this.maquinaria.tipomaq.id,
        grupomaq: this.maquinaria.tipomaq.grupo.id,
        matricula: this.maquinaria.matricula,
        potencia: this.maquinaria.potencia,
        capfuel: this.maquinaria.capfuel,
        year: this.maquinaria.year,
        valor: this.maquinaria.valor,
        propiedad: 'propiedad',
        notas: this.maquinaria.notas
      };
      //console.log('Model: ' + JSON.stringify(model));
      HttpService.create(model, 'maquinaria').then(function(maqNew) {
        // $rootScope.$emit('editUser', diaNew);
        $state.go('main.camp.maq.prop', {ejercId: $stateParams.ejercId});
      });


    };

  }

  angular
  .module('App')
  .controller('AddMaqController', AddMaqController);

})();

(function () {

  'use strict';

  /* @ngInject */


  function AddMaqAlqController($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentFinca, HttpService, proveedores, proveedor, tipomaquinas) {

    $scope.title = 'Alta Maquinaria';
    $scope.back = function(){
      $state.go('main.camp.maq.alq', {ejercId: $stateParams.ejercId});
    };
    $scope.backProveed = function(){
      $state.go('main.camp.maq.add.alq1', {ejercId: $stateParams.ejercId});
    };

    $scope.proveed = proveedores;
    $scope.maquinaria = '';
    $scope.tipomaquinas = tipomaquinas;
    $scope.proveedor = proveedor;

    //Proveedores
    $sailsSocket.subscribe('proveedor', function(message) {
      console.log('sails published a message for proveedor: ' + message.verb);

      switch (message.verb) {
        case 'created':
          var model = {
            finca: CurrentFinca.fincaCur().fincaId
          };
          HttpService.getAll(model, 'proveedor').then(function(modelList) {
            $scope.proveed = modelList;
          });
        }
      });

    $scope.save = function(){
      var model = {
        marca: this.maquinaria.marca,
        modelo: this.maquinaria.modelo,
        finca: CurrentFinca.fincaCur().fincaId,
        tipomaq: this.maquinaria.tipomaq.id,
        grupomaq: this.maquinaria.tipomaq.grupo,
        matricula: this.maquinaria.matricula,
        potencia: this.maquinaria.potencia,
        proveedor: $stateParams.provId,
        propiedad: 'alquiler',
        notas: this.maquinaria.notas
      };
      HttpService.create(model, 'maquinaria').then(function(maqNew) {
        // $rootScope.$emit('editUser', diaNew);
        $state.go('main.camp.maq.alq', {ejercId: $stateParams.ejercId});
      });


    };

  }

  angular
  .module('App')
  .controller('AddMaqAlqController', AddMaqAlqController);

})();


(function () {

  'use strict';

  /* @ngInject */


  function AddProvMaqAlqController($scope, $rootScope, $state, $stateParams, CurrentFinca, HttpService) {

    $scope.title = 'Alta Maquinaria';
    $scope.back = function(){
      $state.go('main.camp.maq.add.alq1', {ejercId: $stateParams.ejercId});
    };

    $scope.proveedor = '';

    $scope.save = function(){
      var model = {
        name: this.proveedor.name,
        direccion: this.proveedor.direccion,
        email: this.proveedor.email,
        telef: this.proveedor.telef,
        nif: this.proveedor.nif,
        fincas: CurrentFinca.fincaCur().fincaId
      };
      HttpService.create(model, 'proveedor').then(function(maqNew) {
        // $rootScope.$emit('editUser', diaNew);
        $state.go('main.camp.maq.add.alq1', {ejercId: $stateParams.ejercId});
      });


    };

  }

  angular
  .module('App')
  .controller('AddProvMaqAlqController', AddProvMaqAlqController);

})();
