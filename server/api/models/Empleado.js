/**
* Empleado.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },
    apellidos: {
      type: 'string',
      required: true
    },
    tag: {
      model: 'tag'
    },
    tags: {
      collection: 'tag',
      via: 'emplHist'
    },
    active: {
      type: 'boolean',
      defaultsTo: true
    },
    tel: {
      type: 'string'
    },
    email: {
      type: 'string',
      email: true
    },
    direccion: {
      type: 'string'
    },
    poblacion: {
      type: 'string'
    },
    foto: {
      type: 'string'
    },
    nif: {
      type: 'string',
      required: true
    },
    nss: {
      type: 'string'
    },
    fincas: {
      collection: 'finca',
      via: 'empleados'
    },
    catprof: {
      model: 'catprof'
    },
    costjornal: {
      type: 'float',
      defaultsTo: 1
    },
    costhextra: {
      type: 'float',
      defaultsTo: 1
    },
    kmstte: {
      type: 'integer',
    },
    costportes: {
      type: 'float',
      defaultsTo: 1
    }

  }
};
