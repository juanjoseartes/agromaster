(function () {

  'use strict';

  /* @ngInject */
  function CultivoController ($scope, $rootScope, $state, $stateParams, $ionicPopover, $ionicModal, $sailsSocket, HttpService, CurrentFinca, AppK, diarios, resDia, header, navbar) {
    $scope.appName = AppK.appName;
    $scope.title = 'Diario de Cultivo';
    $scope.date = moment().format('L');
    $scope.fincaName = CurrentFinca.fincaCur().fincaname;
    $scope.errors = [];

    $rootScope.headerItem = header;
    $rootScope.navbarItems = navbar;

    $scope.createDiario = function(tipo) {
      console.log('Tipo: ' + tipo);
      var model = {
        ejerc: $stateParams.ejercId,
        finca: CurrentFinca.fincaCur().fincaId,
        tipo: tipo
      };
      HttpService.create(model, 'partecult').then(function(modelList) {
        console.log('ModelList: ' + JSON.stringify(modelList));
        //$state.go('main.camp.cult.home.hoy.diario.parcela', $stateParams.nameDia == modelList.tipoName);
      });
    };

    $scope.deleteDia = function(parte) {
      console.log('Dia: ' + parte.diarioId);
      var model = {
        id: parte.diarioId
      };
      //console.log('Model: ' + JSON.stringify(model));
      HttpService.delete(model, 'partecult').then(function(modelList) {
        $state.go('main.camp.cult.home.hoy.inic', $stateParams);
      });
    };


    $scope.diarios = diarios;

    // $ionicPopover.fromTemplateUrl('templates/popover-diarios.html', {
    //   scope: $scope,
    // }).then(function(popover) {
    //   $scope.popover = popover;
    // });
    // $scope.closePopover = function() {
    //   $scope.popover.hide();
    // };

    // var tipos = resDia.reduce(function(memo, dia) {
    //   if (dia) { // this serves as our `filter`
    //     memo.push({ // this serves as our `map`
    //       tipoId: dia.tipo.id,
    //       name: dia.tipo.name,
    //       pathname: dia.tipo.pathname
    //     });
    //   }
    //   return memo;
    // }, []);

    //$scope.tiposDia = tipos;

    var diariosDisp = resDia.reduce(function(memo, dia) {
      if (dia) { // this serves as our `filter`
        memo.push({ // this serves as our `map`
          diarioId: dia.id,
          name: dia.tipo.name,
          pathname: dia.tipo.pathname,
          mobra: dia.totalmobra,
          materiales: dia.totalmat,
          maquinaria: dia.totalmaq,
          otros: dia.totalotros,
          total: dia.totalmobra+dia.totalmat+dia.totalmaq+dia.totalotros,
          nlineas: dia.nmobra+dia.nmat+dia.nmaq+dia.notros+dia.nparc,
        });
      }
      return memo;
    }, []);

    $scope.partes = diariosDisp;

    // $ionicModal.fromTemplateUrl('my-modal.html', {
    //   scope: $scope,
    //   animation: 'slide-in-up'
    // }).then(function(modal) {
    //   $scope.modal = modal;
    // });
    // $scope.closeModal = function() {
    //   $scope.modal.hide();
    // };

    //Parte Cultivo
    $sailsSocket.subscribe('partecult', function(message) {
      console.log('sails published a message for parte cultivo: ' + message.verb);
      switch (message.verb) {
        case 'created':
          var model = {
            finca: CurrentFinca.fincaCur().fincaId,
            ejerc: $stateParams.ejercId
          };
          HttpService.getAll(model, 'tipodiario').then(function(modelList) {
            $scope.diarios = modelList;
          });
          HttpService.getToday(model, 'partecult').then(function(parteList) {
            var diariosDisp = parteList.reduce(function(memo, dia) {
              if (dia) { // this serves as our `filter`
                memo.push({ // this serves as our `map`
                  diarioId: dia.id,
                  name: dia.tipo.name,
                  pathname: dia.tipo.pathname,
                  mobra: dia.totalmobra,
                  materiales: dia.totalmat,
                  maquinaria: dia.totalmaq,
                  otros: dia.totalotros,
                  total: dia.nmobra+dia.nmat+dia.nmaq+dia.notros+dia.totalparc
                });
              }
              return memo;
            }, []);

            $scope.partes = diariosDisp;
          });
          break;
          case 'addedTo':
            var model = {
              finca: CurrentFinca.fincaCur().fincaId,
              ejerc: $stateParams.ejercId
            };
            HttpService.getAll(model, 'tipodiario').then(function(modelList) {
              $scope.diarios = modelList;
            });
            HttpService.getToday(model, 'partecult').then(function(parteList) {
              var diariosDisp = parteList.reduce(function(memo, dia) {
                if (dia) { // this serves as our `filter`
                  memo.push({ // this serves as our `map`
                    diarioId: dia.id,
                    name: dia.tipo.name,
                    pathname: dia.tipo.pathname,
                    mobra: dia.totalmobra,
                    materiales: dia.totalmat,
                    maquinaria: dia.totalmaq,
                    otros: dia.totalotros,
                    total: dia.nmobra+dia.nmat+dia.nmaq+dia.notros+dia.totalparc
                  });
                }
                return memo;
              }, []);

              $scope.partes = diariosDisp;
            });
            break;
          case 'updated':
            var model = {
              finca: CurrentFinca.fincaCur().fincaId,
              ejerc: $stateParams.ejercId
            };
            HttpService.getAll(model, 'tipodiario').then(function(modelList) {
              $scope.diarios = modelList;
            });
            HttpService.getToday(model, 'partecult').then(function(parteList) {
              var diariosDisp = parteList.reduce(function(memo, dia) {
                if (dia) { // this serves as our `filter`
                  memo.push({ // this serves as our `map`
                    diarioId: dia.id,
                    name: dia.tipo.name,
                    pathname: dia.tipo.pathname,
                    mobra: dia.totalmobra,
                    materiales: dia.totalmat,
                    maquinaria: dia.totalmaq,
                    otros: dia.totalotros,
                    total: dia.nmobra+dia.nmat+dia.nmaq+dia.notros+dia.totalparc
                  });
                }
                return memo;
              }, []);

              $scope.partes = diariosDisp;
            });
            break;
            case 'destroyed':
              var model = {
                finca: CurrentFinca.fincaCur().fincaId,
                ejerc: $stateParams.ejercId
              };
              HttpService.getAll(model, 'tipodiario').then(function(modelList) {
                $scope.diarios = modelList;
              });
              HttpService.getToday(model, 'partecult').then(function(parteList) {
                var diariosDisp = parteList.reduce(function(memo, dia) {
                  if (dia) { // this serves as our `filter`
                    memo.push({ // this serves as our `map`
                      diarioId: dia.id,
                      name: dia.tipo.name,
                      pathname: dia.tipo.pathname,
                      mobra: dia.totalmobra,
                      materiales: dia.totalmat,
                      maquinaria: dia.totalmaq,
                      otros: dia.totalotros,
                      total: dia.nmobra+dia.nmat+dia.nmaq+dia.notros+dia.totalparc
                    });
                  }
                  return memo;
                }, []);

                $scope.partes = diariosDisp;
              });
            }
          });

  }

  angular
  .module('App')
  .controller('CultivoController', CultivoController);

})();
