var usersController = require('../controllers/usersController.js');

module.exports = function(app, passport, models) {
    app.use('/wegoplay/api/users', function(req, res, next){
        console.log("Base url: " + req.baseUrl);
        next();
    })

     
    // get_All_user_details API
    app.get('/wegoplay/api/users/getalluserdetails', function(req,res,next){
        usersController.GetAllUserDetails(req,res,models,app);
    });

    //forgot_password API
    app.post('/wegoplay/api/users/forgotpassword', function(req,res,next){
        usersController.forgotPassword(req,res,models,app);
    });

    //Change_Password API 
    app.post('/wegoplay/api/users/changepassword', function(req,res,next){
        usersController.changePassword(req,res,models,app);
    })

    //update_profile API 
    app.post('/wegoplay/api/users/updateuserprofile', function (req,res,next){
        usersController.updateUserProfile(req,res,models,app);
    })

    //logout API
    app.post('/wegoplay/api/users/logout', function(req,res,next){
        usersController.logout(req,res,models,app);
    });

    // upload_Profile_Picture API
    app.post('/wegoplay/api/users/uploadprofilepicture', function(req,res,next){
        usersController.uploadProfilePicture(req,res,models,app);
    });

    // get_user_detail_ API
    app.get('/wegoplay/api/users/getalluserdetails', function(req,res,next){
        usersController.GetAllUserDetails(req,res,models,app);
    });
    // get_profile_detail API
    app.post('/wegoplay/api/users/getprofiledetailbyid', function(req,res,next){
        usersController.getProfileDetailById(req,res,models,app);
    });

}