(function () {

  'use strict';

  /* @ngInject */
  function CultDiaHoyController ($scope, $rootScope, $state, $stateParams, $sailsSocket, $ionicPopover, $ionicModal, resDia, CurrentFinca, AppK, HttpService, diarios) {
    $scope.title = 'Diario de Cultivo';
    $scope.resDia = resDia;

    // $ionicModal.fromTemplateUrl('my-modal.html', {
    //   scope: $scope,
    //   animation: 'slide-in-up'
    // }).then(function(modal) {
    //   $scope.modal = modal;
    // });
    // $scope.closeModal = function() {
    //   $scope.modal.hide();
    // };
    // var tipos = resDia.reduce(function(memo, dia) {
    //   if (dia) { // this serves as our `filter`
    //     memo.push({ // this serves as our `map`
    //       tipoId: dia.tipo.id,
    //       name: dia.tipo.name,
    //       pathname: dia.tipo.pathname,
    //       total: dia.totalmobra+dia.totalmat+dia.totalmaq+dia.totalotros
    //     });
    //   }
    //   return memo;
    // }, []);
    //
    // $scope.tiposDia = tipos;
    //
    // var diarios = resDia.reduce(function(memo, dia) {
    //   if (dia) { // this serves as our `filter`
    //     memo.push({ // this serves as our `map`
    //       diarioId: dia.id,
    //       name: dia.tipo.name,
    //       pathname: dia.tipo.pathname,
    //       mobra: dia.totalmobra,
    //       materiales: dia.totalmat,
    //       maquinaria: dia.totalmaq,
    //       otros: dia.totalotros,
    //       total: dia.nmobra+dia.nmat+dia.nmaq+dia.notros+dia.totalparc
    //     });
    //   }
    //   return memo;
    // }, []);

    $scope.diarios = diarios;

    $scope.deleteDia = function(dia) {
      console.log('Dia: ' + dia.diarioId);
      var model = {
        id: dia.diarioId
      };
      //console.log('Model: ' + JSON.stringify(model));
      HttpService.delete(model, 'partecult').then(function(modelList) {
        $state.go('main.camp.cult.home.hoy.inic', $stateParams);
      });
    };

    // $ionicPopover.fromTemplateUrl('templates/popover.html', {
    //   scope: $scope,
    // }).then(function(popover) {
    //   $scope.popover = popover;
    // });
    // $scope.closePopover = function() {
    //   $scope.popover.hide();
    // };
    var abonado = resDia.filter(function (el) {
      return el.tipo.name == 'Abonado';
    });
    $scope.getHoyAbon = function(){
      var sum = abonado.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    var tuneles = resDia.filter(function (el) {
      return el.tipo.name == 'Tuneles';
    });
    $scope.getHoyLimp = function(){
      var sum = tuneles.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    var entutorado = resDia.filter(function (el) {
      return el.tipo.name == 'Entutorado';
    });
    $scope.getHoyMant = function(){
      var sum = entutorado.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    var plantacion = resDia.filter(function (el) {
      return el.tipo.name == 'Plantacion';
    });
    $scope.getHoyPlant = function(){
      var sum = plantacion.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    var poda = resDia.filter(function (el) {
      return el.tipo.name == 'Poda';
    });
    $scope.getHoyPoda = function(){
      var sum = poda.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    var riego = resDia.filter(function (el) {
      return el.tipo.name == 'Riego';
    });
    $scope.getHoyRiego = function(){
      var sum = riego.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    var suelo = resDia.filter(function (el) {
      return el.tipo.name == 'Suelo';
    });
    $scope.getHoySuelo = function(){
      var sum = suelo.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    var tratamientos = resDia.filter(function (el) {
      return el.tipo.name == 'Tratamientos';
    });
    $scope.getHoyTrat = function(){
      var sum = tratamientos.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    //Pie totales
    var pieHoy = function() {
      var sumAbon = abonado.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      var totalAbon = {key: 'Abonado', y: sumAbon};

      var sumLimp = tuneles.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      var totalLimp = {key: 'Tuneles', y: sumLimp};

      var sumMant = entutorado.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      var totalMant = {key: 'Entutorado', y: sumMant};

      var sumPlant = plantacion.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      var totalPlant = {key: 'Plantacion', y: sumPlant};

      var sumPoda = poda.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      var totalPoda = {key: 'Poda', y: sumPoda};

      var sumRiego = riego.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      var totalRiego = {key: 'Riego', y: sumRiego};

      var sumSuelo = suelo.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      var totalSuelo = {key: 'Suelo', y: sumSuelo};

      var sumTrat = tratamientos.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      var totalTrat = {key: 'Tratamientos', y: sumTrat};

      var chartOutputData = [totalAbon, totalLimp, totalMant, totalPlant, totalPoda, totalRiego, totalSuelo, totalTrat];
      return chartOutputData;
    };
    $scope.pHoy =  pieHoy;

    //CONFIG graficos
    $scope.xFunction = function(){
      return function(d) {
        return d.key;
      };
    };
    $scope.yFunction = function(){
      return function(d){
        return d.y;
      };
    };
    $scope.xAxisTickFHttpServiceat = function(){
      return function(d){
        // return d3.time.fHttpServiceat('%X')(new Date(d)); //uncomment for time fHttpServiceat
        return d3.time.fHttpServiceat('%d/%m/%Y')(new Date(d)); //uncomment for date fHttpServiceat
      }
    };
    $scope.yAxisTickFHttpServiceat = function(){
      return function(d){
        return d3.fHttpServiceat(',.2f')(d);
      }
    };
    $scope.toolTipContentFunction = function(){
      return function(key, x, y, e, graph) {
        return  'Tooltip' +
        '<h2>' + key + '</h2>' +
        '<p>' +  y + ' at ' + x + '</p>'
      }
    };
    $scope.toolTipPie = function(){
      return function(key, x, y, e, graph) {
        return  '<h3>'+key+'</h3>' +
        '<b>Total: '+x+'€</b>'
      }
    };
    //Parcelas
    // $sailsSocket.subscribe('partecult', function(message) {
    //   console.log('sails published a message for parte cultivo: ' + message.verb);
    //
    //   switch (message.verb) {
    //     case 'created':
    //       var model = {
    //         ejerc: $stateParams.ejercId,
    //         finca: CurrentFinca.fincaCur().fincaId,
    //         tipo: $stateParams.nameDia
    //       };
    //       HttpService.getToday(model, 'partecult').then(function(modelList) {
    //         $scope.resDia = modelList;
    //         var tipos = modelList.reduce(function(memo, dia) {
    //           if (dia) { // this serves as our `filter`
    //             memo.push({ // this serves as our `map`
    //               tipoId: dia.tipo.id,
    //               name: dia.tipo.name,
    //               pathname: dia.tipo.pathname
    //             });
    //           }
    //           return memo;
    //         }, []);
    //
    //         $scope.tiposDia = tipos;
    //       });
    //       break;
    //       case 'addedTo':
    //         var model = {
    //           ejerc: $stateParams.ejercId,
    //           finca: CurrentFinca.fincaCur().fincaId,
    //           tipo: $stateParams.nameDia
    //         };
    //         HttpService.getToday(model, 'partecult').then(function(modelList) {
    //           $scope.resDia = modelList;
    //           var tipos = modelList.reduce(function(memo, dia) {
    //             if (dia) { // this serves as our `filter`
    //               memo.push({ // this serves as our `map`
    //                 tipoId: dia.tipo.id,
    //                 name: dia.tipo.name,
    //                 pathname: dia.tipo.pathname
    //               });
    //             }
    //             return memo;
    //           }, []);
    //
    //           $scope.tiposDia = tipos;
    //         });
    //         break;
    //       case 'updated':
    //         var model = {
    //           ejerc: $stateParams.ejercId,
    //           finca: CurrentFinca.fincaCur().fincaId,
    //           tipo: $stateParams.nameDia
    //         };
    //         HttpService.getToday(model, 'partecult').then(function(modelList) {
    //           $scope.resDia = modelList;
    //           var tipos = modelList.reduce(function(memo, dia) {
    //             if (dia) { // this serves as our `filter`
    //               memo.push({ // this serves as our `map`
    //                 tipoId: dia.tipo.id,
    //                 name: dia.tipo.name,
    //                 pathname: dia.tipo.pathname
    //               });
    //             }
    //             return memo;
    //           }, []);
    //
    //           $scope.tiposDia = tipos;
    //         });
    //         break;
    //         case 'destroyed':
    //           var model = {
    //             ejerc: $stateParams.ejercId,
    //             finca: CurrentFinca.fincaCur().fincaId,
    //             tipo: $stateParams.nameDia
    //           };
    //           HttpService.getToday(model, 'partecult').then(function(modelList) {
    //             $scope.resDia = modelList;
    //             var tipos = modelList.reduce(function(memo, dia) {
    //               if (dia) { // this serves as our `filter`
    //                 memo.push({ // this serves as our `map`
    //                   tipoId: dia.tipo.id,
    //                   name: dia.tipo.name,
    //                   pathname: dia.tipo.pathname
    //                 });
    //               }
    //               return memo;
    //             }, []);
    //
    //             $scope.tiposDia = tipos;
    //           });
    //         }
    //       });

        }

        angular
        .module('App')
        .controller('CultDiaHoyController', CultDiaHoyController);

      })();
