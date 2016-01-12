'use strict'

var UserModel = require('./userModel');

module.exports = function(options, imports, register) {
    var api = imports.api;
    var db = imports.db;
    var oauth = imports.oauth;

    var User = UserModel.getInstance(db);

    var postUsers = function(req, res, next) {
        console.log(req.body);
        res.json({success: 'user has been created!'});
    }

    var getUser = function(req, res, next) {
        console.log(req.params);
        res.json({success: 'user'});
    }

    api.on({
        method: 'POST',
        path: '/users',
        handler: [oauth.isAuthenticated, postUsers]
    });

    api.on({
        method: 'GET',
        path:'/users/:id',
        handler: [oauth.isAuthenticated, getUser]
    });

    register(null, {
        user: {}
    });

}
