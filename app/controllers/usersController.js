var exports = module.exports = {}
var bCrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');
var uploader = require('base64-image-upload');



// Get_All_UserDetails function
exports.GetAllUserDetails = function (req, res, models, app) {
    models.users.findAll().then(function (users) {
        if (users != undefined && users.length > 0) {
            data = {
                data: users,
                rowsPerPage: 15
            }
            res.json(data);
            return;
        } else {
            res.status(400).json({ error_msg: "No users found" });
            return;
        }
    }).catch(function (err) {
        console.log(err);
        res.status(400).json({ error_msg: "Something want wrong" });
        return;
    })
}

//forgot_password function
exports.forgotPassword = function (req, res, models, app) {
    if (req.body.email == undefined || req.body.email == null) {
        res.status(400).json({ error_msg: "no email address provided" })
        return;
    }
    models.users.findOne({ where: { email: req.body.email } }).then(function (user) {
        console.log("user email", user.email);
        if (user == undefined || user == null) {
            res.status(400).json({ error_msg: "No user found for provided Email Address" });
            return;
        }
        
        var newpassword = this.generatePassword();
        models.users.update({ password: newpassword }, { where: { email: user.email } })
            .then(function () {
                var smtpTransport = nodemailer.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    auth: {
                        user: 'apps.appsontechnologies@gmail.com',
                        pass: '@ppson@123'
                    }
                });
                var mailOptions = {
                    from: "WeGo-node-server <shailendra@appsontechnologies.in>",
                    to: user.email,
                    subject: "WeGo-node-server",
                    html: "Hello " + user.user_name + ", <br /><br />"
                        + "Please setup  your new password : &nbsp;" + "<b>" + newpassword + "</b>" + '\n\n' + "<p>Thank you,<br />WeGo-node-server team.</p>"
                }
                smtpTransport.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('error', error);
                        res.json({ status: false, message: "Error in sending mail." });
                        return;
                    } else {
                        res.json({ status: true, message: "Thank you! An email has been sent to " + user.email + " email id. Please check your inbox." });
                        return;
                    }
                });
            })
    }).catch(function (err) {
        console.log(err);
        res.status(400).json({ error_msg: "Something want wrong" });
        return;
    });
};

