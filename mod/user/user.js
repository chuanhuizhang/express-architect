'use strict'

var UserModel = require('./userModel');
var UserController = require('./userController');

module.exports = function(options, imports, register) {
    var api = imports.api;
    var db = imports.db;
    var oauth = imports.oauth;

    var userModel = UserModel(db);
    var userController = UserController(userModel.getInstance());

    api.on({
        method: 'POST',
        path: '/users',
        handler: [oauth.isAuthenticated, userController.create]
    });

    api.on({
        method: 'GET',
        path: '/users',
        handler: [oauth.isAuthenticated, userController.getAll]
    });

    api.on({
        method: 'GET',
        path:'/users/:id',
        handler: [oauth.isAuthenticated, userController.getById]
    });

    api.on({
        method: 'POST',
        path:'/signin',
        handler: [oauth.isAuthenticated, userController.signIn]
    });

    register(null, {
        user: {}
    });

}
