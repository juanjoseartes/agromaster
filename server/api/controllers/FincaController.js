/**
* FincaController
*
* @description :: Server-side logic for managing fincas
* @help        :: See http://links.sailsjs.org/docs/controllers
*/

module.exports = {

  getAll: function(req, res) {
    User.findOne(req.param('usuario'))
    .populate('fincas')
    .exec(function(error, models) {
      if (error) {
        res.send(400, 'Error busqueda fincas');
      }
      if (!models) {
        res.send(400, 'Finca no encontrada');
      }
      res.json(models);
    })

  },

  getOne: function(req, res) {
    var roomId = req.param('id');
    sails.models['finca'].findOne({id: req.param('id')})
    .populate('parcelas')
    .populate('ejercicios')
    .populate('usuarios')
    .populate('tipodiarios')
    .exec(function(error, model) {
      if (error) res.negotiate(error);

      // sails.sockets.join(req.socket, roomId);
      res.json(model);
    })
  },

  getCurso: function(req, res) {

    var user = req.param('id');
	  Finca.findOneByUsuarios(user)
	  .populate('ejercicios')
	  .exec(function(error, model) {
		  if (error) res.negotiate(error);

		  res.json(model);
	  })
  },

  findOne: function(req, res) {
    sails.models['finca'].findOne(req.param('id'))
    //.populate('parcelas')
    //.populate('ejercicios')
    .populate('usuarios')
    //.populate('tipodiarios')
    .exec(function(error, model) {
      if (error) res.negotiate(error);

      res.json(model);
    })
  },

  create: function(req, res, next) {

    var model = {
      name: req.param('name'),
      localidad: req.param('localidad'),
      provincia: req.param('provincia')
    };
    var curUser = {
      usuarios: req.param('usuario')
    };

    sails.models['finca'].create(model).exec(function (error, modelCreated) {

      if (error) {
        res.send(400, 'Error creando Finca.');
      }
      if (!modelCreated) {
        res.send(500, 'Finca no creada')
      }

      sails.models['finca'].findOne(modelCreated.id)
      .populate('usuarios')
      .exec(function(error, fincaCur) {
        if (error) {
          res.send(500, 'Error encontrando finca.');
        }
        if (!fincaCur) {
          res.send(400, 'Fincan no encontrada.');
        }

        fincaCur.usuarios.add(req.param('usuario'));
        fincaCur.save(function(error) {
          if (error) {
            res.send(500, 'Error guardando finca-usuario');
          }
        });
      });

      return res.json(modelCreated);
    });
  },

  upload: function(req, res) {
    if (req.method === 'GET')
      return res.json({'status': 'GET not allowed'});

      var uploadFile = req.file('uploadFile');
      console.log(uploadFile);

      uploadFile.upload({dirname: './assets/images'}, function onUploadComplete(err, files) {
        if (err) return res.negotiate(err);

          console.log(files);
          res.json({status: 200, file:files});
        });
      }

    };
