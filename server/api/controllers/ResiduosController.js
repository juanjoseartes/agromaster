/**
 * ResiduosController
 *
 * @description :: Server-side logic for managing residuos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs'),
uuid = require('node-uuid'),
path = require('path');

module.exports = {

	getAll: function(req, res) {
		sails.models['residuos'].find({ejercicio: req.param('ejerc')})
		.populate('gestor')
		.populate('albaranes')
		.exec(function(error, model) {
			if (error) return res.negotiate(error);

			sails.models['residuos'].watch(req.socket);
			sails.models['residuos'].subscribe(req.socket, model);
			res.json(model);
		});
	},

	findOne: function(req, res) {
		sails.models['residuos'].findOne({id: req.param('id')})
		.exec(function(error, model) {
			if(error) return res.negotiate(error);

			res.json(model);
		});
	},

	create: function(req, res) {
		Residuos.create(req.allParams())
		.exec(function(error, model) {
			if (error) return res.negotiate(error);

			Residuos.publishCreate(model);
			res.json(model);
		});
	},

	update: function(req, res) {
		Residuos.update({id: req.param('id')}, req.allParams())
		.exec(function(error, model) {
			if (error) return res.negotiate(error);

			Residuos.publishUpdate(model[0].id, model);
			res.json(model);
		});
	},

	destroy: function(req, res) {
		Residuos.destroy({id: req.param('id')})
		.exec(function(error) {
			if (error) return res.negotiate(error);

			Residuos.publishDestroy(req.param('id'));
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
				Residuos.findOne({id: req.param('resId')})
				.exec(function(error, residuos) {
					if (error) return res.negotiate(error);

					var nalb = residuos.nalbaran;
					fs.rename(".tmp/uploads/"+files[0].filename, "uploads/residuos/" + nalb +"_"+origFile, function(err){
						if (err) return res.negotiate(err);
					});

					res.json({status:200,file:files});

					var newFile = {
						name: origFile,
						size: files[0].size,
						filetype: files[0].type,
						residuos: req.param('resId'),
						url: "uploads/residuos/" + nalb + "_" +origFile,
					};
					Docresiduos.create(newFile)
					.exec(function(err, model) {
						if (err) res.negotiate(err);
						//Maquinaria.publishUpdate(model[0].id, model);
						//Infolab.publishAdd(req.param('anaId'), 'analisis', model.id, req.socket);
						console.log('Updated DocResiduos to have Id ' + model.id);
						res.json(model);
					});
					Residuos.publishUpdate(residuos.id, residuos);
				});
			});

		},

};
