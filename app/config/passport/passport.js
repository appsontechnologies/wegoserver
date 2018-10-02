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
                            lat: req.body.lat,
                            long: req.body.long,
                            fcm_token: req.body.fcm_token,
                            date_time: req.body.date_time,
                            device_type: req.body.device_type,
                            active: 1,
                        };

                        Models.users.create(data).then(function (newUser, created) {
                            var base64Str = req.body.encoded_string;
                            var path = 'E://Node-Project/wegoServer/upload/';
                            var img = base64ToImage(base64Str, path);
                            Models.users.update({image_url: path + img.fileName},{where:{user_id:newUser.user_id}})
                            .then(function(result){
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


    //https://medium.com/@tkssharma/authentication-using-passport-js-social-auth-with-node-js-1e1ec7086ded

    //https://code.tutsplus.com/articles/social-authentication-for-nodejs-apps-with-passport--cms-21618
    passport.use('facebook', new FacebookStrategy({
        clientID: 244342072939022,
        clientSecret: '46bac1de6bb90c9a5cf7aec0d49b7457',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
        function (accessToken, refreshToken, profile, cb, done) {
            console.log("profile==>", profile);
            Models.users.findOrCreate({ facebookId: profile.id, name: profile.displayName },
                function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    return done(err, user);
                });
        }
    ));


    //https://www.djamware.com/post/59a6257180aca768e4d2b132/node-express-passport-facebook-twitter-google-github-login
    passport.use('google', new GoogleStrategy({
        clientID: "591307876438-4nmmm817vks785u467lo22kss40kqno2.apps.googleusercontent.com",
        clientSecret: 'shhh-its-a-secret',
        callbackURL: 'https://localhost:3000/auth/google/callback'
    },
        function (accessToken, refreshToken, profile, done) {
            console.log("google Call");
            Models.users.findOrCreate({ user_id: profile.id }, { name: profile.displayName, userid: profile.id },
                function (err, user) {
                    return done(err, user);
                })
        }
    ))
}

//Social Login Link facebook google, linkedIn Twitter
//https://medium.com/@tkssharma/authentication-using-passport-js-social-auth-with-node-js-1e1ec7086ded