//generate Password function
generatePassword = function () {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$ABCDEFGHIJKLMNOP1234567890";
    var string_length = 8;
    var genPassword = '';
    var charCount = 0;
    var numCount = 0;
    for (var i = 0; i < string_length; i++) {
        if ((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
            var rnum = Math.floor(Math.random() * 10);
            genPassword += rnum;
            numCount += 1;
        } else {
            var rnum = Math.floor(Math.random() * chars.length);
            genPassword += chars.substring(rnum, rnum + 1);
            charCount += 1;
        }
    }
    return genPassword;
};

//change Password function
exports.changePassword = function (req, res, models, app) {
    console.log("USER_id------>", req.body.user_id);
    if (req.body.user_id == undefined || req.body.user_id == null) {
        res.status(400).json({ error_msg: "user_id not found in body" })
        return;
    }
    models.users.findOne({ where: { user_id: req.body.user_id } }).then(function (user) {
        if (user) {
            //console.log("User==>", user);
            models.users.update({ password: req.body.password }, { where: { user_id: user.user_id } })
                .then(function (result) {
                    res.json({ "success": true, msg: "Password Update successfully" }); return;
                })
        }
    });
};

//change update_Profile function
exports.updateUserProfile = function (req, res, models, app) {
    if (req.body.user_id == undefined || req.body.user_id == null) {
        res.status(400).json({ error_msg: "user_id not found in body" })
        return;
    }
    if (req.body.date_time == undefined || req.body.date_time == null) {
        res.status(400).json({ error_msg: "date_time not found in body" });
        return;
    }
   
    models.users.update({
        user_name: req.body.user_name,
        number: req.body.number,
        email: req.body.email,
        address: req.body.address,
        lat: req.body.lat,
        long: req.body.long,
        date_of_birth: req.body.date_of_birth,
        sex: req.body.sex,
        country: req.body.country,
        city: req.body.city,
        postal_code: req.body.postal_code,
        latitude: req.body.lat,
        longitude: req.body.long,
        name_appears_on_card: req.body.name_appears_on_card,
        expiration: req.body.expiration,
        security_code: req.body.security_code,
        fcm_token: req.body.fcm_token,
        device_type: req.body.device_type,
        date_time: req.body.date_time
    }, { where: { user_id: req.body.user_id }, returning: true, plain: true })
        .then(function (date) {
            res.json({ "success": true, "msg": "user updated successfully" });
            return;
        })
}


//logout function
exports.logout = function (req, res, models, app) {
    var user_id = req.body.user_id;
    if (user_id == undefined || user_id == null) {
        res.status(400).json({ error_msg: "user_id not found in body" })
        return;
    }
    models.users.update({ active: 0 }, {
        where: { user_id: user_id }
    }).then(function (err) {
        res.json({ "success": true, "msg": "User Logout successfull." });
    }).catch(function (err) {
        console.log(err);
        res.status(400).json({ error_msg: "Something went wrong" });
        return;
    })
};


//upload_Profile_Picture API
exports.uploadProfilePicture = function (req, res, models, app) {
    if (req.body.encoded_string == undefined || req.body.encoded_string == null) {
        res.status(400).json({ error_msg: "image not found in body" })
        return;
    }
    var base64 = req.body.encoded_string;
    var base64Data = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    console.log("base64Data--->", base64Data);
    var type = base64.split(';')[0].split('/')[1]
    console.log("type--->", type);
    s3.upload(function (err, base64Data) {
        if (err)
            res.status(400).json({ "err": err });
        else {
            models.users.findOne({ where: { user_id: req.body.user_id } }).then(function (user) {
                console.log("user-->", user.user_id);
                models.users.update({ image_url: base64Data }, { where: { user_id: user.user_id } }).then(function () {

                    res.json({ "profile_picture_url": data.Location })
                }).catch(function (err) {
                    console.log(err);
                    res.status(400).json({ error_msg: "Something want wrong" });
                    return;
                })
            })
        }
    });

}


//data:image/png;base64,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


exports.getProfileDetailById = function (req, res, models, app) {
    if(req.body.user_id==undefined || req.body.user_id==null){
        res.status(400).json({error_msg:"user_id not found in body"});
        return;
    }
    var user_id = req.body.user_id;
    
    var game = "SELECT COUNT(game_id) as POSTS FROM game where user_id = "+user_id+"";
    var invitation = "SELECT COUNT(invitation_id) as FRIENDS FROM invitation WHERE sent_user_id = "+user_id+" AND status = 1 ";
    var user = "SELECT user_name, image_url, latitude, longitude, profile_picture_url FROM users wher where user_id = "+user_id+"";
    var sports = "SELECT sports.sports_id, sports.sports_name, sports.sports_image FROM sports INNER JOIN fav_sports ON sports.sports_id = fav_sports.sports_id INNER JOIN users ON users.user_id = fav_sports.user_id WHERE users.user_id = "+user_id+"";
    var gallery = "SELECT gallery_url FROM gallery wher WHERE user_id = "+user_id+"";
    models.sequelize.query(game, {type: models.sequelize.QueryTypes.SELECT})
    .then(function(game){
        models.sequelize.query(invitation, {type:models.sequelize.QueryTypes.SELECT})
        .then(function(invitation){
            models.sequelize.query(user, {type:models.sequelize.QueryTypes.SELECT}).then(function(user){
                models.sequelize.query(sports, {type:models.sequelize.QueryTypes.SELECT}).then(function(sports){
                    models.sequelize.query(gallery, {type:models.sequelize.QueryTypes.SELECT}).then(function(gallery){
                        data = {
                            USER : user,
                            gallery:gallery,
                            SPORTS:sports,
                            POSTS : game[0].POSTS,
                            FRIENDS : invitation[0].FRIENDS,
                            MATCH : 30,
                            "status" : true
                        }
                        res.json(data)
                    });
                })
            })
        })
    })
};