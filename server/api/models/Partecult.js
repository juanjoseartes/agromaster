/**
* Diario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    fecha: {
      type: 'date',
      required: true
    },
    tipo: {
      model: 'tipodiario',
      required: true
    },
    finca: {
      model: 'finca',
      required: true
    },
    ejercicio: {
      model: 'ejercicio',
      required: true
    },
    ejercId: {
      type: 'string'
    },
    tipoName: {
      type: 'string'
    },
    hinic: {
      type: 'time'
    },
    hfin: {
      type: 'time'
    },
    estado: {
      type: 'boolean',
      defaultsTo: false
    },
    parcelas: {
      collection: 'parccultivo',
      via: 'partecultivo'
    },
    repartos: {
      collection: 'repartocult',
      via: 'partecultivo'
    },
    totalparc: {
      type: 'float'
    },
    nparc: {
      type: 'integer'
    },
    materiales: {
      collection: 'matcultivo',
      via: 'partecultivo'
    },
    totalmat: {
      type: 'float'
    },
    nmat: {
      type: 'integer'
    },
    maquinaria: {
      collection: 'maqcultivo',
      via: 'partecultivo'
    },
    totalmaq: {
      type: 'float'
    },
    nmaq: {
      type: 'integer'
    },
    mobra: {
      collection: 'mocultivo',
      via: 'partecultivo'
    },
    totalmobra:{
      type: 'float'
    },
    nmobra: {
      type: 'integer'
    },
    otros: {
      collection: 'otroscultivo',
      via: 'partecultivo'
    },
    totalotros: {
      type: 'float'
    },
    notros: {
      type: 'integer'
    }

  }

};
