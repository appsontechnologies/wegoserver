var gamesController = require('../controllers/gamesController.js');

module.exports = function (app, passport, models, config, admin) {

    app.use('/wegoplay/api/game', function (req, res, next) {
        console.log("Base url: " + req.baseUrl);
        next();
    })

    //games_list API
    app.get('/wegoplay/api/game/gameslist', function (req, res, next) {
        gamesController.gamesList(req, res, models, app);
    });

    //stadium lat_long API
    app.post('/wegoplay/api/game/clubsLatLong', function (req, res, next) {
        gamesController.clubsLatLong(req, res, models, app);
    });

    //create_games API
    app.post('/wegoplay/api/game/creategame', function (req, res, next) {
        gamesController.createGame(req, res, models, app);
    });

    //Club_Details_and_invite_friends API
    app.post('/wegoplay/api/game/clubdetailsandinvitefriends', function (req, res, next) {
        gamesController.clubDetailsAndInviteFriends(req, res, models, app);
    });

    //Send_Notification_And_Invite_Friends API
    app.post('/wegoplay/api/game/sendnotificationandinvitefriends', function(req,res,next){
        gamesController.sendNotificationAndInviteFriends(req,res,models,admin,config,app);
    });


    //accept_friend_request API
    app.post('/wegoplay/api/game/acceptfriendrequest', function(req,res,next){
        gamesController.acceptFriendRequest(req,res,models,app);
    });


    //PAYMENT OPTIONS API
    app.post('/wegoplay/api/game/setbankaccountdetails', function(req,res,next){
        gamesController.setBankAccountDetails(req,res,models,app);
    });

    //reserve_club API
    app.post('/wegoplay/api/game/reserveclub', function (req, res, next) {
        gamesController.reserveClub(req, res, models, app);
    });

    // get_search_game API
    app.post('/wegoplay/api/game/getsearchgame', function (req, res, next) {
        gamesController.getSearchGame(req, res, models, app);
    });

    // create_Join_Game API
    app.post('/wegoplay/api/game/joingame', function (req, res, next) {
        gamesController.joinGame(req, res, models, app);

    });

    // get_Game_List API
    app.post('/wegoplay/api/game/getgamelist', function (req, res, next) {
        gamesController.getGameList(req, res, models, app);
    });

    // RENT API
    // rent_For_Club API
    app.post('/wegoplay/api/game/rentforclub', function(req,res,next){
        gamesController.rentForClub(req,res,models,app);
    });

}