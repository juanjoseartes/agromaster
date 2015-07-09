'use strict';
angular.module('App.states', ['AccessLevels'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, AccessLevels) {

  $stateProvider

  // ENTRY

  .state('login', {
    url: '/',
    templateUrl: 'scripts/main/login/login.html',
    controller: 'LoginController',
    data: {
      access: AccessLevels.anon
    }
  }).


  // PASSWORD RESET
  state('auth', {
    abstract: true,
    url: '/auth',
    template: '<ui-view/>',
    data: {
      access: 0
    }
  }).


  // MAIN

state('main', {
  abstract: true,
  url: '/inicio',
  templateUrl: 'scripts/main/menu.html',
  controller: 'MainController',
  data: {
    access: 1
  },
  resolve: {

  }
}).

    state('main.finca', {
      url: '/home',
      templateUrl: 'scripts/main/camp/fincas.html',
      controller: ''
    }).

    state('main.finca.ejerc', {
      url: '/:fincaId',
      templateUrl: 'scripts/main/camp/ejercicios.html',
      controller: 'SelEjercicioController',
      resolve: {
        campanas: function($stateParams, ORM) {
          var model = {
            id: $stateParams.fincaId
          };
          return ORM.getAll(model, 'ejercicio');
        }
      },
    }).
      state('main.add', {
        url: '/:fincaId',
        abstract: true,
        template: '<div ui-view></div>'
      }).

        state('main.add.ejerc', {
          url: '/addejerc',
          templateUrl: 'scripts/main/camp/ejercicio.html',
          controller: 'addEjercCtrl'
        }).


    state('main.camp', {
      url: '/:ejercId',
      abstract: true,
      template: '<div ui-view></div>',
      controller: ''
    }).

///////////////// MANO DE OBRA //////////////////////
        state('main.camp.mobra', {
          url: '/mobra',
          templateUrl: 'scripts/main/camp/mobra/mobra.html',
          controller: 'MObraCtrl',
          resolve: {
            empleados: function($stateParams, CurrentFinca, ORM) {
              var model = {
                finca: CurrentFinca.fincaCur().fincaId
              };
              return ORM.getAll(model, 'empleado');
            },
          }
        }).

          state('main.camp.mobra.presencia', {
            url: '/presencia',
            templateUrl: 'scripts/main/camp/mobra/presencia/presencia.html',
            controller: 'MObraPresencCtrl',
            onExit: function($stateParams, ORM) {
              var model = {
                ejerc: $stateParams.ejercId
              };
              return ORM.unsubscribe(model, 'partemo');
            },
          }).

            state('main.camp.mobra.presencia.inicio', {
              url: '/inicio',
              templateUrl: 'scripts/main/camp/mobra/presencia/inicio/inicio.html',
              controller: 'MObraPresencInicCtrl',
              resolve: {
                resDia: function($stateParams, ORM) {
                  var model = {
                    ejerc: $stateParams.ejercId
                  };
                  return ORM.findToday(model, 'partemo');
                },
                resEjercCult: function($stateParams, ORM) {
                  var model = {
                    id: $stateParams.ejercId,
                    tipo: 'cultivo'
                  };
                  return ORM.getEjercicio(model, 'partemo');
                },
                resEjercRec: function($stateParams, ORM) {
                  var model = {
                    id: $stateParams.ejercId,
                    tipo: 'recoleccion'
                  };
                  return ORM.getEjercicio(model, 'partemo');
                },
                resEjercEnc: function($stateParams, ORM) {
                  var model = {
                    id: $stateParams.ejercId,
                    tipo: 'encargado'
                  };
                  return ORM.getEjercicio(model, 'partemo');
                },
              }

            }).

            state('main.camp.mobra.presencia.cultivo', {
              url: '/cultivo',
              templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/cultivo.html',
              controller: 'MObraPresencCultCtrl',
              resolve: {
                presCult: function($stateParams, CurrentFinca, ORM) {
                  var model = {
                      ejerc: $stateParams.ejercId,
                      finca: CurrentFinca.fincaCur().fincaId,
                      tipo: 'cultivo'
                  };
                  return ORM.findToday(model, 'listempleado');
                },
              }
            }).

              state('main.camp.mobra.presencia.cultivo.add', {
                url: '/add',
                templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/add.html',
                controller: '',
              }).

              state('main.camp.mobra.presencia.cultivo.edit', {
                url: '/:moId/:costId',
                templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/edit.html',
                controller: 'MObraPresencCultEditCtrl',
                resolve: {
                  empleado: function($stateParams, ORM) {
                    var model = {
                      id: $stateParams.moId
                    };
                    return ORM.findOne(model, 'listempleado');
                  }
                }
              }).

            state('main.camp.mobra.presencia.recoleccion', {
              url: '/recoleccion',
              templateUrl: 'scripts/main/camp/mobra/presencia/recoleccion/recoleccion.html',
              controller: 'MObraPresencRecCtrl',
              resolve: {
                presRec: function($stateParams, CurrentFinca, ORM) {
                  var model = {
                    ejerc: $stateParams.ejercId,
                    finca: CurrentFinca.fincaCur().fincaId,
                    tipo: 'recoleccion'
                  };
                  return ORM.findToday(model, 'listempleado');
                },
              }
            }).

              state('main.camp.mobra.presencia.recoleccion.add', {
                url: '/add',
                templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/add.html',
                controller: '',
              }).

              state('main.camp.mobra.presencia.recoleccion.edit', {
                url: '/:moId/:costId',
                templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/edit.html',
                controller: 'MObraPresencRecEditCtrl',
                resolve: {
                  empleado: function($stateParams, ORM) {
                    var model = {
                      id: $stateParams.moId
                    };
                    return ORM.findOne(model, 'listempleado');
                  }
                }
              }).

            state('main.camp.mobra.presencia.encargados', {
              url: '/encargado',
              templateUrl: 'scripts/main/camp/mobra/presencia/encargados/encargados.html',
              controller: 'MObraPresencEncCtrl',
              resolve: {
                presEnc: function($stateParams, CurrentFinca, ORM) {
                  var model = {
                    ejerc: $stateParams.ejercId,
                    finca: CurrentFinca.fincaCur().fincaId,
                    tipo: 'encargado'
                  };
                  return ORM.findToday(model, 'listempleado');
                },
              }
            }).

              state('main.camp.mobra.presencia.encargados.add', {
                url: '/add',
                templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/add.html',
                controller: '',
              }).

              state('main.camp.mobra.presencia.encargados.edit', {
                url: '/:moId/:costId',
                templateUrl: 'scripts/main/camp/mobra/presencia/cultivo/edit.html',
                controller: 'MObraPresencEncEditCtrl',
                resolve: {
                  empleado: function($stateParams, ORM) {
                    var model = {
                      id: $stateParams.moId
                    };
                    return ORM.findOne(model, 'listempleado');
                  }
                }
              }).

          state('main.camp.mobra.empleados', {
            url: '/empleados',
            templateUrl: 'scripts/main/camp/mobra/empleados/empleados.html',
            controller: 'MObraEmpleadCtrl',
          }).

            state('main.camp.mobra.empleados.add', {
              url: '/add',
              templateUrl: 'scripts/main/camp/mobra/empleados/addEmpleado.html',
              controller: 'MObraEmpleadCtrl'
            }).

            state('main.camp.mobra.empleados.edit', {
              url: '/:emplId',
              templateUrl: 'scripts/main/camp/mobra/empleados/editEmpleado.html',
              controller: 'MObraEmpleadEditCtrl',
              resolve: {
                empleado: function($stateParams, ORM) {
                  var model = {
                    id: $stateParams.emplId
                  };
                  return ORM.findOne(model, 'empleado');
                }
              }
            }).

          state('main.camp.mobra.tarjetas', {
            url: '/tarjetas',
            abstract: true,
            templateUrl: 'scripts/main/camp/mobra/tarjetas/tarjetas.html',
            controller: 'TarjetasCtrl',
            resolve: {
              tarjetas: function($stateParams, ORM, CurrentFinca) {
                var model = {
                  finca: CurrentFinca.fincaCur().fincaId,
                };
                return ORM.getAll(model, 'tag');
              }
            }
          }).

            state('main.camp.mobra.tarjetas.asignac', {
              url: '/asignacion',
              templateUrl: 'scripts/main/camp/mobra/tarjetas/asignacion.html',
              controller: ''
            }).

            state('main.camp.mobra.tarjetas.inventario', {
              url: '/inventario',
              templateUrl: 'scripts/main/camp/mobra/tarjetas/inventario.html',
              controller: '',

            }).

///////////////// CULTIVO //////////////////////
        state('main.camp.cult', {
          url: '',
          abstract: true,
          template: '<div ui-view></div>',
          controller: '',

        }).

          state('main.camp.cult.home', {
            url: '/cultivo',
            templateUrl: 'scripts/main/camp/cult/cultivo.html',
            controller: 'CultivoCtrl',
            resolve: {
              diarios: function($stateParams, CurrentFinca, ORM) {
                var model = {
                  finca: CurrentFinca.fincaCur().fincaId,
                  ejerc: $stateParams.ejercId
                };
                return ORM.getAll(model, 'tipodiario');
              },
              resDia: function($stateParams, ORM) {
                var model = {
                  ejerc: $stateParams.ejercId,
                  tipo: $stateParams.nameDia
                };
                return ORM.getToday(model, 'partecult');
              },
            }
          }).
    //////////////// HOY ///////////////////////////////////
            state('main.camp.cult.home.hoy', {
              url: '/hoy',
              templateUrl: 'scripts/main/camp/cult/cultivoHoy.html',
              controller: 'CultDiaHoyCtrl',
              resolve: {
                // resDia: function($stateParams, ORM) {
                //   var model = {
                //     ejerc: $stateParams.ejercId,
                //     //tipo: $stateParams.nameDia
                //   };
                //   return ORM.getToday(model, 'partecult');
                // },
                // hoy: function($stateParams, CurrentFinca, ORM) {
                //   var model = {
                //     ejerc: $stateParams.ejercId
                //   };
                //   return ORM.getToday(model, 'partecult');
                // }
              }
            }).

              state('main.camp.cult.home.hoy.inic', {
                url: '/inicio',
                controller: 'CultDiaInicCtrl',
                templateUrl: 'scripts/main/camp/cult/diario/hoy/inicio/inicio.html',
                resolve: {
                  // resDia: function($stateParams, ORM) {
                  //   var model = {
                  //     ejerc: $stateParams.ejercId,
                  //     //tipo: $stateParams.nameDia
                  //   };
                  //   return ORM.getToday(model, 'partecult');
                  // },
                  repartoDia: function($stateParams, ORM) {
                    var model = {
                      ejerc: $stateParams.ejercId
                    };
                    return ORM.getToday(model, 'repartocult');
                  },
                  resEjerc: function($stateParams, ORM) {
                    var model = {
                      ejerc: $stateParams.ejercId,
                      //tipo: $stateParams.nameDia
                    };
                    return ORM.getEjercicio(model, 'partecult');
                  },
                }
              }).

              state('main.camp.cult.home.hoy.diario', {
                url: '/:nameDia',
                abstract: true,
                templateUrl: 'scripts/main/camp/cult/diario/diario.html',
                controller: 'CultDiaCtrl',
                resolve: {
                  resDiario: function($stateParams, ORM) {
                    var model = {
                      ejerc: $stateParams.ejercId,
                      tipo: $stateParams.nameDia
                    };
                    return ORM.getToday(model, 'partecult');
                  },
                  resEjercicio: function($stateParams, ORM) {
                    var model = {
                      ejerc: $stateParams.ejercId,
                      tipo: $stateParams.nameDia
                    };
                    return ORM.getEjercicio(model, 'partecult');
                  },
               }
              }).
      //////////////// PARCELA ///////////////////
                state('main.camp.cult.home.hoy.diario.parcela', {
                  url: '/parcela',
                  controller: 'CultDiaParcCtrl',
                  templateUrl: 'scripts/main/camp/cult/diario/hoy/parcelas/parcelas.html',
                  resolve: {
                    parcelas: function(CurrentFinca, ORM) {
                      var model = {
                        id: CurrentFinca.fincaCur().fincaId
                      };
                      return ORM.getActive(model, 'parcela');
                    },
                    detParcelas: function($stateParams, CurrentFinca, ORM) {
                      var model = {
                        ejerc: $stateParams.ejercId,
                        finca: CurrentFinca.fincaCur().fincaId,
                        tipo: $stateParams.nameDia
                      };
                      return ORM.findToday(model, 'parccultivo');
                    },
                    repartoEjerc: function($stateParams, ORM) {
                      var model = {
                        ejerc: $stateParams.ejercId,
                        tipo: $stateParams.nameDia
                      };
                      return ORM.getAll(model, 'repartocult');
                    }
                  },
                }).

                  state('main.camp.cult.home.hoy.diario.parcela.add', {
                    url: '/add',
                    templateUrl: 'scripts/main/camp/cult/diario/hoy/parcelas/add.html',
                  }).

                  state('main.camp.cult.home.hoy.diario.parcela.edit', {
                    url: '/:parcId',
                    controller: 'CultDiaEditParcCtrl',
                    templateUrl: 'scripts/main/camp/cult/diario/hoy/parcelas/edit.html',
                    resolve: {
                      parcela: function($stateParams, ORM) {
                        var model = {
                          id: $stateParams.parcId
                        };
                        return ORM.findOne(model, 'parccultivo');
                      },
                    },
                  }).
      /////////// MANO OBRA ////////////////
                state('main.camp.cult.home.hoy.diario.mobra', {
                  url: '/mobra',
                  controller: 'CultDiaMObraCtrl',
                  templateUrl: 'scripts/main/camp/cult/diario/hoy/mobra/mobra.html',
                  resolve: {
                    empleados: function($stateParams, CurrentFinca, ORM) {
                      var model = {
                        ejerc: $stateParams.ejercId,
                        finca: CurrentFinca.fincaCur().fincaId,
                        tipo: 'cultivo'
                      };
                      return ORM.findToday(model, 'listempleado');
                    },
                    detMObra: function($stateParams, CurrentFinca, ORM) {
                      var model = {
                        ejerc: $stateParams.ejercId,
                        finca: CurrentFinca.fincaCur().fincaId,
                        tipo: $stateParams.nameDia
                      };
                      return ORM.findToday(model, 'mocultivo');
                    },
                  },
                  onExit: function($stateParams, ORM) {
                    var model = {
                      ejerc: $stateParams.ejercId,
                      tipo: $stateParams.nameDia
                    };
                    return ORM.getTotalbyDate(model, 'partecult');
                  }
                }).

                  state('main.camp.cult.home.hoy.diario.mobra.add', {
                    url: '/add',
                    templateUrl: 'scripts/main/camp/cult/diario/hoy/mobra/add.html',
                  }).

                  state('main.camp.cult.home.hoy.diario.mobra.edit', {
                    url: '/:moId',
                    controller: 'CultDiaEditMObraCtrl',
                    templateUrl: 'scripts/main/camp/cult/diario/hoy/mobra/edit.html',
                    resolve: {
                      empleado: function($stateParams, ORM) {
                        var model = {
                          id: $stateParams.maqId
                        };
                        return ORM.findOne(model, 'mocultivo');
                      },
                    },
                  }).
      ////////// MATERIALES ///////////////
                state('main.camp.cult.home.hoy.diario.materiales', {
                  url: '/materiales',
                  controller: 'CultDiaMatCtrl',
                  templateUrl: 'scripts/main/camp/cult/diario/hoy/materiales/materiales.html',
                  resolve: {
                    materiales: function(CurrentFinca, ORM) {
                      var model = {
                        finca: CurrentFinca.fincaCur().fincaId
                        //almacen: 'material vegetal'
                      };
                      return ORM.getAll(model, 'producto');
                    },
                    detMateriales: function($stateParams, CurrentFinca, ORM) {
                      var model = {
                        ejerc: $stateParams.ejercId,
                        finca: CurrentFinca.fincaCur().fincaId,
                        tipo: $stateParams.nameDia
                      };
                      return ORM.findToday(model, 'matcultivo');
                    },
                  },
                }).

                  state('main.camp.cult.home.hoy.diario.materiales.add', {
                    url: '/add',
                    templateUrl: 'scripts/main/camp/cult/diario/hoy/materiales/add.html',
                  }).

                  state('main.camp.cult.home.hoy.diario.materiales.edit', {
                    url: '/:matId',
                    controller: 'CultDiaEditMatCtrl',
                    templateUrl: 'scripts/main/camp/cult/diario/hoy/materiales/edit.html',
                    resolve: {
                      material: function($stateParams, ORM) {
                        var model = {
                          id: $stateParams.matId
                        };
                        return ORM.findOne(model, 'matcultivo');
                      },
                      unidades: function(ORM) {
                        return ORM.getAll({}, 'unidad');
                      },
                    },
                  }).
      ///////////// MAQUINARIA //////////////
                state('main.camp.cult.home.hoy.diario.maquinaria', {
                  url: '/maquinaria',
                  controller: 'CultDiaMaqCtrl',
                  templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/maquinaria.html',
                  resolve: {
                    maquinas: function(CurrentFinca, ORM) {
                      var model = {
                        id: CurrentFinca.fincaCur().fincaId,
                        propiedad: 'propiedad'
                      };
                      return ORM.getAll(model, 'maquinaria');
                    },
                    maqAlq: function(CurrentFinca, ORM) {
                      var model = {
                        id: CurrentFinca.fincaCur().fincaId,
                        propiedad: 'alquiler'
                      };
                      return ORM.getAll(model, 'maquinaria');
                    },
                    detMaquinaria: function($stateParams, CurrentFinca, ORM) {
                      var model = {
                        ejerc: $stateParams.ejercId,
                        finca: CurrentFinca.fincaCur().fincaId,
                        tipo: $stateParams.nameDia
                      };
                      return ORM.findToday(model, 'maqcultivo');
                    },

                  },
                }).

                  state('main.camp.cult.home.hoy.diario.maquinaria.add', {
                    url: '/add',
                    templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/add.html',
                  }).

                  state('main.camp.cult.home.hoy.diario.maquinaria.addalq', {
                    url: '/addalq',
                    templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/addAlq.html',
                  }).

                  state('main.camp.cult.home.hoy.diario.maquinaria.edit', {
                    url: '/:maqId',
                    controller: 'CultDiaEditMaqCtrl',
                    templateUrl: 'scripts/main/camp/cult/diario/hoy/maquinaria/edit.html',
                    resolve: {
                      maquina: function($stateParams, ORM) {
                        var model = {
                          id: $stateParams.maqId
                        };
                        return ORM.findOne(model, 'maqcultivo');
                      },
                    },
                  }).
      ////////// OTROS ///////////////////////
                state('main.camp.cult.home.hoy.diario.otros', {
                  url: '/otros',
                  controller: 'CultDiaOtrosCtrl',
                  templateUrl: 'scripts/main/camp/cult/diario/hoy/otros/otros.html',
                  resolve: {
                    detOtros: function($stateParams, CurrentFinca, ORM) {
                      var model = {
                        ejerc: $stateParams.ejercId,
                        finca: CurrentFinca.fincaCur().fincaId,
                        tipo: $stateParams.nameDia
                      };
                      return ORM.findToday(model, 'otroscultivo');
                    },
                  },
                }).

                  state('main.camp.cult.home.hoy.diario.otros.add', {
                    url: '/add',
                    templateUrl: 'scripts/main/camp/cult/diario/hoy/otros/add.html',
                  }).

                  state('main.camp.cult.home.hoy.diario.otros.edit', {
                    url: '/:otId',
                    controller: 'CultDiaEditOtrosCtrl',
                    templateUrl: 'scripts/main/camp/cult/diario/hoy/otros/edit.html',
                    resolve: {
                      otro: function($stateParams, ORM) {
                        var model = {
                          id: $stateParams.otId
                        };
                        return ORM.findOne(model, 'otroscultivo');
                      },
                    },
                  }).
    ////////// EJERCICIO /////////////
            state('main.camp.cult.home.ejerc', {
              url: '/ejercicio',
              templateUrl: 'scripts/main/camp/cult/diario/ejercicio/ejercicio.html',
              controller: 'CultDiaEjercCtrl',
              resolve: {
                ejercicio: function($stateParams, CurrentFinca, ORM) {
                  var model = {
                    ejerc: $stateParams.ejercId
                  };
                  return ORM.getEjercicio(model, 'partecult');
                  }
                }
              }).

///////////////// RECOLECCION //////////////////////
        state('main.camp.recolecc', {
          url: '',
          abstract: true,
          template: '<div ui-view></div>',
          controller: 'RecoleccCtrl'
        }).

          state('main.camp.recolecc.home', {
            url: '/recoleccion',
            templateUrl: 'scripts/main/camp/recol/recoleccion.html',
            controller: '',
            resolve: {

            }
          }).

            state('main.camp.recolecc.home.espec', {
              url: '/:especId',
              templateUrl: 'scripts/main/camp/recol/especies/inicio.html',
              controller: '',
              resolve: {
                confecciones: function($stateParams, CurrentFinca, ORM) {
                  var model = {
                    ejerc: $stateParams.ejercId,
                    especie: $stateParams.especId
                  };
                  //console.log('Model: ' + JSON.stringify(model));
                  return ORM.getActive(model, 'confeccion');
                }
              }
            }).

              state('main.camp.recolecc.home.espec.hoy', {
                url: '/hoy',
                templateUrl: 'scripts/main/camp/recol/especies/hoy/hoy.html',
                controller: 'RecoleccHoyCtrl',
                resolve: {
                  resDia: function($stateParams, ORM) {
                    var model = {
                      ejerc: $stateParams.ejercId,
                      especie: $stateParams.especId
                    };
                    return ORM.getToday(model, 'recoleccion');
                  },
                  confeccHoy: function($stateParams, ORM) {
                    var model = {
                      ejerc: $stateParams.ejercId,
                      especie: $stateParams.especId
                    };
                    return ORM.getToday(model, 'confecdia');
                  }
                }
              }).

                state('main.camp.recolecc.home.espec.hoy.confecc', {
                  url: '/confecciones',
                  templateUrl: 'scripts/main/camp/recol/especies/hoy/confecciones.html',
                  controller: '',
                  resolve: {

                  }
                }).
                  state('main.camp.recolecc.home.espec.hoy.confecc.add', {
                    url: '/add',
                    templateUrl: 'scripts/main/camp/recol/especies/hoy/addconfecc.html',
                    controller: '',
                    resolve: {

                    }
                  }).
                state('main.camp.recolecc.home.espec.hoy.emplead', {
                  url: '/empleados',
                  templateUrl: 'scripts/main/camp/recol/especies/hoy/empleados.html',
                  controller: '',
                  resolve: {

                  }
                }).
                state('main.camp.recolecc.home.espec.hoy.parcela', {
                  url: '/parcelas',
                  templateUrl: 'scripts/main/camp/recol/especies/hoy/parcelas.html',
                  controller: '',
                  resolve: {

                  }
                }).

              state('main.camp.recolecc.home.espec.ejerc', {
                url: '/ejerc',
                templateUrl: 'scripts/main/camp/recol/especies/ejercicio.html',
                controller: '',
                resolve: {
                  resEjerc: function($stateParams, ORM) {
                    var model = {
                      ejerc: $stateParams.ejercId,
                      especie: $stateParams.especId
                    };
                    return ORM.getEjercicio(model, 'recoleccion');
                  }
                }
              }).

                state('main.camp.recolecc.home.espec.ejerc.confecc', {
                  url: '/confecciones',
                  templateUrl: 'scripts/main/camp/recol/especies/ejercicio/confecciones.html',
                  controller: '',
                  resolve: {

                  }
                }).
                state('main.camp.recolecc.home.espec.ejerc.emplead', {
                  url: '/empleados',
                  templateUrl: 'scripts/main/camp/recol/especies/ejercicio/empleados.html',
                  controller: '',
                  resolve: {

                  }
                }).
                state('main.camp.recolecc.home.espec.ejerc.parcela', {
                  url: '/parcelas',
                  templateUrl: 'scripts/main/camp/recol/especies/ejercicio/parcelas.html',
                  controller: '',
                  resolve: {

                  }
                }).

///////////////// LECTURAS //////////////////////
        state('main.camp.lectu', {
          url: '/lecturas',
          abstract: true,
          templateUrl: 'scripts/main/camp/lectu/lecturas.html',
          controller: 'LectuCtrl as lecturas',
        }).

        state('main.camp.lectu.parc', {
          url: '/:parcId',
          templateUrl: 'scripts/main/camp/lectu/parcelas/parcelas.html',
          controller:'LectuParcCtrl',
          resolve: {
            hoyPh: function($stateParams, ORM) {
              var model = {
                id: $stateParams.ejercId,
                tipo: 'ph',
                parcela: $stateParams.parcId
              };
              return ORM.findToday(model, 'lectura');
            },
            ejercPh: function($stateParams, ORM) {
              var model = {
                id: $stateParams.ejercId,
                tipo: 'ph',
                parcela: $stateParams.parcId
              };
              return ORM.findEjercicio(model, 'lectura');
            },
            hoyEc: function($stateParams, ORM) {
              var model = {
                id: $stateParams.ejercId,
                tipo: 'ec',
                parcela: $stateParams.parcId
              };
              return ORM.findToday(model, 'lectura');
            },
            ejercEc: function($stateParams, ORM) {
              var model = {
                id: $stateParams.ejercId,
                tipo: 'ec',
                parcela: $stateParams.parcId
              };
              return ORM.findEjercicio(model, 'lectura');
            }
          }
        }).

          state('main.camp.lectu.parc.edit', {
            url: '/:lectId',
            templateUrl: 'scripts/main/camp/lectu/parcelas/editLectura.html',
            controller: 'EditLectuCtrl',
            resolve: {
              lectura: function($stateParams, ORM) {
                var model = {
                  id: $stateParams.lectId
                };
                return ORM.findOne(model, 'lectura');
              },
            }
          }).

///////////////// TAREAS PROGRAMADAS //////////////////////
        state('main.camp.tprog', {
          url: '/tprogram',
          abstract: true,
          templateUrl: 'scripts/main/camp/tprog/tprogram.html',
          controller: 'TProgramCtrl',
        }).

          state('main.camp.tprog.riego', {
            url: '/riego',
            templateUrl: 'scripts/main/camp/tprog/riego/riego.html',
            controller: ''
          }).

          state('main.camp.tprog.abonado', {
            url: '/abonado',
            templateUrl: 'scripts/main/camp/tprog/abonado/abonado.html',
            controller: ''
          }).

          state('main.camp.tprog.tratam', {
            url: '/tratamiento',
            templateUrl: 'scripts/main/camp/tprog/tratam/tratam.html',
            controller: ''
          }).

///////////////// ANALISIS //////////////////////
        state('main.camp.analisis', {
          url: '/analisis',
          abstract: true,
          templateUrl: 'scripts/main/camp/analisis/analisis.html',
          controller: 'AnalisisCtrl'
        }).

          state('main.camp.analisis.tipo', {
            url: '/:tipoName',
            templateUrl: 'scripts/main/camp/analisis/tipo/tipo.html',
            controller: 'AnalisisTipoCtrl',
            resolve: {
              analisis: function($stateParams, ORM) {
                var model = {
                  ejerc: $stateParams.ejercId,
                  tipo: $stateParams.tipoName
                };
                return ORM.getAll(model, 'analisis');
              }
            }
          }).

            state('main.camp.analisis.tipo.add', {
              url: '/add',
              templateUrl: 'scripts/main/camp/analisis/tipo/add.html',
              controller: 'AnalisisAddCtrl',
              resolve: {
                labCurso: function(PreAnalisis) {
                  return PreAnalisis.labCur();
                },
                fchCurso: function(PreAnalisis) {
                  return PreAnalisis.fchCur();
                }
              }
            }).

              state('main.camp.analisis.tipo.add.lab', {
                url: '/laboratorios',
                templateUrl: 'scripts/main/camp/analisis/laboratorios/laboratorios.html',
                controller: 'AnalisisLabCtrl',
                resolve: {
                  laboratorios: function($stateParams, ORM) {
                    var model = {};
                    return ORM.getAll(model, 'laboratorio');
                  }
                }
              }).

              state('main.camp.analisis.tipo.add.fecha', {
                url: '/fecha',
                templateUrl: 'scripts/main/camp/analisis/fecha/fecha.html',
                controller: 'AnalisisFechaCtrl',

              }).

            state('main.camp.analisis.tipo.edit', {
              url: '/:anaId',
              templateUrl: 'scripts/main/camp/analisis/tipo/edit.html',
              controller: 'AnalisisEditCtrl',
              resolve: {
                detAnalisis: function($stateParams, ORM) {
                  var model = {
                    id: $stateParams.anaId
                  };
                  return ORM.findOne(model, 'analisis');
                }
              }
            }).

            state('main.camp.analisis.tipo.upload', {
              url: '/:anaId/upload',
              templateUrl: 'scripts/main/camp/analisis/tipo/uploads/upload.html',
              controller: 'AnalisisUploadCtrl',

            }).

          state('main.camp.analisis.planta', {
            url: '/planta',
            templateUrl: 'scripts/main/camp/analisis/planta/planta.html',
            controller: ''
          }).

          state('main.camp.analisis.agua', {
            url: '/agua',
            templateUrl: 'scripts/main/camp/analisis/agua/agua.html',
            controller: ''
          }).

///////////////// RESIDUOS //////////////////////
        state('main.camp.residuos', {
          url: '/residuos',
          templateUrl: 'scripts/main/camp/residuos/residuos.html',
          controller: 'ResiduosCtrl',
          resolve: {
            residuos: function($stateParams, ORM) {
              var model = {
                ejerc: $stateParams.ejercId
              };
              return ORM.getAll(model, 'residuos');
            }
          }
        }).

          state('main.camp.residuos.add', {
            url: '/add',
            templateUrl: 'scripts/main/camp/residuos/addResiduos.html',
            controller: 'ResiduosAddCtrl',
            resolve: {
              gestCurso: function(PreResiduos) {
                return PreResiduos.gestCur();
              },
              fchCurso: function(PreResiduos) {
                return PreResiduos.fchCur();
              }
            }
          }).

            state('main.camp.residuos.add.gest', {
              url: '/gestores',
              templateUrl: 'scripts/main/camp/residuos/gestores/gestores.html',
              controller: 'ResiduosGestCtrl',
              resolve: {
                gestores: function($stateParams, CurrentFinca, ORM) {
                  var model = {
                    finca: CurrentFinca.fincaCur().fincaId,
                  };
                  return ORM.getAll(model, 'proveedor');
                }
              }
            }).

            state('main.camp.residuos.add.fecha', {
              url: '/fecha',
              templateUrl: 'scripts/main/camp/residuos/fecha/fecha.html',
              controller: 'ResiduosFechaCtrl',

            }).

          state('main.camp.residuos.edit', {
            url: '/:resId',
            templateUrl: 'scripts/main/camp/residuos/editResiduos.html',
            controller: 'ResiduosEditCtrl',
            resolve: {
              detResiduos: function($stateParams, ORM) {
                var model = {
                  id: $stateParams.resId
                };
                return ORM.findOne(model, 'residuos');
              }
            }
          }).

          state('main.camp.residuos.upload', {
            url: '/:resId/upload',
            templateUrl: 'scripts/main/camp/residuos/uploads/upload.html',
            controller: 'ResiduosUploadCtrl'
          }).

///////////////// SCOUTING //////////////////////
        state('main.camp.scout', {
          url: '/scouting',
          templateUrl: 'scripts/main/camp/scout/scouting.html',
          controller: 'ScoutCtrl'
        }).

///////////////// COMPRAS //////////////////////
        state('main.camp.compras', {
          url: '/compras',
          template: '<div ui-view></div>',
          controller: 'ComprasCtrl',
          abstract: true
        }).

          state('main.camp.compras.home', {
            url: '',
            templateUrl: 'scripts/main/camp/compras/compras.html',
            controller: 'ComprasCtrl as compras',
            resolve: {
              provCurso: function(PreAlbaran) {
                return PreAlbaran.provCur();
              },
              fchCurso: function(PreAlbaran) {
                return PreAlbaran.fchCur();
              }
            },
          }).

          state('main.camp.compras.home.alb', {
            url: '/albaran',
            templateUrl: 'scripts/main/camp/compras/albaranes/albaranes.html',
            controller: 'AlbCompraCtrl',
            // resolve: {
            //   albaranes: function(CurrentFinca, ORM){
            //     var model = {
            //       finca: CurrentFinca.fincaCur().fincaId,
            //       fchinic: CurrentFinca.fincaCur().ejercCurso.fchinic,
            //       fchfin: CurrentFinca.fincaCur().ejercCurso.fchfin
            //     };
            //     return ORM.getAll(model, 'albcompra');
            //   },
            // }
          }).

          state('main.camp.compras.home.alb.hoy', {
            url: '/hoy',
            templateUrl: 'scripts/main/camp/compras/albaranes/albaranesList.html',
            controller: 'AlbListCompraCtrl',
            resolve: {
              albaranes: function(CurrentFinca, ORM){
                var fin = new Date();
                var inicio = new Date(fin);
                inicio.setDate(fin.getDate()-1);
                var model = {
                  finca: CurrentFinca.fincaCur().fincaId,
                  fchinic: inicio,
                  fchfin: fin
                };
                console.log('Model: ' + JSON.stringify(model));
                return ORM.getAll(model, 'albcompra');
              },
            }
          }).

          state('main.camp.compras.home.alb.semana', {
            url: '/semana',
            templateUrl: 'scripts/main/camp/compras/albaranes/albaranesList.html',
            controller: 'AlbListCompraCtrl',
            resolve: {
              albaranes: function(CurrentFinca, ORM){
                var fin = new Date();
                var inicio = new Date(fin);
                inicio.setDate(fin.getDate()-7);
                var model = {
                  finca: CurrentFinca.fincaCur().fincaId,
                  fchinic: inicio,
                  fchfin: fin
                };
                return ORM.getAll(model, 'albcompra');
              },
            }
          }).
          state('main.camp.compras.home.alb.mes', {
            url: '/mes',
            templateUrl: 'scripts/main/camp/compras/albaranes/albaranesList.html',
            controller: 'AlbListCompraCtrl',
            resolve: {
              albaranes: function(CurrentFinca, ORM){
                var fin = new Date();
                var inicio = new Date(fin);
                inicio.setDate(fin.getDate()-30);
                var model = {
                  finca: CurrentFinca.fincaCur().fincaId,
                  fchinic: inicio,
                  fchfin: fin
                };
                return ORM.getAll(model, 'albcompra');
              },
            }
          }).
          state('main.camp.compras.home.alb.trim', {
            url: '/trimestre',
            templateUrl: 'scripts/main/camp/compras/albaranes/albaranesList.html',
            controller: 'AlbListCompraCtrl',
            resolve: {
              albaranes: function(CurrentFinca, ORM){
                var fin = new Date();
                var inicio = new Date(fin);
                inicio.setDate(fin.getDate()-90);
                var model = {
                  finca: CurrentFinca.fincaCur().fincaId,
                  fchinic: inicio,
                  fchfin: fin
                };
                return ORM.getAll(model, 'albcompra');
              },
            }
          }).
          state('main.camp.compras.home.alb.all', {
            url: '/all',
            templateUrl: 'scripts/main/camp/compras/albaranes/albaranesList.html',
            controller: 'AlbListCompraCtrl',
            resolve: {
              albaranes: function(CurrentFinca, ORM){
                var model = {
                  finca: CurrentFinca.fincaCur().fincaId,
                  fchinic: CurrentFinca.fincaCur().ejercCurso.fchinic,
                  fchfin: CurrentFinca.fincaCur().ejercCurso.fchfin
                };
                return ORM.getAll(model, 'albcompra');
              },
            }
          }).

          state('main.camp.compras.home.fact', {
            url: '/facturas',
            templateUrl: 'scripts/main/camp/compras/facturas/facturas.html',
            controller: 'FactCompraCtrl',
            resolve: {
              facturas: function(CurrentFinca, ORM){
                var model = {
                  finca: CurrentFinca.fincaCur().fincaId,
                  fchinic: CurrentFinca.fincaCur().ejercCurso.fchinic,
                  fchfin: CurrentFinca.fincaCur().ejercCurso.fchfin
                };
                return ORM.getAll(model, 'factcompra');
              }
            }
          }).

            state('main.camp.compras.edit', {
              url: '',
              template: '<div ui-view></div>',
              abstract: true,
              controller: '',
            }).

            state('main.camp.compras.home.alb.edit', {
              url: '/:albId',
              templateUrl: 'scripts/main/camp/compras/albaranes/editAlbaran.html',
              controller: 'EditAlbCompraCtrl',
              resolve: {
                albaran: function($stateParams, ORM){
                  var model = {
                    id: $stateParams.albId
                  };
                  return ORM.findOne(model, 'albcompra');
                },
                unidades: function(ORM) {
                  return ORM.findGetDefault({}, 'unidad');
                },
                detCompra: function($stateParams, ORM) {
                  var model = {
                    id: $stateParams.albId
                  };
                  return ORM.getAll(model, 'detcompra');
                },

              }
            }).

              state('main.camp.compras.edit.alb.det', {
                url: '/det',
                template: '<div ui-view></div>',
                controller: '',
                abstract: true
              }).

              state('main.camp.compras.home.alb.edit.fertil', {
                url: '/:detId',
                templateUrl: 'scripts/main/camp/compras/lineas/detalles/fertilizante.html',
                controller: 'lCompFertilDetCtrl',
                resolve: {
                  detalle: function($stateParams, ORM) {
                    var model = {
                      id: $stateParams.detId
                    };
                    return ORM.findOne(model, 'detcompra');
                  },
                  unidades: function(ORM) {
                    return ORM.getAll({}, 'unidad');
                  }
                }
              }).

            state('main.camp.compras.add', {
              url: '/add',
              template: '<div ui-view></div>',
              abstract: true,
              controller: '',
            }).

            state('main.camp.compras.add.alb', {
              url: '/albaran',
              templateUrl: 'scripts/main/camp/compras/albaranes/addAlbaran.html',
              controller: 'AddAlbCompraCtrl',
              resolve: {
                provCurso: function(PreAlbaran) {
                  return PreAlbaran.provCur();
                },
                fchCurso: function(PreAlbaran) {
                  return PreAlbaran.fchCur();
                }
              },
            }).

            state('main.camp.compras.sel', {
              url: '/add/albaran',
              template: '<div ui-view></div>',
              abstract: true,
              controller: '',
            }).

            state('main.camp.compras.sel.prov', {
              url: '/proveedores',
              templateUrl: 'scripts/main/camp/compras/albaranes/proveedores.html',
              controller: 'SelProvCtrl',
              resolve: {
                proveedores: function(CurrentFinca, ORM) {
                  var model = {
                    finca: CurrentFinca.fincaCur().fincaId
                  };
                  return ORM.getAll(model, 'proveedor');
                },
                provCurso: function(PreAlbaran) {
                  return PreAlbaran.provCur();
                }
              },
            }).

            state('main.camp.compras.sel.fch', {
              url: '/fecha',
              templateUrl: 'scripts/main/camp/compras/albaranes/fecha.html',
              controller: 'SelFchCtrl',
              resolve: {
                fchCurso: function(PreAlbaran) {
                  return PreAlbaran.fchCur();
                }
              },
            }).

            state('main.camp.compras.newprov', {
              url: '/compras/alb/newproveed',
              templateUrl: 'scripts/main/camp/compras/albaranes/newproveed.html',
              controller: 'AddProvCtrl',

            }).

              state('main.camp.compras.edit.alb.fertil', {
                url: '/fertil',
                templateUrl: 'scripts/main/camp/compras/lineas/fertilizantes.html',
                controller: 'lCompFertilCtrl',
                resolve: {
                  detcompra: function($stateParams, ORM) {
                    var model = {
                      id: $stateParams.albId,
                      almacen: 'abonos'
                    };
                    return ORM.getAll(model, 'detcompra');
                  }
                }
              }).



                state('main.camp.compras.edit.alb.det.fito', {
                  url: '/:detId/fito',
                  templateUrl: 'scripts/main/camp/compras/lineas/detalles/fitosanitario.html',
                  controller: 'lCompFitoDetCtrl',
                  resolve: {
                    detalle: function($stateParams, ORM) {
                      var model = {
                        id: $stateParams.detId
                      };
                      return ORM.findOne(model, 'detcompra');
                    },
                    unidades: function(ORM) {
                      return ORM.getAll({}, 'unidad');
                    }
                  }
                }).


              state('main.camp.compras.search', {
                url: '/albaran/:albId/search',
                template: '<div ui-view></div>',
                controller: '',
                abstract: true
              }).

              state('main.camp.compras.search.albFertil', {
                url: '/fertil',
                templateUrl: 'scripts/main/camp/compras/lineas/search/fertilizantes.html',
                controller: 'searchFertilCtrl',
                resolve: {
                  abonoList: function(CurrentFinca, ORM) {
                    var model = {
                      id: CurrentFinca.fincaCur().fincaId
                    };
                    return ORM.getAbonos(model, 'articulo');
                  }
                }
              }).

              state('main.camp.compras.search.albFito', {
                url: '/fito',
                templateUrl: 'scripts/main/camp/compras/lineas/search/fitosanitarios.html',
                controller: 'searchFitoCtrl',
                resolve: {
                  fitoList: function(CurrentFinca, ORM) {
                    var model = {
                      id: CurrentFinca.fincaCur().fincaId
                    };
                    return ORM.getFitos(model, 'articulo');
                  }
                }
              }).

              state('main.camp.compras.edit.alb.fitos', {
                url: '/fitos',
                templateUrl: 'scripts/main/camp/compras/lineas/fitosanitarios.html',
                controller: 'lCompFitoCtrl',
                resolve: {
                  detcompra: function($stateParams, ORM) {
                    var model = {
                      id: $stateParams.albId,
                      almacen: 'fitosanitarios'
                    };
                    return ORM.getAll(model, 'detcompra');
                  }
                }
              }).
              state('main.camp.compras.edit.alb.mveg', {
                url: '/mveg',
                templateUrl: 'scripts/main/camp/compras/lineas/matvegetal.html',
                controller: 'lCompMVegCtrl',
              }).
              state('main.camp.compras.edit.alb.otros', {
                url: '/otros',
                templateUrl: 'scripts/main/camp/compras/lineas/otros.html',
                controller: 'lCompOtrosCtrl',
              }).

///////////////// VENTAS //////////////////////
        state('main.camp.vtas', {
          url: '/ventas',
          templateUrl: 'scripts/main/camp/vtas/ventas.html',
          controller: 'VtasCtrl'
        }).

///////////////// ALMACEN //////////////////////
        state('main.camp.almac', {
          url: '/almacen',
          templateUrl: 'scripts/main/camp/almacen/almacen.html',
          controller: 'AlmacCtrl'
          }).

          state('main.camp.almac.abono', {
            url: '/abono',
            templateUrl: 'scripts/main/camp/almacen/abono/abono.html',
            controller: 'AlmAbonoCtrl',
            resolve: {
              abonos: function(CurrentFinca, ORM) {
                var model = {
                  finca: CurrentFinca.fincaCur().fincaId,
                  almacen: 'abonos'
                };
                return ORM.getAll(model, 'producto');
              },
            }
          }).

            state('main.camp.almac.searchabono', {
              url: '/searchabono',
              templateUrl: 'scripts/main/camp/almacen/abono/searchAbono.html',
              controller: 'SearchAbonoCtrl',
              resolve: {
                abonoList: function(CurrentFinca, ORM) {
                  var model = {
                    id: CurrentFinca.fincaCur().fincaId
                  };
                  return ORM.getAbonos(model, 'articulo');
                }
              }
            }).

          state('main.camp.almac.fito', {
            url: '/fitosanitario',
            templateUrl: 'scripts/main/camp/almacen/fitosanitario/fitosanitario.html',
            controller: 'AlmFitoCtrl',
            resolve: {
              fitos: function(CurrentFinca, ORM) {
                var model = {
                  finca: CurrentFinca.fincaCur().fincaId,
                  almacen: 'fitosanitarios'
                };
                return ORM.getAll(model, 'producto');
              },
            }
          }).

            state('main.camp.almac.fito.det', {
              url: '/:fitoId',
              templateUrl: 'scripts/main/camp/almacen/fitosanitario/searchFito.html',
              controller: 'SearchFitoCtrl',
              resolve: {
                fitoList: function(CurrentFinca, ORM) {
                  var model = {
                    id: CurrentFinca.fincaCur().fincaId
                  };
                  return ORM.getFitos(model, 'articulo');
                }
              }
            }).

            state('main.camp.almac.searchfito', {
              url: '/searchfito',
              templateUrl: 'scripts/main/camp/almacen/fitosanitario/searchFito.html',
              controller: 'SearchFitoCtrl',
              resolve: {
                fitoList: function(CurrentFinca, ORM) {
                  var model = {
                    id: CurrentFinca.fincaCur().fincaId
                  };
                  return ORM.getFitos(model, 'articulo');
                }
              }
            }).
          state('main.camp.almac.matveg', {
            url: '/mvegetal',
            templateUrl: 'scripts/main/camp/almacen/matvegetal/matvegetal.html',
            controller: 'AlmMVegCtrl',
            resolve: {
              variedades: function(CurrentFinca, ORM) {
                var model = {
                  id: CurrentFinca.fincaCur().fincaId,
                  almacen: 'material vegetal'
                };
                return ORM.getAll(model, 'producto');
              },
            }
          }).

///////////////// MAQUINARIA //////////////////////
        state('main.camp.maq', {
          url: '/maquinaria',
          abstract: true,
          templateUrl: 'scripts/main/camp/maquinaria/maquinaria.html',
          controller: 'MaqCtrl'
        }).

        state('main.camp.maq.prop', {
          url: '/propiedad',
          templateUrl: 'scripts/main/camp/maquinaria/propiedad/maqProp.html',
          controller: 'MaqPropCtrl',
          resolve: {
            maquinaria: function(CurrentFinca, ORM) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId,
                propiedad: 'propiedad'
              };
              return ORM.getAll(model, 'maquinaria');
            },
          }
        }).
        state('main.camp.maq.alq', {
          url: '/alquiler',
          templateUrl: 'scripts/main/camp/maquinaria/alquiler/maqAlq.html',
          controller: 'MaqAlqCtrl',
          resolve: {
            maquinaria: function(CurrentFinca, ORM) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId,
                propiedad: 'alquiler'
              };
              return ORM.getAll(model, 'maquinaria');
            },
          }
        }).

          state('main.camp.maq.prop.edit', {
            url: '/:maqId',
            templateUrl: 'scripts/main/camp/maquinaria/propiedad/editMaq.html',
            controller: 'EditMaqCtrl',
            resolve: {
              maquinaria: function($stateParams, ORM) {
                var model = {
                  id: $stateParams.maqId
                };
                return ORM.findOne(model, 'maquinaria');
              },
              tipomaquinas: function(CurrentFinca, ORM) {
                var model = {
                  id: CurrentFinca.fincaCur().fincaId
                };
                return ORM.getAll(model, 'tipomaq');
              },
            }
          }).

          state('main.camp.maq.alq.edit', {
            url: '/:maqId',
            templateUrl: 'scripts/main/camp/maquinaria/alquiler/editMaqAlq.html',
            controller: 'EditMaqCtrl',
            resolve: {
              maquinaria: function($stateParams, ORM) {
                var model = {
                  id: $stateParams.maqId
                };
                return ORM.findOne(model, 'maquinaria');
              },
              tipomaquinas: function(CurrentFinca, ORM) {
                var model = {
                  id: CurrentFinca.fincaCur().fincaId
                };
                return ORM.getAll(model, 'tipomaq');
              },
            }
          }).

          state('main.camp.maq.add', {
            url: '/add',
            abstract: true,
            template: '<div ui-view></div>'
          }).

            state('main.camp.maq.add.prop', {
              url: '/maquinaria/propiedad',
              templateUrl: 'scripts/main/camp/maquinaria/propiedad/addMaqProp.html',
              controller: 'AddMaqCtrl',
              resolve: {
                tipomaquinas: function(CurrentFinca, ORM) {
                  var model = {
                    id: CurrentFinca.fincaCur().fincaId
                  };
                  return ORM.getAll(model, 'tipomaq');
                },
              }
            }).

            state('main.camp.maq.add.alq1', {
              url: '/alquiler/proveedor',
              templateUrl: 'scripts/main/camp/maquinaria/alquiler/addMaqAlqProv.html',
              controller: 'AddMaqAlqCtrl',
              resolve: {
                tipomaquinas: function(CurrentFinca, ORM) {
                  var model = {
                    id: CurrentFinca.fincaCur().fincaId
                  };
                  return ORM.getAll(model, 'tipomaq');
                },
                proveedores: function(CurrentFinca, ORM) {
                  var model = {
                    finca: CurrentFinca.fincaCur().fincaId
                  };
                  return ORM.getAll(model, 'proveedor');
                },
                proveedor: function($stateParams, ORM) {
                  var model = {
                    id: $stateParams.provId
                  };
                  return ORM.findOne(model, 'proveedor');
                }
              }
            }).

            state('main.camp.maq.add.alq1.new', {
              url: '/new',
              templateUrl: 'scripts/main/camp/maquinaria/alquiler/newProveed.html',
              controller: 'AddProvMaqAlqCtrl',
            }).

            state('main.camp.maq.add.alq2', {
              url: '/alquiler/proveedor/:provId',
              templateUrl: 'scripts/main/camp/maquinaria/alquiler/addMaqAlq.html',
              controller: 'AddMaqAlqCtrl',
              resolve: {
                tipomaquinas: function(CurrentFinca, ORM) {
                  var model = {
                    id: CurrentFinca.fincaCur().fincaId
                  };
                  return ORM.getAll(model, 'tipomaq');
                },
                proveedores: function(CurrentFinca, ORM) {
                  var model = {
                    finca: CurrentFinca.fincaCur().fincaId
                  };
                  return ORM.getAll(model, 'proveedor');
                },
                proveedor: function($stateParams, ORM) {
                  var model = {
                    id: $stateParams.provId
                  };
                  return ORM.findOne(model, 'proveedor');
                }
              }
            }).

