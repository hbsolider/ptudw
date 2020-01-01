var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
var User = require('../models/User');

module.exports = passport => {
    //passport init setup
    //serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.email);
    });

    passport.deserializeUser(async (email, done) => {
        var user = await User.findbyemail(email);
        if (!user) return done(new Error('user not found'));

        done(null, user[0]);
    });

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, async (req, email, password, done) => {
        const user = await User.findbyemail(email)
        if (!user.length) {
            return done(null, false, {
                message: 'Tài khoản này chưa được đăng kí!'
            });
        }
        bcrypt.compare(password, user[0].password, (err, isMatch) => {
            if (err) return done(err)
            if (isMatch) {
                req.session.profile = user[0];
                return done(null, user[0]);
            } else {
                return done(null, false, {
                    message: 'Mật khẩu không đúng'
                });
            }
        })

    }))


    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {

        var row = await User.findbyemail(email);
        if (row.length) {
            return done(null, false, {
                message: 'Email này đã có người sử dụng'
            });
        } else {
            //tạo user mới
            var newUser = new Object();
            newUser.email = email;
            newUser.password = bcrypt.hashSync(password, 10);
            newUser.permission = 0; // là người dùng mặc định có thể đấu giá và không thể bán 
            newUser.userphone = req.body.userphone;
            newUser.ranking=10;
            if (!req.body.username) {
                return done(null, false, {
                    message: "Vui lòng điền tên người dùng"
                });
            } else {
                newUser.username = req.body.username;
            }
            // insert 
            try {
                var result = await User.add(newUser);
                newUser.id = result.insertId;
                req.session.profile = newUser;
                return done(null, newUser);
            } catch (error) {
                done(error);
            }

        }
    }))

}