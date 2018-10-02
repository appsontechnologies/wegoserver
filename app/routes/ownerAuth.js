var ownerAuthController = require('../controllers/ownerAuthController.js');

module.exports = function(app,passport,models) {

    app.use('/api/owner', function(req,res,next){
        console.log("Base url: " + req.baseUrl);
        next();
    })


    app.post('/api/owner/signup', passport.authenticate('owner-signup',{ session: false}), 
        function(req,res){
            if(req.user!=null){
                res.json(req.user);
            } else {
                res.status(400).json({error_msg: "User already exists"});
            }
        }
    );
    
    
}