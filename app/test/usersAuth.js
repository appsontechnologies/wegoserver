var usersAuthController = require('../controllers/usersAuthController.js');
var facebook = require('passport-facebook');
 var Strategy = require('passport-facebook').Strategy;
module.exports = function(app, passport, Sequelize) {

    app.use('/wegoplay/api/users', function(req, res, next){
        console.log("Base url: " + req.baseUrl);
        next();
    })
    
    // register authenticate API
    //https://www.djamware.com/post/58eba06380aca72673af8500/node-express-mongoose-and-passportjs-rest-api-authentication
    // register authenticate API
    app.post('/wegoplay/api/users/register', passport.authenticate('local-register', { session: false}),
    function(req, res){
        if(req.user!=null) {
           //res.json(req.user.user_id);
           res.json({"user_id":req.user.user_id,"success" : true, msg: "User Registration Successfully"});
           return;
        } 
        else  {
            res.json({"success" : false, msg: "User already exists"});
            return;
        }
    })

    app.post('/wegoplay/api/users/login', function(req, res, next){
        passport.authenticate('user-login', { session: false}, function(err, user, info){
            if(err){
                console.log("Error "+err);
                res.statusMessage = "Invalid Username or password";
                res.status(400).end();
                return;
            } if(user!=null) {
                //res.json(user);
                res.json({"user":user, "success" : true, msg: "User login Successfully"});
            } else {
                res.status(400).json({error_msg: "Login failed"});
            }
        }) (req, res, next);
        console.log("-----RESPONCE--->", res);
    });

    

    // app.get('/facebook/callback', function(req, res, next){
    //     passport.authenticate('facebook', function(err, user, info, req, accessToken, refreshToken, profile){
    //         console.log("call passport.authenticate ");
    //         if(profile){
    //             console.log("Profile==>"+profile);
    //         }
    //         if(err){
    //             console.log("Error "+err);
    //             res.statusMessage = "Invalid Username or password";
    //             res.status(400).end();
    //             return;
    //         } if(profile!==null) {
    //             //res.json(profile)
    //             res.json({"success" : true, msg: "User login successfully"});
    //         }
    //     })
    // });


    // app.get('/wegoplay/api/users/google/callback', function(req, res, next){
    //     console.log("function call");
    //     passport.authenticate('google', { session: false}, function(err, user, info){
    //         console.log("call passport.authenticate ");
    //         if(err) {
    //             console.log("Error "+err);
    //             res.statusMessage = "Invalid Username or password";
    //             res.status(400).end();
    //             return;
    //         } if(profile!==null) {
    //             res.json({"success" : true, msg: "User login successfully"});
    //         }
    //     })
    // });
}


// app.get('/wegoplay/api/users/userdetails', function(req,res,next){
//     console.log("call passport==>");
//     passport.use(new Strategy({
//         clientID: '244342072939022',
//         clientSecret: '46bac1de6bb90c9a5cf7aec0d49b7457',
//         callbackURL: 'http://localhost:3000/login/facebook/return'
//       },
//       function(accessToken, refreshToken, profile, cb) {
//         console.log("profile==>", profile);
//         return cb(null, profile);
//     }));
// });
