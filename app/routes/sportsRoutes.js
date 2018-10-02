var sportsController = require('../controllers/sportsController.js');

module.exports = function(app, passport, models) {

    app.use('/wegoplay/api/sports', function(req, res, next){
        console.log("Base url: " + req.baseUrl);
        next();
    })

    //create_sports API
    app.post('/wegoplay/api/sports/createsports', function(req,res,next){
        sportsController.createSports(req,res,models,app);
    });

    // sports_detail API
    app.get('/wegoplay/api/sports/getallsports', function(req,res,next){
        sportsController.getAllSports(req,res,models,app);
    });

    // update_sports_detail API
    app.post('/wegoplay/api/sports/updatesports', function(req,res,next){
        sportsController.updateSports(req,res,models,app);
    });

     // get_all_sports_by_name API
     app.post('/wegoplay/api/sports/getallsportsbyname', function(req,res,next){
        sportsController.getAllSportsByName(req,res,models,app);
    });


    // app.post('/wegoplay/api/sports/uploadprofilepicture', function(req,res,next){
    //     sportsController.uploadProfilePicture(req,res,models,app);
    // });

}