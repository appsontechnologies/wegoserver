var usersAuthController = require('../../controllers/usersAuthController');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bCrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var uploader = require('base64-image-upload');
var fs = require('fs');
var base64ToImage = require('base64-to-image');

module.exports = function (passport, models, app) {
    var Models = models;
    var LocalStrategy = require('passport-local').Strategy;


    // Serialize sessions
    passport.serializeUser(function (user, done) {
        done(null, user.user_id);
    });

    passport.deserializeUser(function (id, done) {
        Sequelize.users.find({ where: { user_id: user_id } }).success(function (user) {
            done(null, user);
        }).error(function (err) {
            done(err, null);
        });
    });


    passport.use('local-register', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            // var generateHash = function(password) {
            //     return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            // };
            //var password = Math.random().toString(36).slice(-8);

            var query = "Select * from users where email='" + email + "' or number='" + req.body.number + "';";
            Models.sequelize.query(query, { type: models.sequelize.QueryTypes.SELECT })
                .then(function (user) {
                    if (user.length > 0) {
                        //return done("User already exists");
                        return done(null,{ success: false, message: 'User already exists' });
                        return;
                    } else {
                        var security_code = req.body.security_code;
                        var generateHash = function (security_code) {
                            return bCrypt.hashSync(security_code, bCrypt.genSaltSync(8), null);
                        };
                        var security_code = Math.random().toString(36).slice(-8);
                        var data = {
                            email: email,
                            password: req.body.password,
                            security_code: security_code,
                            number: req.body.number,
                            user_name: req.body.user_name,
                            login_by: req.body.login_by,
                            date_of_birth: req.body.date_of_birth,
                            sex: req.body.sex,
                            city: req.body.city,
                            address: req.body.address,
                            country: req.body.country,
                            expiration: req.body.expiration,
                            postal_code: req.body.postal_code,
                            credit_card_number: req.body.credit_card_number,
                            name_appears_on_card: req.body.name_appears_on_card,
                            latitude: req.body.lat,
                            longitude: req.body.long,
                            fcm_token: req.body.fcm_token,
                            date_time: req.body.date_time,
                            device_type: req.body.device_type,
                            active: 1,
                        };

                        Models.users.create(data).then(function (newUser, created) {
                            var base64Str = req.body.encoded_string;
                            // var path = 'http://appsontechnologies.in/wegoplay/assets/gallery/';
                            var path = './upload/';
                            var img = base64ToImage(base64Str, path);
                            console.log("path----->", path+img.fileName);
                            Models.users.update({profile_picture_url: path + img.fileName},{where:{user_id:newUser.user_id}})
                            .then(function(result) {
                            var sports_id = req.body.sports;
                            var sports_ids = [];
                            for (var i = 0; i < sports_id.length; i++) {
                                //console.log(sports_id[i]);
                                sports_ids[i] = {};
                                sports_ids[i].user_id = newUser.user_id;
                                sports_ids[i].sports_id = sports_id[i].sports_id;
                                //console.log("sport_id-->",sports_ids[i].user_id);
                            }
                            Models.fav_sports.bulkCreate(sports_ids).then(function (newSports, created) {
                                //console.log("SPORE-->",newSports);
                                if (!newUser) {
                                    return done(null, false);
                                }
                                if (newUser) {
                                    return done(null, newUser);
                                }
                            })
                        });
                            
                        })
                    }
                });
        }
    ));


    passport.use('user-login', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            Models.users.findOne({ where: { email: username } }).then(function (user) {
                if (!user) {
                    console.log('Unknown user');
                    done('Unknown user');
                }
                if (password !== user.password) {
                    console.log("Checking username: " + username + " & password: " + user.password);
                    console.log('Invalid password');
                    done('Invalid password');
                }
                else {
                    Models.users.findOne({ where: { user_id: user.user_id } }).then(function (user) {
                        console.log("Login success, welcome " + user.user_name);
                        return done(null, user);
                    })
                }
            }).catch(function (err) {
                console.log("Error occured");
                console.log(err);
                done(err);
            });
        }
    ))
}