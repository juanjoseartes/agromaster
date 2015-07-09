/**
* Angular module for auth component. This component is divided to following logical components:
*
*  App.main.compras.albaran
*
* Each component has it own configuration for ui-router.
*/
(function() {
  'use strict';


  function AlbCompraController($scope, $rootScope, $state, $stateParams, $sailsSocket, $filter, AppK, CurrentFinca, HttpService, provCurso, fchCurso) {
    //Info Base
    $scope.appName = AppK.appName;
    $scope.title = 'Albaran de Compra';
    $scope.fincaName = CurrentFinca.fincaCur().fincaname;

    $scope.clearText = function(){
      $scope.searchText ='';
    };

    // Back Button
    $scope.back= function() {
      $state.go('main.camp.compras.home.alb', {ejercId: $stateParams.ejercId});
    };

    //Albaran
    $sailsSocket.subscribe('albcompra', function(message) {
      console.log('sails published a message for albaran: ' + message.verb);

      switch (message.verb) {
        case 'created':
          var model = {
            finca: CurrentFinca.fincaCur().fincaId,
            fchinic: CurrentFinca.fincaCur().ejercCurso.fchinic,
            fchfin: CurrentFinca.fincaCur().ejercCurso.fchfin
          };
          HttpService.getAll(model, 'albcompra').then(function(model) {
            $scope.albaranes = model;
          });
          break;
        case 'updated':
          var model = {
            finca: CurrentFinca.fincaCur().fincaId,
            fchinic: CurrentFinca.fincaCur().ejercCurso.fchinic,
            fchfin: CurrentFinca.fincaCur().ejercCurso.fchfin
          };
          HttpService.getAll(model, 'albcompra').then(function(modelList) {
            $scope.albaranes = modelList;
          });
          break;
        case 'addedTo':
          var model = {
            id: message.addedId
          };
          HttpService.findOne(model, 'detcompra').success(function(aLinAlb) {
            $scope.albaranes.push(aLinAlb);
          }).error(function(aLinAlb) {
            console.log('error');
          });
          break;
        case 'removedFrom':
          $scope.albaranes = $scope.albaranes.filter(function(linAlb) {
            return linAlb.id != message.removedId;
          });
        }
      });

    $sailsSocket.subscribe('proveedor', function(message) {
      console.log('sails published a message for proveedor: ' + message.verb);
      var model = {
        id: CurrentFinca.fincaCur().fincaId
      };
      switch (message.verb) {
        case 'created':
          HttpService.getAll(model, 'proveedor').then(function(model) {
            $scope.proveedores = model;
          });
          break;
        case 'updated':
          HttpService.getAll(model, 'proveedor').then(function(model) {
            $scope.proveedores = model;
          });
          break;
        case 'addedTo':
          var model = {
            id: message.addedId
          };
          HttpService.findOne(model, 'proveedor').success(function(aProv) {
            $scope.proveedores.push(aProv);
          }).error(function(aProv) {
            console.log('error');
          });
          break;
        case 'removedFrom':
          $scope.proveedores = $scope.proveedores.filter(function(proveedor) {
            return proveedor.id != message.removedId;
          });
        }
      });
  }

  angular
  .module('App')
  .controller('AlbCompraController', AlbCompraController);

})();


(function() {
  'use strict';


  function AlbListCompraController($scope, $rootScope, $state, $stateParams, $sailsSocket, $filter, AppK, CurrentFinca, HttpService, provCurso, fchCurso, albaranes) {
    //Info Base

    $scope.albaranes = albaranes;

    //Albaran
    $sailsSocket.on('albcompra', function(message) {
      console.log('sails published a message for albaran: ' + message.verb);

      switch (message.verb) {
        case 'created':
          var model = {
            finca: CurrentFinca.fincaCur().fincaId,
            fchinic: CurrentFinca.fincaCur().ejercCurso.fchinic,
            fchfin: CurrentFinca.fincaCur().ejercCurso.fchfin
          };
          HttpService.getAll(model, 'albcompra').then(function(model) {
            $scope.albaranes = model;
          });
          break;
        case 'updated':
          var model = {
            finca: CurrentFinca.fincaCur().fincaId,
            fchinic: CurrentFinca.fincaCur().ejercCurso.fchinic,
            fchfin: CurrentFinca.fincaCur().ejercCurso.fchfin
          };
          HttpService.getAll(model, 'albcompra').then(function(modelList) {
            $scope.albaranes = modelList;
          });
          break;
        case 'addedTo':
          var model = {
            id: message.addedId
          };
          HttpService.findOne(model, 'detcompra').success(function(aLinAlb) {
            $scope.albaranes.push(aLinAlb);
          }).error(function(aLinAlb) {
            console.log('error');
          });
          break;
        case 'removedFrom':
          $scope.albaranes = $scope.albaranes.filter(function(linAlb) {
            return linAlb.id != message.removedId;
          });
        }
      });

    $sailsSocket.subscribe('proveedor', function(message) {
      console.log('sails published a message for proveedor: ' + message.verb);
      var model = {
        id: CurrentFinca.fincaCur().fincaId
      };
      switch (message.verb) {
        case 'created':
          HttpService.getAll(model, 'proveedor').then(function(model) {
            $scope.proveedores = model;
          });
          break;
        case 'updated':
          HttpService.getAll(model, 'proveedor').then(function(model) {
            $scope.proveedores = model;
          });
          break;
        case 'addedTo':
          var model = {
            id: message.addedId
          };
          HttpService.findOne(model, 'proveedor').success(function(aProv) {
            $scope.proveedores.push(aProv);
          }).error(function(aProv) {
            console.log('error');
          });
          break;
        case 'removedFrom':
          $scope.proveedores = $scope.proveedores.filter(function(proveedor) {
            return proveedor.id != message.removedId;
          });
        }
      });
  }

  angular
  .module('App')
  .controller('AlbListCompraController', AlbListCompraController);

})();

