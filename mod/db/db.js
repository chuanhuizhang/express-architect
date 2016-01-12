'use strict'

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/express-arch', {server:{auto_reconnect:true}});
console.log("connected to db");

var db = mongoose.connection;

db.on('error', function (err) {
	console.error('MongoDB connection error:', err);
});
db.once('open', function callback() {
	console.info('MongoDB connection is established');
});
db.on('disconnected', function() {
	console.error('MongoDB disconnected!');
	mongoose.connect(process.env.MONGO_URL, {server:{auto_reconnect:true}});
});
db.on('reconnected', function () {
	console.info('MongoDB reconnected!');
});

module.exports = function (options, imports, register) {

	register(null, {
		db: {
			schema: function(sch) {
				return new mongoose.Schema(sch);
			},
			model: function(name, schema) {
				return mongoose.model(name, schema);
			},
		}
	});
}
