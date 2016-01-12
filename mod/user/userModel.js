module.exports = {
    schema: {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        firstname: {'type': String, required: true },
        lastname: {'type': String, required: true },
        created_at: { type: Date, required: true }
    },

    getInstance: function(db) {
        return db.model('User', db.schema(this.schema));
    }
}

