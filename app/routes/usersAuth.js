var usersAuthController = require('../controllers/usersAuthController.js');
var facebook = require('passport-facebook');
 var Strategy = require('passport-facebook').Strategy;
module.exports = function(app, passport, models, sequelize ) {
    var Models = models;
    
    app.use('/wegoplay/api/users', function(req, res, next){
        console.log("Base url: " + req.baseUrl);
        next();
    })
    
    // register authenticate API
    app.post('/wegoplay/api/users/register', passport.authenticate('local-register', { session: false}),
    function(req, res){
        if(req.user!=null) {
           //res.json(req.user.user_id);
           res.json({"user_id":req.user.user_id,"success":true,msg:"User Registration Successfully"});
           return;
        } 
        else  {
            res.json({"success" : false, msg: "User already exists"});
            return;
        }
    })


    app.post('/wegoplay/api/users/login', function(req, res, next){
        //console.log(req);
       var data = {
            user_id : req.body.user_id,
            latitude : req.body.lat,
            longitude : req.body.long,
            email : req.body.email,
            number: req.body.number,
            login_by: req.body.login_by,
            fcm_token : req.body.fcm_token,
            device_type : req.body.device_type,
            user_name : req.body.social_name,
            social_unique_id : req.body.social_unique_id,
            profile_picture_url : req.body.profile_picture_url,
            number:9893066675
        }
        var menual_data = {
            user_id : req.body.user_id,
            lat : req.body.lat,
            long : req.body.long,
            login_by: req.body.login_by,
            fcm_token : req.body.fcm_token,
            device_type : req.body.device_type
        }
        console.log('Social Uniq id - ',data.social_unique_id);
       // Models.users.create(data).then(function(created){
           if(data.social_unique_id==null || data.social_unique_id==''){

            passport.authenticate('user-login', { session: false}, function(err, user, info){
            if(err){
                console.log("Error "+err);
                res.statusMessage = "Invalid Username or password";
                res.json({"success" : false, msg: "Invalid Username or password"});
                res.status(400).end();
                return;
            } if(user!=null) {
                //res.json(user);
                res.json({"user":user, "success" : true, msg: "User login Successfully"});
                Models.users.update(menual_data, {where:{user_id:menual_data.user_id}}).then(function(){

                })
            } else {
                res.status(400).json({error_msg: "Login failed"});
            }
        }) 
        (req, res, next);
       
        } else if(data.social_unique_id !=null || data.social_unique_id !=''){
            Models.users.create(data).then(function(created){
                //console.log("CREATE--->", created);
                (req, res, next); 
                res.json({"user":created, "success" : true, msg: "User login Successfully"});  
            })
        }
    });
}



