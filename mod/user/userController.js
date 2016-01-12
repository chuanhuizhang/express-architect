module.exports = function(User) {

    this.create = function(req, res, next) {
        var user = new User({
            email: 'michael@bond.co',
            password: 'test1234',
            created_at: new Date()
        });

        user.save(function(err, userSaved) {
            if (err) throw err;
            res.json(userSaved);
        });
    }.;

    this.getAll = function(req, res, next) {

        User.find({}, function(err, users) {
            if (err) throw err;
            res.json(users);
        });
    };

    this.getUser = function(req, res, next) {
        console.log(req.params);
        res.json({success: true});
    };
}
