'use strict';

var _ = require('lodash');

/**
 * Policy to check that request is done via authenticated user. This policy uses existing
 * JWT tokens to validate that user is authenticated. If use is not authenticate policy
 * sends 401 response back to client.
 *
 * @param   {Request}   request     Request object
 * @param   {Response}  response    Response object
 * @param   {Function}  next        Callback function
 *
 * @returns {*}
 */
module.exports = function(request, response, next) {
    sails.log.verbose(__filename + ':' + __line + ' [Policy.Authenticated() called]');

    // Get and verify JWT via service
    try {
        sails.services['token'].getToken(request, function verify(error, token) {
            if (!(_.isEmpty(error) && token !== -1)) {
                return response.json(401, {message: 'Given authorization token is not valid'});
            } else {
                // Store user id to request object
                request.token = token;

                // We delete the token from query and body to not mess with blueprints
                request.query && delete request.query.token;
                request.body && delete request.body.token;

                return next();
            }
        }, true);
    } catch (error) {
        return response.json(401, {message: error.message});
    }
};
