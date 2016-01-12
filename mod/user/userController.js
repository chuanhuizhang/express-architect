module.exports = function(User) {
    return {
        create: function(req, res, next) {
            var user = new User({
                email: req.body.email,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                created_at: new Date()
            });

            user.save(function(err, userSaved) {
                if (err) throw err;
                res.json(userSaved);
            });
        },

        getAll: function(req, res, next) {
            User.find({}, function(err, users) {
                if (err) throw err;
                res.json(users);
            });
        },

        getById: function(req, res, next) {
            User.find({_id: req.params.id}, function(err, user) {
                if (err) throw err;
                res.json(user);
            });
        },

        signIn: function(req, res, next) {
            User.findOne({email: req.body.email}, function(err, user) {
                if (err) throw err;
                if (!user) {
                    res.status(401);
                    res.json({success: false, code: 401, msg: 'User does not exist!'});
                    return;
                }

                // Make sure the password is correct
                user.verifyPassword(req.body.password, function(err, isMatch) {
                    if (err) throw err;

                    // Password did not match
                    if (!isMatch) {
                        res.status(401);
                        res.json({success: false, code: 401, msg: 'User does not exist!'});
                        return;
                    }

                    user.password = undefined; // remove password in response
                    res.json(user);
                });
            });
        }
    }
}
