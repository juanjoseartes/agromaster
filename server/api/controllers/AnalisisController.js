/**
 * AnalisisController
 *
 * @description :: Server-side logic for managing analises
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs'),
uuid = require('node-uuid'),
path = require('path');

module.exports = {

	getAll: function(req, res) {
		var ejerc = req.param('ejerc');
		var tipo = req.param('tipo');

		if (tipo) {
			sails.models['analisis'].find({ejercicio: ejerc, tipo: tipo})
			.populate('laboratorio')
			.populate('informes')
			.exec(function(error, model) {
				if (error) return res.negotiate(error);

				sails.models['analisis'].watch(req.socket);
				sails.models['analisis'].subscribe(req.socket, model);
				res.json(model);
			})
		} else {
			sails.models['analisis'].find({ejercicio: ejerc})
			.populate('laboratorio')
			.populate('informes')
			.exec(function(error, model) {
				if (error) return res.negotiate(error);

				sails.models['analisis'].watch(req.socket);
				sails.models['analisis'].subscribe(req.socket, model);
				res.json(model);
			})
		}
	},

	findOne: function(req, res) {
		Analisis.findOne({id: req.param('id')})
		.exec(function(error, model) {
			if(error) return res.negotiate(error);

			res.json(model);
		});
	},

	create: function(req, res) {
		var laboratorio = req.param('laboratorio');
		var nref = req.param('nref');

		Analisis.findOrCreate({laboratorio: laboratorio, nref: nref}, req.allParams())
		.exec(function(error, model) {
			if (error) return res.negotiate(error);

			Laboratorio.findOne({id: laboratorio})
			.exec(function(error, lab) {
				if (error) return res.negotiate(error);

				var datosProveed = {
					name: lab.name,
					telef: lab.telef,
					email: lab.email,
					direccion: lab.direccion,
					codpostal: lab.codpostal,
					poblac: lab.poblac,
					provincia: lab.provincia
				};
				Proveedor.findOrCreate({name: datosProveed.name}, datosProveed)
				.exec(function(error, created) {
					if (error) return res.negotiate(error);
				});
			});

			Analisis.publishCreate(model);
			res.json(model);
		})
	},

	update: function(req, res) {
		var modelId = req.param('id');

		if (modelId && req.isSocket) {
			Analisis.update({id: req.param('id')}, req.allParams())
			.exec( function(err, model) {
				if (err) res.negotiate(err);

				Analisis.publishUpdate(model[0].id, model);
				res.json(model);
			});
		} else if (req.isSocket) {
			Analisis.find({})
			.exec(function(error, model) {
				if (error) res.negotiate(error);

				res.json(model);
			});
		}
	},

	destroy: function(req, res) {
		Analisis.destroy({id: req.param('id')})
		.exec(function (err) {
			if (err) return res.negotiate(err);

			Analisis.publishDestroy(req.param('id'));
		});
	},

	upload: function  (req, res) {
		if(req.method === 'GET')
			return res.json({'status':'GET not allowed'});                       // Call to /upload via GET is error
			// save original file name
			var origSize = req.file('file')._files[0].stream.size;
			var origType = req.file('file')._files[0].stream.type;
			var origFile = req.file('file')._files[0].stream.filename;
			var fch = new Date();
			//var filename = origifile;
			var uploadFile = req.file('file');
			//console.log('UploadFile: ' + JSON.stringify(uploadFile));

			uploadFile.upload({saveAs: origFile},function onUploadComplete (err, files) {              // Files will be uploaded to ./assets/images
				console.log('Files: ' + JSON.stringify(files));
				if (err) return res.serverError(err);
				// IF ERROR Return and send 500 error with error
				Analisis.findOne({id: req.param('anaId')})
				.exec(function(error, analisis) {
					if (error) return res.negotiate(error);

					var nref = analisis.nref;
					fs.rename(".tmp/uploads/"+files[0].filename, "uploads/analisis/" + nref +"_"+origFile, function(err){
						if (err) return res.negotiate(err);
					});

					res.json({status:200,file:files});

					var newFile = {
						name: origFile,
						size: files[0].size,
						filetype: files[0].type,
						analisis: req.param('anaId'),
						url: "uploads/analisis/" + nref + "_" +origFile,
					};
					Infolab.create(newFile)
					.exec(function(err, model) {
						if (err) res.negotiate(err);
						//Maquinaria.publishUpdate(model[0].id, model);
						//Infolab.publishAdd(req.param('anaId'), 'analisis', model.id, req.socket);
						console.log('Updated Infolab to have Id ' + model.id);
						res.json(model);
					});
					Analisis.publishUpdate(analisis.id, analisis);
				});
			});

		},

};
