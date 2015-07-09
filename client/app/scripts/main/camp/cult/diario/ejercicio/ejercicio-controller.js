(function () {

  'use strict';

  /* @ngInject */
  function CultDiaEjercController ($scope, $rootScope, $state, $stateParams, $sailsSocket, CurrentFinca, AppK, HttpService, ejercicio, diarios) {
    $scope.title = 'Diario de Cultivo';
    $scope.diarios = diarios;
    var abonado = ejercicio.filter(function (el) {
      return el.tipo.name == 'Abonado';
    });
    $scope.getEjercAbon = function(){
      var sum = abonado.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    var tuneles = ejercicio.filter(function (el) {
      return el.tipo.name == 'Tuneles';
    });
    $scope.getEjercLimp = function(){
      var sum = tuneles.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    var entutorado = ejercicio.filter(function (el) {
      return el.tipo.name == 'Entutorado';
    });
    $scope.getEjercMant = function(){
      var sum = entutorado.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    var plantacion = ejercicio.filter(function (el) {
      return el.tipo.name == 'Plantacion';
    });
    //console.log('Plantacion: ' + JSON.stringify(plantacion));
    $scope.getEjercPlant = function(){
      var sum = plantacion.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    var poda = ejercicio.filter(function (el) {
      return el.tipo.name == 'Poda';
    });
    $scope.getEjercPoda = function(){
      var sum = poda.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    var riego = ejercicio.filter(function (el) {
      return el.tipo.name == 'Riego';
    });
    $scope.getEjercRiego = function(){
      var sum = riego.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    var suelo = ejercicio.filter(function (el) {
      return el.tipo.name == 'Suelo';
    });
    $scope.getEjercSuelo = function(){
      var sum = suelo.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    var tratamientos = ejercicio.filter(function (el) {
      return el.tipo.name == 'Tratamientos';
    });
    $scope.getEjercTrat = function(){
      var sum = tratamientos.reduce(function(memo, res) {
        return memo + res.totalmat + res.totalmaq + res.totalotros;
      }, 0);
      return sum;
    };

    //Pie totales
    var pieEjerc = function() {
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
    $scope.pEjerc =  pieEjerc;
    //Grafico Abonado
    var grafAbon = function() {
      var current = [];
      for (var i = 0; i < abonado.length; i++) {
        var total = 0;
        var fch = new Date (abonado[i].fecha);
        var fecha = new Date(fch.getFullYear(), fch.getMonth(), fch.getDate(), 8,0,0,0);
        var date = fecha.getTime();
        total = abonado[i].totalmat + abonado[i].totalmaq + abonado[i].totalotros;
        current.push([date, total]);
      }
      var AbonData = {'key': "Abonado", 'values': current};
      var chartOutputData = [AbonData];
      return chartOutputData;
    };
    //Grafico Limpieza
    var grafLimp = function() {
      var current = [];
      for (var i = 0; i < tuneles.length; i++) {
        var total = 0;
        var fch = new Date (tuneles[i].fecha);
        var fecha = new Date(fch.getFullYear(), fch.getMonth(), fch.getDate(), 8,0,0,0);
        var date = fecha.getTime();
        total = tuneles[i].totalmat + tuneles[i].totalmaq + tuneles[i].totalotros;
        current.push([date, total]);
      }
      var LimpData = {'key': "Tuneles", 'values': current};
      var chartOutputData = [LimpData];
      return chartOutputData;
    };
    //Grafico Mantenimiento
    var grafMant = function() {
      var current = [];
      for (var i = 0; i < entutorado.length; i++) {
        var total = 0;
        var fch = new Date (entutorado[i].fecha);
        var fecha = new Date(fch.getFullYear(), fch.getMonth(), fch.getDate(), 8,0,0,0);
        var date = fecha.getTime();
        total = entutorado[i].totalmat + entutorado[i].totalmaq + entutorado[i].totalotros;
        current.push([date, total]);
      }
      var MantData = {'key': "Entutorado", 'values': current};
      var chartOutputData = [MantData];
      return chartOutputData;
    };
    //Grafico Plantacion
    var grafPlant = function() {
      var current = [];
      for (var i = 0; i < plantacion.length; i++) {
        var total = 0;
        var fch = new Date (plantacion[i].fecha);
        var fecha = new Date(fch.getFullYear(), fch.getMonth(), fch.getDate(), 8,0,0,0);
        var date = fecha.getTime();
        total = plantacion[i].totalmat + plantacion[i].totalmaq + plantacion[i].totalotros;
        current.push([date, total]);
      }
      var PlantData = {'key': "Plantacion", 'values': current};
      var chartOutputData = [PlantData];
      return chartOutputData;
    };
    //Grafico Limpieza
    var grafPoda = function() {
      var current = [];
      for (var i = 0; i < poda.length; i++) {
        var total = 0;
        var fch = new Date (poda[i].fecha);
        var fecha = new Date(fch.getFullYear(), fch.getMonth(), fch.getDate(), 8,0,0,0);
        var date = fecha.getTime();
        total = poda[i].totalmat + poda[i].totalmaq + poda[i].totalotros;
        current.push([date, total]);
      }
      var PodaData = {'key': "Poda", 'values': current};
      var chartOutputData = [PodaData];
      return chartOutputData;
    };
    //Grafico Limpieza
    var grafRiego = function() {
      var current = [];
      for (var i = 0; i < riego.length; i++) {
        var total = 0;
        var fch = new Date (riego[i].fecha);
        var fecha = new Date(fch.getFullYear(), fch.getMonth(), fch.getDate(), 8,0,0,0);
        var date = fecha.getTime();
        total = riego[i].totalmat + riego[i].totalmaq + riego[i].totalotros;
        current.push([date, total]);
      }
      var RiegoData = {'key': "Riego", 'values': current};
      var chartOutputData = [RiegoData];
      return chartOutputData;
    };
    //Grafico Limpieza
    var grafSuelo = function() {
      var current = [];
      for (var i = 0; i < suelo.length; i++) {
        var total = 0;
        var fch = new Date (suelo[i].fecha);
        var fecha = new Date(fch.getFullYear(), fch.getMonth(), fch.getDate(), 8,0,0,0);
        var date = fecha.getTime();
        total = suelo[i].totalmat + suelo[i].totalmaq + suelo[i].totalotros;
        current.push([date, total]);
      }
      var SueloData = {'key': "Suelo", 'values': current};
      var chartOutputData = [SueloData];
      return chartOutputData;
    };
    //Grafico Limpieza
    var grafTrat = function() {
      var current = [];
      for (var i = 0; i < tratamientos.length; i++) {
        var total = 0;
        var fch = new Date (tratamientos[i].fecha);
        var fecha = new Date(fch.getFullYear(), fch.getMonth(), fch.getDate(), 8,0,0,0);
        var date = fecha.getTime();
        total = tratamientos[i].totalmat + tratamientos[i].totalmaq + tratamientos[i].totalotros;
        current.push([date, total]);
      }
      var TratData = {'key': "Tratamientos", 'values': current};
      var chartOutputData = [TratData];
      return chartOutputData;
    };

    //SCOPES graficos
    $scope.gAbon = grafAbon;
    $scope.gLimp = grafLimp;
    $scope.gMant = grafMant;
    $scope.gPlant = grafPlant;
    $scope.gPoda = grafPoda;
    $scope.gRiego = grafRiego;
    $scope.gSuelo = grafSuelo;
    $scope.gTrat = grafTrat;
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
    $sailsSocket.subscribe('partecult', function(message) {
      console.log('sails published a message for parte cultivo: ' + message.verb);

      switch (message.verb) {
        case 'created':
          var model = {
            ejerc: $stateParams.ejercId,
            finca: CurrentFinca.fincaCur().fincaId,
            tipo: $stateParams.nameDia
          };
          HttpService.getToday(model, 'partecult').then(function(modelList) {
            $scope.resDia = modelList;
          });
          break;
          case 'updated':
            var model = {
              ejerc: $stateParams.ejercId,
              finca: CurrentFinca.fincaCur().fincaId,
              tipo: $stateParams.nameDia
            };
            HttpService.getToday(model, 'partecult').then(function(modelList) {
              $scope.resDia = modelList;
            });
            break;
            case 'destroyed':
              var model = {
                ejerc: $stateParams.ejercId,
                finca: CurrentFinca.fincaCur().fincaId,
                tipo: $stateParams.nameDia
              };
              HttpService.getToday(model, 'partecult').then(function(modelList) {
                $scope.resDia = modelList;
              });
            }
          });

        }

        angular
        .module('App')
        .controller('CultDiaEjercController', CultDiaEjercController);

      })();
