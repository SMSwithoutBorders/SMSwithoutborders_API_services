const db = require("../models");
const passport = require("passport");
var User = db.users;

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login/fail');
};

module.exports = (app) => {
    app.post("/login", passport.authenticate("local", {
        successRedirect: '/profile',
        // failureRedirect: '/login/fail'
    }), (req, res) => {
        res.json({
            message: "Successfully logedin"
        })
    });

    app.post('/register', async (req, res, next) => {
        let user = await User.findOne({
            where: {
                phone_number: req.body.username
            }
        });

        if (user) {
            const error = new Error("Phone number already in use");
            error.httpStatusCode = 400;
            return next(error);
        };

        await User.create({
            phone_number: req.body.username,
            password: req.body.password
        })

        res.json({
            message: "user created successfully"
        });
    });

    app.get('/login/fail', (req, res, next) => {
        const error = new Error("unauthorized please login");
        error.httpStatusCode = 401;
        next(error);
    });
}