(function() {
  'use strict';

function AddAlbCompraController($scope, $rootScope, $state, $stateParams, AppK, CurrentFinca, HttpService, provCurso, fchCurso) {
  //Info Base
  $scope.appName = AppK.appName;
  $scope.title = 'Añadir Albaran de Compra';
  $scope.fincaName = CurrentFinca.fincaCur().fincaname;

  // Back Button
  $scope.back= function() {
    $state.go('main.camp.compras.home.alb', {ejercId: $stateParams.ejercId});
  };
  //Albaran
  $scope.fchSel = fchCurso;
  $scope.nalb = '';
  $scope.provSel = provCurso;
  $scope.addLines = function() {
    var model = {
      proveedor: provCurso.id,
      provName: '',
      fch: fchCurso,
      nalb: $scope.nalb,
      finca: CurrentFinca.fincaCur().fincaId
    };
    //console.log('Datos Albaran: ' + model);
    HttpService.create(model, 'albcompra').then(function(data) {
      var albId = data.id;
      $state.go('main.camp.compras.alb.edit', {ejercId: $stateParams.ejercId, albId: albId});
    })
  };


}

angular
.module('App')
.controller('AddAlbCompraController', AddAlbCompraController);

})();

(function() {
  'use strict';

function EditAlbCompraController($scope, $rootScope, $state, $stateParams, $sailsSocket, AppK, CurrentFinca, HttpService, albaran, unidades, LocalService, detCompra) {
  //Info Base
  $scope.appName = AppK.appName;
  $scope.title = 'Detalle Albaran de Compra';
  $scope.fincaName = CurrentFinca.fincaCur().fincaname;
  $scope.albaran = albaran;
  $scope.detCompra = detCompra;

  $scope.sumAbono = function() {
    var abonos = detCompra.reduce(function(memo, linea) {
      if (linea.almacen == 'abonos') { // this serves as our `filter`
        return memo + (linea.cant*linea.precunit)
      }
      return memo;
    }, 0);
    return abonos;
  };
  $scope.sumFito = function() {
    var abonos = detCompra.reduce(function(memo, linea) {
      if (linea.almacen == 'fitosanitarios') { // this serves as our `filter`
        return memo + (linea.cant*linea.precunit)
      }
      return memo;
    }, 0);
    return abonos;
  };
  $scope.sumMatVeg = function() {
    var abonos = detCompra.reduce(function(memo, linea) {
      if (linea.almacen == 'material vegetal') { // this serves as our `filter`
        return memo + (linea.cant*linea.precunit)
      }
      return memo;
    }, 0);
    return abonos;
  };
  $scope.sumOtros = function() {
    var abonos = detCompra.reduce(function(memo, linea) {
      if (linea.almacen == 'otros') { // this serves as our `filter`
        return memo + (linea.cant*linea.precunit)
      }
      return memo;
    }, 0);
    return abonos;
  };


  LocalService.set('uds', JSON.stringify(unidades));
  // Back Button
  $scope.back= function() {
    $state.go('main.camp.compras.home.alb', {ejercId: $stateParams.ejercId});
  };
  $scope.save= function() {
    var model = {
      id: $stateParams.albId,
      nalb: this.albaran.nalb
    };

    HttpService.update(model, 'albcompra').then(function(err) {
      if (err) console.log(err);
    })
    $state.go('main.camp.compras.home.alb', {ejercId: $stateParams.ejercId});
  };
  $scope.delete = function() {
    var model = {
      id: this.linea.id
    };
    HttpService.delete(model, 'detcompra').then(function(err){
      if (err) console.log(err);
    });
    $state.go('main.camp.compras.edit.alb', {ejercId: $stateParams.ejercId, albId: $stateParams.albId});
  }

  //Detalle Compra
  $sailsSocket.subscribe('detcompra', function(message) {
    console.log('sails published a message for detalle compra: ' + message.verb);


    switch (message.verb) {
      // case 'created':
      //   var alb = {
      //     id: $stateParams.albId
      //   };
      //   DetCompraModel.getAll(alb).then(function(modelCreated) {
      //     $scope.detCompra = modelCreated;
      //
      //   });
      //   $scope.$apply();
      //   break;
      case 'updated':
        var model = {
          id: $stateParams.albId
        };
        HttpService.getAll(model, 'detcompra').then(function(modelList) {
          $scope.detCompra = modelList;
          $scope.sumAbono = function() {
            var abonos = modelList.reduce(function(memo, linea) {
              if (linea.almacen == 'abonos') { // this serves as our `filter`
                return memo + (linea.cant*linea.precunit)
              }
              return memo;
            }, 0);
            return abonos;
          };
        });
        break;
      case 'destroyed':
        $scope.detCompra = $scope.detCompra.filter(function(linAlb) {
          return linAlb.id != message.id;
        });
        break;
      case 'addedTo':
        var model = {
          id: message.addedId
        };
        HttpService.findOne(model, 'detcompra').success(function(aLinAlb) {
          $scope.detCompra.push(aLinAlb);
        }).error(function(aLinAlb) {
          console.log('error');
        });
        break;
      case 'removedFrom':
        $scope.detCompra = $scope.detCompra.filter(function(linAlb) {
          return linAlb.id != message.removedId;
        });
      }
    });

}

angular
.module('App')
.controller('EditAlbCompraController', EditAlbCompraController);

})();

