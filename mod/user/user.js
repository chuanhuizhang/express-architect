'use strict'

var UserModel = require('./userModel');
var UserController = require('./userController');

module.exports = function(options, imports, register) {
    var api = imports.api;
    var db = imports.db;
    var oauth = imports.oauth;

    var User = UserModel.getInstance(db);
    var userController = new UserController(User);

    var postUsers = function(req, res, next) {
        console.log(req.body);
        res.json({success: 'user has been created!'});
    }

    var getUser = function(req, res, next) {
        console.log(req.params);
        res.json({success: 'user'});
    }

    var signIn = function(req, res, next) {
        console.log(req.body);
        res.json({success: 'logged in'});
    }

    api.on({
        method: 'POST',
        path: '/users',
        handler: [oauth.isAuthenticated, postUsers]
    });

    api.on({
        method: 'GET',
        path:'/users/:id',
        handler: [oauth.isAuthenticated, userController.getUser]
    });

    api.on({
        method: 'POST',
        path:'/signin',
        handler: [oauth.isAuthenticated, signIn]
    });

    register(null, {
        user: {}
    });

}
