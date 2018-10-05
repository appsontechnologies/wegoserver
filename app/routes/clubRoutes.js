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

// https://jsoneditoronline.org/?id=06dd10fdc97a4c0ba2272da3fb983e08
// {
// 	"user_id":1,
// 	"club_name":"Holkar club",
// 	"address":"New Banganga Colony shahdol",
// 	"number":"98930666371",
// 	"postal_code":"452008",
// 	"account_to_receive_payments":"39900150006318",
// 	"name_holder":"shailendra",
// 	"club_lat":"20.36985",
// 	"club_long":63.25965,
// 	"generaly_monthy_free":"1000",
// 	"club_image":" ",
// 		"add_sports":[{
// 			"sports_name":"cricket",
// 			 "sex":"male",
// 			 "monthy_free":"3000",
// 			 "value_per_hours":"1000",
// 			 "changing_room":"available"
// 			}],
// 		"stadium":[{
// 			"Court n ":"1",
// 			"N players":"11"
// 		}]
// }
// --------------------------------------------
// {
// 	"user_id":2,
// 	"club_name":"Green Park",
// 	"address":"kolkata baxar",
// 	"number":"98930666351",
// 	"postal_code":"452008",
// 	"account_to_receive_payments":"39900150006395",
// 	"name_holder":"Ashiesh",
// 	"club_lat":"20.36985",
// 	"club_long":63.25965,
// 	"generaly_monthy_free":"1000",
// 	"club_image":" ",
// 		"add_sports":[{
// 			"sports_name":"cricket",
// 			 "sex":"male",
// 			 "monthy_free":"3000",
// 			 "value_per_hours":"1000",
// 			 "changing_room":"available",
// 			 "Court 1 ":"11",
// 			 "Court 2":"12",
// 			 "Court 3":"5"
// 			}]
		
// }