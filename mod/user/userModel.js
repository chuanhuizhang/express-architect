module.exports = function(db) {
    var schema = {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        firstname: {'type': String, required: true },
        lastname: {'type': String, required: true },
        created_at: { type: Date, required: true }
    }

    var UserSchema = db.schema(schema);

    return {
        getInstance: function() {
            return db.model('User', UserSchema);
        }
    }
}

