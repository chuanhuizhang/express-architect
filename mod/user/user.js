'use strict'

module.exports = function(options, imports, register) {
    var api = imports.api;
    var db = imports.db;
    var auth = imports.auth;

    var postUsers = function(req, res, next) {
        console.log(req.body);
        res.json({success: 'user has been created!'});
    }

    api.on({
        method: 'POST',
        path: '/users',
        handler: [auth.isAuthenticated, postUsers]
    });

    api.on({
        method: 'GET',
        path:'/users/:id',
        hander: [auth.isAuthenticated, getUser]
    });

    register(null, {
        user: {}
    });

}
