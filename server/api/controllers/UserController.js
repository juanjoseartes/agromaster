'use strict';

var _ = require('lodash');

/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = _.merge(_.cloneDeep(require('../base/Controller')), {

  create: function(req, res) {

    sails.models['user'].create({
      username: req.param('username'),
      firstName: req.param('firstName'),
      lastName: req.param('lastName'),
      email: req.param('email')
    }, function userCreated(err, newUser) {
      if (err) {

        console.log("err: ", err);
        console.log("err.invalidAttributes: ", err.invalidAttributes)

        // If this is a uniqueness error about the email attribute,
        // send back an easily parseable status code.
        if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
          && err.invalidAttributes.email[0].rule === 'unique') {
            return res.emailAddressInUse();
          }

          // Otherwise, send back something reasonable as our error response.
          return res.negotiate(err);
        }

        //Create Passport
        sails.models['passport'].create({
          protocol: 'local',
          password: req.param('password'),
          user: newUser.id
        })
        .exec(function(error, passport) {
          if (error) return res.negotiate(error);
          //console.log('Passport: ' + JSON.stringify(passport));
        });

        // Log user in
        //req.session.me = newUser.id;

        // Send back the id of the new user
        // return res.json({
        //   id: newUser.id
        // });
      });

    },

    getOne: function(req, res) {
      sails.models['user'].findOne({id: req.param('id')})
      .populate('fincas')
      .exec(function(error, user) {
        if (error) return res.negotiate(error);

        res.json(user);
      });
    }

});