///////////////// RESUMEN //////////////////////
        state('main.camp.cmi', {
          url: '/cmandos',
          templateUrl: 'scripts/main/camp/cmi/cmi.html',
          controller: 'CmiCtrl'
        }).

          state('main.camp.cmi.espec', {
            url: '/:especId',
            templateUrl: 'scripts/main/camp/cmi/especies/especies.html',
            controller: 'CmiEspecCtrl',
            resolve: {
              especName: function($stateParams, CurrentFinca) {
                if ($stateParams.especId) {
                  return CurrentFinca.fincaCur().ejercCurso.especies.filter(function(item) {
                    return item.id == $stateParams.especId;
                  });
                }

              }
            }
          }).

            state('main.camp.cmi.espec.total', {
              url: '/total',
              templateUrl: 'scripts/main/camp/cmi/especies/total.html',
              controller: 'CmiTotalCtrl',
              resolve: {
                diarios: function($stateParams, CurrentFinca, ORM) {
                  var model = {
                    finca: CurrentFinca.fincaCur().fincaId,
                    ejerc: $stateParams.ejercId
                  };
                  return ORM.getAll(model, 'tipodiario');
                },
                reparto: function($stateParams, CurrentFinca, ORM) {
                  var model = {
                    finca: CurrentFinca.fincaCur().fincaId,
                    ejerc: $stateParams.ejercId
                  };
                  return ORM.getAll(model, 'repartocult')
                },
                totales: function($stateParams, ORM) {
                  var model = {
                    ejerc: $stateParams.ejercId
                  };
                  return ORM.getTotal(model, 'partecult')
                },
                amortizacion: function($stateParams, ORM, CurrentFinca) {
                  var model = {
                    ejerc: $stateParams.ejercId,
                    finca: CurrentFinca.fincaCur().fincaId,
                    propiedad: 'propiedad'
                  };
                  //console.log('Model: ' + JSON.stringify(model));
                  return ORM.getActive(model, 'maquinaria');
                }
              }

            }).

                state('main.camp.cmi.espec.total.costes', {
                  url: '/:tipoId',
                  templateUrl: 'scripts/main/camp/cmi/especies/costes/tipo.html'
                }).

                // state('main.camp.cmi.espec.total.amort', {
                //   url: '/amortizaciones',
                //   templateUrl: 'scripts/main/camp/cmi/especies/costes/amortizaciones.html'
                // }).


              state('main.camp.cmi.espec.total.isos', {
                url: '/:confeccId',
                templateUrl: 'scripts/main/camp/cmi/especies/ingresos/confeccion.html'
              }).

            state('main.camp.cmi.espec.ha', {
              url: '/ha',
              templateUrl: 'scripts/main/camp/cmi/especies/costes/costes.html'
            }).

            state('main.camp.cmi.espec.kg', {
              url: '/kg',
              templateUrl: 'scripts/main/camp/cmi/especies/costes/costes.html'
            }).

