module.exports = {

    schema: {
        value: { type: String, required: true },
        type: { type: String, required: true },
        created_at: { type: Date, required: true },
        scope: {type: String, required: true},
        //credentials: { type: Schema.Types.ObjectId, ref: 'Credentials', required: true }
    },

    getInstance: function(db) {
        return db.model('Token', db.schema(this.schema));
    }
}

