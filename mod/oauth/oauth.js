'use strict'

var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy
var oauth2orize = require('oauth2orize');
var TokenModel = require('./tokenModel');

function uid (len) {
  var buf = [];
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charlen = chars.length;

  for (var i = 0; i < len; ++i) {
		buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function(options, imports, register) {
	var api = imports.api;
	var db = imports.db;

	var Token = TokenModel.getInstance(db);

	// Create OAuth 2.0 server
	var server = oauth2orize.createServer();

	server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback) {
	  var code = uid(16);
	  callback(null, code);
	}));

	server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, callback) {

		if (code == '0') {
			var token = new Token({
				value: uid(256),
				type: 'Access Token',
				created_at: new Date(),
				scope: '*'
			});

	    token.save(function (err) {
	      if (err) { return callback(err); }
	      callback(null, token);
	    });
		} else {
			callback(null, {access_token: uid(256)});
		}
	}));

	// server.authorization(function(clientId, redirectUri, callback) {

	//     Client.findOne({ id: clientId }, function (err, client) {
	//     	if (err) return callback(err);
	//     	return callback(null, client, redirectUri);
	//     });
	//  }),


	var authorzie = function(req, res, next) {
		console.log(req.query);
		res.render('signin', {redirect_url: req.query.redirect_url});
	}

	passport.use(new BearerStrategy(
	  function(accessToken, callback) {
	    Token.findOne({value: accessToken }, function (err, token) {
	      if (err) { return callback(err); }

	      // No token found
	      if (!token) { return callback(null, false); }
	      callback(null, {'type': 'app'}, { scope: '*' });
	      // User.findOne({ _id: token.userId }, function (err, user) {
	      //   if (err) { return callback(err); }

	      //   // No user found
	      //   if (!user) { return callback(null, false); }

	      //   // Simple example with no scope
	      //   callback(null, user, { scope: '*' });
	      // });
	    });
	  }
	));

	api.on({
		method: 'POST',
		path: '/oauth/token',
		handler: [server.token(), server.errorHandler()]
	});

	api.on({
		method: 'GET',
		path: '/oauth/authorize',
		handler: authorzie
	});

	register(null, {
		oauth: {
			isAuthenticated: passport.authenticate(['bearer'], { session : false })
		}
	});

}
