var clubController = require('../controllers/clubController.js');
module.exports = function(app, passport, models) {
    //call base url 
    app.use('/wegoplay/api/club', function(req, res, next){
        console.log("Base url: " + req.baseUrl);
       next();
    })

    // registration_club API
    app.post('/wegoplay/api/club/registrationclub', function(req,res,next){
        clubController.registrationClub(req,res,models,app);
    });

    // update_club API
    app.post('/wegoplay/api/club/updateclub', function(req,res,next){
        clubController.updateClub(req,res,models,app);
    });

    // get_All_club API
    app.get('/wegoplay/api/club/getallclub', function(req,res,next){
        clubController.getAllClub(req,res,models,app);
    });


    // get_Club_By_Id API
    app.post('/wegoplay/api/club/getclubbyid', function(req,res,next){
        clubController.getClubById(req,res,models,app);
    });

}