(function() {
  'use strict';

function SelProvController($scope, $rootScope, $state, $stateParams, AppK, CurrentFinca, proveedores, LocalService) {
  //Info Base
  $scope.appName = AppK.appName;
  $scope.title = 'Busqueda Proveedores';
  $scope.fincaName = CurrentFinca.fincaCur().fincaname;
  // Back Button
  $scope.back= function() {
    $state.go('main.camp.compras.add.alb', {ejercId: $stateParams.ejercId});
  };
  //Listado de Proveedores
  $scope.proveedores = proveedores;
  //Seleccion Proveedor
  $scope.selProv = function(prov) {
    LocalService.set('AlbProveedor', JSON.stringify(prov));
    $state.go('main.camp.compras.add.alb', {ejercId: $stateParams.ejercId});
  };
}

angular
.module('App')
.controller('SelProvController', SelProvController);

})();

(function() {
  'use strict';

function SelFchController($scope, $rootScope, $state, $stateParams, $sails, AppK, CurrentFinca, LocalService, fchCurso) {
  //Info Base
  $scope.appName = AppK.appName;
  $scope.title = 'Seleccion Fecha Albaran';
  $scope.fincaName = CurrentFinca.fincaCur().fincaname;
  // Back Button
  $scope.back= function() {
    $state.go('main.camp.compras.add.alb', {ejercId: $stateParams.ejercId});
  };
  //Opciones Fecha
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
  };
  $scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  //Seleccion Proveedor
  $scope.fch = '';
  $scope.selFch = function(fch) {
    LocalService.set('FchAlb', JSON.stringify(fch));
    $state.go('main.camp.compras.add.alb', {ejercId: $stateParams.ejercId});
  };

}

angular
.module('App')
.controller('SelFchController', SelFchController);

})();

(function() {
  'use strict';

function AddProvController($scope, $rootScope, $state, $stateParams, AppK, CurrentFinca, HttpService) {
  $scope.title = 'Nuevo Proveedor';
  $scope.fincaName = CurrentFinca.fincaCur().fincaname;
  $scope.proveedor=[];
  $scope.back= function() {
    $state.go('main.camp.compras.sel.prov', {ejercId: $stateParams.ejercId});
  };
  $scope.saveProv = function() {
    var model = {
      name: this.proveedor.name,
      finca: CurrentFinca.fincaCur().fincaId,
      telef: this.proveedor.telef,
      email: this.proveedor.email,
      nif: this.proveedor.nif,
      direccion: this.proveedor.direccion
    };
    HttpService.create(model, 'proveedor').then(function(data) {
      console.log(data);
    });

    $state.go('main.camp.compras.sel.prov', {ejercId: $stateParams.ejercId});
  };
}

angular
.module('App')
.controller('AddProvController', AddProvController);

})();