///////////////// CONFIGURACION //////////////////////
        state('main.camp.config', {
          url: '',
          abstract: true,
          template: '<div ui-view></div>',
          controller: '',
          resolve: {
            parcelas: function(CurrentFinca, ORM) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return ORM.getAll(model, 'parcela');
            },
            ejercicios: function(CurrentFinca, ORM) {
              var model = {
                id:CurrentFinca.fincaCur().fincaId
              };
              return ORM.getAll(model, 'ejercicio');
            },
            confecciones: function(ORM) {
              return ORM.getAll({}, 'confeccion');
            },
            unidades: function(ORM) {
              return ORM.getAll({}, 'unidad');
            },
          }
        }).

        state('main.camp.config.home', {
          url: '/config',
          templateUrl: 'scripts/main/camp/config/config.html',
          controller: 'ConfigCtrl',
          resolve: {
            finca: function(ORM, CurrentFinca) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return ORM.findOne(model, 'finca');
            },
            tiposdiario: function(ORM) {
              var model = {};
              return ORM.getAll(model, 'tipodiario');
            },
            especies: function(ORM, CurrentFinca) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return ORM.getAll(model, 'especie');
            },
            maquinaria: function(CurrentFinca, ORM) {
              var model = {
                id: CurrentFinca.fincaCur().fincaId
              };
              return ORM.getAll(model, 'tipomaq');
            },

          }
        }).

          state('main.camp.config.home.confecc', {
            url: '/confecciones',
            templateUrl: 'scripts/main/camp/config/confecciones/confecciones.html',
            controller: 'ConfigConfeccCtrl',
          }).

            state('main.camp.config.home.confecc.add', {
              url: '/add',
              templateUrl: 'scripts/main/camp/config/confecciones/add.html',
              controller: '',
            }).

            state('main.camp.config.home.confecc.edit', {
              url: '/:confeccId',
              templateUrl: 'scripts/main/camp/config/confecciones/edit.html',
              controller: 'ConfigConfeccEditCtrl',
              resolve: {
                confeccion: function($stateParams, ORM) {
                  var model = {
                    id: $stateParams.confeccId
                  };
                  return ORM.findOne(model, 'confeccion');
                }
              }
            }).

            state('main.camp.config.home.parc', {
              url: '/parcelas',
              templateUrl: 'scripts/main/camp/config/parcela/parcelas.html',
              controller: 'ConfigParcCtrl'
            }).

              state('main.camp.config.home.parc.add', {
                url: '/add',
                templateUrl: 'scripts/main/camp/config/parcela/add.html',
                controller: ''
              }).

              state('main.camp.config.home.parc.edit', {
                url: '/:parcId',
                templateUrl: 'scripts/main/camp/config/parcela/edit.html',
                controller: 'ConfigEditParcCtrl',
                resolve: {
                  parcela: function($stateParams, ORM) {
                    var model = {
                      id: $stateParams.parcId
                    };
                    return ORM.findOne(model, 'parcela');
                  }
                }
              }).

          state('main.camp.config.home.ejerc', {
            url: '/ejercicios',
            templateUrl: 'scripts/main/camp/config/ejercicio/ejercicios.html',
            controller: 'ConfigEjercCtrl'
          }).

            state('main.camp.config.home.ejerc.edit', {
              url: '/:campId',
              templateUrl: 'scripts/main/camp/config/ejercicio/edit/edit.html',
              controller: 'ConfigEditEjercCtrl',
              resolve: {
                ejercicio: function($stateParams, ORM) {
                  var model = {
                    id: $stateParams.campId
                  };
                  return ORM.findOne(model, 'ejercicio');
                },
              }
            }).

              state('main.camp.config.home.ejerc.edit.fchini', {
                url: '/inicio',
                templateUrl: 'scripts/main/camp/config/ejercicio/edit/fecha/fechaInic.html',
                controller: 'ConfigEditEjercFchCtrl',
              }).
              state('main.camp.config.home.ejerc.edit.fchfin', {
                url: '/fin',
                templateUrl: 'scripts/main/camp/config/ejercicio/edit/fecha/fechaFin.html',
                controller: 'ConfigEditEjercFchCtrl',
              }).

              state('main.camp.config.home.ejerc.edit.cult', {
                url: '/cultivo',
                templateUrl: 'scripts/main/camp/config/ejercicio/cultivo/cultivo.html',
                controller: 'ConfigEjercCultCtrl',
              }).

            state('main.camp.config.home.ejerc.add', {
              url: '/add',
              templateUrl: 'scripts/main/camp/config/ejercicio/add/add.html',
              resolve: {
                cultCur: function(PreEjercicio) {
                  return PreEjercicio.cultCur();
                },
                fchInic: function(PreEjercicio) {
                  return PreEjercicio.fchInic();
                },
                fchFin: function(PreEjercicio) {
                  return PreEjercicio.fchFin();
                }
              },
            }).

              state('main.camp.config.home.ejerc.add.fchini', {
                url: '/inicio',
                templateUrl: 'scripts/main/camp/config/ejercicio/edit/fecha/fechaInic.html',
                controller: 'ConfigEditEjercFchCtrl',
              }).
              state('main.camp.config.home.ejerc.add.fchfin', {
                url: '/fin',
                templateUrl: 'scripts/main/camp/config/ejercicio/edit/fecha/fechaFin.html',
                controller: 'ConfigEditEjercFchCtrl',
              }).

              state('main.camp.config.home.ejerc.add.cult', {
                url: '/cultivo',
                templateUrl: 'scripts/main/camp/config/ejercicio/cultivo/cultivo.html',
                controller: 'ConfigEjercCultCtrl',
              }).

          state('main.camp.config.user', {
            url: '/user',
            abstract: true,
            template: '<div ui-view></div>'
          }).

            state('main.camp.config.user.edit', {
              url: '/:userId',
              templateUrl: 'scripts/main/camp/config/usuario/usuario.html',
              controller: 'ConfigUserCtrl',
              resolve: {
                curUser: function($stateParams, ORM) {
                  var model = {
                    id: $stateParams.userId
                  };
                  return ORM.findOne(model, 'user');
                },
              }
            }).

            state('main.camp.config.useradd', {
              url: '/add',
              templateUrl: 'scripts/main/camp/config/usuario/addUsuario.html',
              controller: 'AddUserCtrl'
            }).

            state('main.camp.config.udadd', {
              url: '/addunit',
              templateUrl: 'scripts/main/camp/config/unidad/addUnidad.html',
              controller: 'AddUnidadCtrl'
            }).

            state('main.camp.config.udedit', {
              url: '/:udId/editunit',
              templateUrl: 'scripts/main/camp/config/unidad/editUnidad.html',
              controller: 'EditUnidadCtrl',
              resolve: {
                unidad: function($stateParams, ORM){
                  var model = {
                    id: $stateParams.udId
                  };
                  return ORM.findOne(model, 'unidad');
                }
              }
            }).

        state('main.camp.config.dia', {
          url: '/diario',
          abstract: true,
          template: '<div ui-view></div>'
        }).

          state('main.camp.config.dia.edit', {
            url: '/:diaId',
            templateUrl: 'scripts/main/camp/config/diario/diario.html',
            controller: 'ConfigDiarioCtrl',
            resolve: {
              diario: function($stateParams, ORM) {
                var model = {
                  id: $stateParams.diaId
                };
                return ORM.findOne(model, 'tipodiario');
              }
            }
          }).

        state('main.camp.config.adddia', {
          url: '/addDiario',
          abstract: true,
          template: '<div ui-view></div>'
        }).

          state('main.camp.config.adddia.new', {
            url: '/new',
            templateUrl: 'scripts/main/camp/config/diario/addDiario.html',
            controller: 'AddDiarioCtrl'
          })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
