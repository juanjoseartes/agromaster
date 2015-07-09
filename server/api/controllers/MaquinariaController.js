/**
 * MaquinariaController
 *
 * @description :: Server-side logic for managing maquinarias
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs'),
	uuid = require('node-uuid'),
	path = require('path');

module.exports = {

	create: function(req, res) {

		var finca = req.param('finca');
		var marca = req.param('marca');
		var modelo = req.param('modelo');
		var matr = req.param('matricula')


		Maquinaria.findOrCreate({finca: finca, marca: marca, modelo: modelo, matricula: matr}, req.allParams())
		.exec(function(err, model) {
			if (err) res.negotiate(err);

			Maquinaria.publishCreate(model);
			res.json(model);
		})
	},

	update: function(req, res) {

			Maquinaria.update({id: req.param('id')}, req.allParams())
			.exec(function(err, model) {
				if (err) res.negotiate(err);

				Maquinaria.publishUpdate(model[0].id, model);
				//console.log('Model: ' + model[0]);
				res.json(model);
			});
	},

	getAll: function(req, res) {

		sails.models['maquinaria'].find({finca: req.param('id'), propiedad: req.param('propiedad')})
		.populate('tipomaq')
		.populate('grupomaq')
		.populate('images')
		.populate('proveedor')
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			sails.models['maquinaria'].watch(req);
			sails.models['maquinaria'].subscribe(req.socket, model);
			res.json(model);
		})
	},

	getActive: function(req, res) {

		var finca = req.param('finca');
		var prop = req.param('propiedad');
		var hoy = new Date();
		var curYear = hoy.getFullYear();
		//console.log('Model: ' + finca + ' ' + prop + ' ' + curYear);
		sails.models['maquinaria'].find({finca: finca, propiedad: prop, finamort: { '>=': curYear }})
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			res.json(model);
		});
	},

	findOne: function(req, res) {
		Maquinaria.findOne(req.param('id'))
		.populate('tipomaq')
		.populate('grupomaq')
		.populate('images')
		//.populate('detalles')
		.exec(function(error, model) {
			if (error) res.negotiate(error);

			res.json(model);
		});
	},

	upload: function  (req, res) {
		if(req.method === 'GET')
			return res.json({'status':'GET not allowed'});                       // Call to /upload via GET is error
			// save original file name
			var origSize = req.file('file')._files[0].stream.size;
			var origType = req.file('file')._files[0].stream.type;
			var origFile = req.file('file')._files[0].stream.filename;

			//var filename = origifile;
			var uploadFile = req.file('file');
			//console.log(uploadFile);

			uploadFile.upload({},function onUploadComplete (err, files) {              // Files will be uploaded to ./assets/images

				if (err) return res.serverError(err);
				// IF ERROR Return and send 500 error with error
				fs.rename("/tmp/uploads/"+files[0].filename, "images/" +origFile, function(err){
					if (err) return res.negotiate(err);
				 });

				res.json({status:200,file:files});
			});
				var newFile = {
					name: origFile,
					size: origSize,
					filetype: origType,
					maquinaria: req.param('maqId')
				};
				File.create(newFile)
				.exec(function(err, model) {
					if (err) res.negotiate(err);
					//Maquinaria.publishUpdate(model[0].id, model);
					console.log('Updated maquinaria to have image ' + model.id);
					//res.json(model);
				});

			},



};
