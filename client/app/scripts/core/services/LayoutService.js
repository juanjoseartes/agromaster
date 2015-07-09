/**
* This file contains all necessary Angular service definitions for 'frontend.core.layout' module.
*
* Note that this file should only contain services and nothing else.
*/
(function() {
  'use strict';

  // Generic service to return all available menu items for main level navigation.
  angular.module('App.core.services')
  .factory('HeaderService', [
    'AccessLevels',
    function factory(AccessLevels) {

      var item = {
        'inicio': [
          {
            state: 'main',
            title: 'Inicio',
            icon: 'ion-ios7-home',
            access: AccessLevels.user
          }
        ],
        'manoobra': [
          {
            state: 'main.camp.mobra',
            title: 'Mano de Obra',
            icon: 'ion-ios7-people',
            access: AccessLevels.user
          }
        ],
        'cultivo': [
          {
            state: 'main.camp.cult',
            title: 'Cultivo',
            icon: 'ion-ios7-bookmarks',
            access: AccessLevels.user
          }
        ],
        'recoleccion': [
          {
            state: 'main.camp.recolecc',
            title: 'Recoleccion',
            icon: 'ion-ios7-cart',
            access: AccessLevels.user
          }
        ],
        'lecturas': [
          {
            state: 'main.camp.lectu',
            title: 'Lecturas',
            icon: 'ion-ios7-analytics',
            access: AccessLevels.user
          }
        ],
        'tareas': [
          {
            state: 'main.camp.tprog',
            title: 'Tareas',
            icon: 'ion-ios7-calendar',
            access: AccessLevels.user
          }
        ],
        'analisis': [
          {
            state: 'main.camp.analisis',
            title: 'Analisis',
            icon: 'ion-ios7-settings-strong',
            access: AccessLevels.user
          }
        ],
        'residuos': [
          {
            state: 'main.camp.residuos',
            title: 'Gestion de Residuos',
            icon: 'ion-ios7-trash',
            access: AccessLevels.user
          }
        ],
        'scouting': [
          {
            state: 'main.camp.scout',
            title: 'Scouting',
            icon: 'ion-ios-search',
            access: AccessLevels.user
          }
        ],
        'compras': [
          {
            state: 'main.camp.compras',
            title: 'Compras',
            icon: 'ion-ios7-download',
            access: AccessLevels.user
          }
        ],
        'ventas': [
          {
            state: 'main.camp.vtas',
            title: 'Ventas',
            icon: 'ion-ios7-upload',
            access: AccessLevels.user
          }
        ],
        'almacen': [
          {
            state: 'main.camp.almac',
            title: 'Almacen',
            icon: 'ion-ios7-filing',
            access: AccessLevels.user
          }
        ],
        'maquinaria': [
          {
            state: 'main.camp.maq',
            icon: 'ion-ios7-cog',
            title: 'Maquinaria',
            access: AccessLevels.user
          }
        ],
        'resumen': [
          {
            state: 'main.camp.cmi',
            title: 'Resumen',
            icon: 'ion-ios7-pulse-strong',
            access: AccessLevels.admin
          }
        ],
        'configuracion': [
          {
            state: 'main.camp.config',
            title: 'Configuracion',
            icon: 'ion-ios7-toggle',
            access: AccessLevels.admin
          }
        ]
      };

      return {
        getItem: function getItem(module) {
          return item[module];
        }
      };
    }
  ])
  ;

  // Generic service to return all available menu items for specified sub level navigation.
  angular.module('App.core.services')
  .factory('NavbarService', [
    'AccessLevels',
    function factory(AccessLevels) {
      var items = {

        'manoobra': [
          {
            state: 'main.camp.mobra.presencia.inicio',
            title: 'Presencia',
            icon: 'ion-ios-camera-outline',
            access: AccessLevels.user
          },
          {
            state: 'main.camp.mobra.empleados',
            title: 'Empleados',
            icon: 'ion-ios-people-outline',
            access: AccessLevels.user
          },
          {
            state: 'main.camp.mobra.tarjetas',
            title: 'Tarjetas',
            icon: 'ion-ios-people-outline',
            access: AccessLevels.user
          }
        ],
        'cultivo': [
          {
            state: 'main.camp.cult.home.hoy.inic',
            title: 'Hoy',
            icon: 'ion-edit',
            access: AccessLevels.user
          },
          {
            state: 'main.camp.cult.home.ejerc',
            title: 'Campaña',
            icon: 'ion-calendar',
            access: AccessLevels.user
          }
        ],
        'recoleccion': [
          {
            state: 'main.camp.recolecc.home.espec.hoy.confecc',
            title: 'Hoy',
            icon: 'ion-edit',
            access: AccessLevels.user
          },
          {
            state: 'main.camp.recolecc.home.espec.ejerc.confecc',
            title: 'Campaña',
            icon: 'ion-calendar',
            access: AccessLevels.user
          }
        ],
        'lecturas': [
          {
            state: 'main.camp.lectu.ph.parc',
            title: 'pH',
            icon: 'ion-waterdrop',
            access: AccessLevels.user
          },
          {
            state: 'main.camp.lectu.ec.parc',
            title: 'eC',
            icon: 'ion-waterdrop',
            access: AccessLevels.user
          }
        ],
        'tareas': [
          {
            state: 'main.camp.tprog.riego',
            title: 'Hoy',
            icon: 'ion-edit',
            access: AccessLevels.user
          },
          {
            state: 'main.camp.tprog.abonado',
            title: 'Proximamente',
            icon: 'ion-calendar',
            access: AccessLevels.user
          },
          {
            state: 'main.camp.tprog.tratam',
            title: 'Vencidas',
            icon: 'ion-alert-circled',
            access: AccessLevels.user
          }
        ],
        'analisis': [
          {
            state: 'main.camp.analisis.tipo({tipoName: "suelo"})',
            title: 'Suelo',
            icon: 'ion-image',
            access: AccessLevels.user
          },
          {
            state: 'main.camp.analisis.tipo({tipoName: "planta"})',
            icon: 'ion-ios-nutrition',
            title: 'Planta',
            access: AccessLevels.user
          },
          {
            state: 'main.camp.analisis.tipo({tipoName: "agua"})',
            title: 'Agua',
            icon: 'ion-waterdrop',
            access: AccessLevels.user
          }
        ],
        'residuos': [
          {
            state: 'main.camp.residuos',
            title: 'Residuos',
            icon: 'ion-trash-a',
            access: AccessLevels.user
          }
        ],
        'scouting': [
          {
            state: 'main.camp.scout',
            title: 'Scouting',
            icon: 'ion-radio-waves',
            access: AccessLevels.user
          }
        ],
        'compras': [
          {
            state: 'main.camp.compras.home.alb',
            title: 'Albaranes',
            icon: 'ion-ios-photos-outline',
            access: AccessLevels.user
          },
          {
            state: 'main.camp.compras.home.fact',
            title: 'Facturas',
            icon: 'ion-ios-list-outline',
            access: AccessLevels.user
          }
        ],
        'ventas': [
          {
            state: 'main.camp.vtas',
            title: 'Albaranes',
            icon: 'ion-ios-photos-outline',
            access: AccessLevels.user
          },
          {
            state: 'main.camp.vtas',
            title: 'Facturas',
            icon: 'ion-ios-list-outline',
            access: AccessLevels.user
          }
        ],
        'almacen': [
          {
            state: 'main.camp.almac.abono',
            title: 'Fertilizantes',
            icon: 'ion-beaker',
            access: AccessLevels.user
          },
          {
            state: 'main.camp.almac.fito',
            title: 'Fitosanitarios',
            icon: 'ion-erlenmeyer-flask',
            access: AccessLevels.user
          },
          {
            state: 'main.camp.almac.matveg',
            title: 'Material Vegetal',
            icon: 'ion-leaf',
            access: AccessLevels.user
          }
        ],
        'maquinaria': [
          {
            state: 'main.camp.maq.prop',
            title: 'Propiedad',
            icon: 'ion-key',
            access: AccessLevels.user
          },
          {
            state: 'main.camp.maq.alq',
            title: 'Alquiler',
            icon: 'ion-ios-timer-outline',
            access: AccessLevels.user
          }
        ],
        'resumen': [
          {
            state: 'main.camp.cmi.espec.total',
            title: 'Total Eur',
            icon: 'ion-social-euro',
            access: AccessLevels.admin
          },
          {
            state: 'main.camp.cmi.espec.ha',
            title: 'Eur/Ha',
            icon: 'ion-qr-scanner',
            access: AccessLevels.admin
          },
          {
            state: 'main.camp.cmi.espec.kg',
            title: 'Eur/Kg',
            icon: 'ion-speedometer',
            access: AccessLevels.admin
          }
        ],
        'configuracion': [
          {
            state: '',
            title: 'Users',
            access: AccessLevels.admin
          },
          {
            state: '',
            title: 'Request log',
            access: AccessLevels.admin
          },
          {
            state: 'admin.login-history',
            title: 'Login history',
            access: AccessLevels.admin
          }
        ]
      };

      return {
        getItems: function getItems(section) {
          return items[section];
        }
      };
    }
  ])
  ;
}());
