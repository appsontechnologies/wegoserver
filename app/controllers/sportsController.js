var exports = module.exports = {}


//create_sports services
exports.createSports = function(req, res, models, app) {
    if(req.body.sports_name==undefined || req.body.sports_name==null){
        res.status(400).json({error_msg:"sports_name not found in body"});
        return;
    }
    if(req.body.monthly_fee==undefined || req.body.monthly_fee==null){
        res.status(400).json({error_msg:"monthly_fee not found in body"});
        return;
    }
    if(req.body.sex==undefined || req.body.sex==null){
        res.status(400).json({error_msg:"sex not found in body"});
        return;
    }
    if(req.body.changing_room==undefined || req.body.changing_room==null){
        res.status(400).json({error_msg:"changing_room not found in body"});
        return;
    }
    if(req.body.value_per_hour==undefined || req.body.value_per_hour==null){
        res.status(400).json({error_msg:"value_per_hour not found in body"});
        return;
    }
    models.sports.create({sports_name:req.body.sports_name,
                        monthly_fee:req.body.monthly_fee,
                        sex:req.body.sex,
                        changing_rooms:req.body.changing_rooms,
                        value_per_hour:req.body.value_per_hour,
                        changing_room:req.body.changing_room,
                        selected_sport: false
                        }).then(function(){
                            res.json({"success" : true, "msg":"sports Created successfully"});
                            return;
                        }).catch(function(err){
                            console.log(err);
                            res.status(400).json({error_msg: "Something want wrong"});
                            return;
                        })
};

// get_all_sports services
exports.getAllSports = function(req,res,models,app) {
    models.sports.findAll().then(function(data){
        if(data!= undefined && data.length>0){
            data = {
                data: data,
                rowsPerPage: 15
            }
            res.json(data);
            return;
        } else {
            res.status(400).json({error_msg:"No sports found"});
            return;
        }
    }).catch(function(err){
        console.log(err);
        res.status(400).json({error_msg: "Something want wrong"});
        return;
    })
};

//get_All_Sports_By_Name services
exports.getAllSportsByName = function(req,res,models,app) {
    var query = "Select sports_id,sports_name,sports_image,selected_sport FROM sports";
    models.sequelize.query(query,{type: models.sequelize.QueryTypes.SELECT})
    .then(function(result){
        data = {
            data: result,
            "status" : true
        }
        res.json(data);
        return;
    }).catch(function(err){
        console.log(err);
        res.status(400).json({error_msg: "Something want wrong"});
        return;
    })
};


//update_sports_detail services
exports.updateSports = function(req,res,models,app) {
    if(req.body.sports_id==undefined || req.body.sports_name==null){
        res.status(400).json({error_msg:"sports_name not found in body"});
        return;
    }

};

// exports.uploadProfilePicture = function(req,res,models,app) {
//     console.log("HELLO ==========");
// }


