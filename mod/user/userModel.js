'use strict'

var bcrypt = require('bcrypt-nodejs');

module.exports = function(db) {
    var schema = {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        firstname: {'type': String, required: true },
        lastname: {'type': String, required: true },
        created_at: { type: Date, required: true }
    }

    var UserSchema = db.schema(schema);

    // Execute before each user.save() call
    UserSchema.pre('save', function(callback) {
        var user = this;

        // Break out if the password hasn't changed
        if (!user.isModified('password')) return callback();

        // Password changed so we need to hash it
        bcrypt.genSalt(5, function(err, salt) {
            if (err) return callback(err);

            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) return callback(err);
                user.password = hash;
                callback();
            });
        });
    });

    return {
        getInstance: function() {
            return db.model('User', UserSchema);
        }
    }
}

