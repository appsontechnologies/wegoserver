var exports = module.exports = {}

exports.registrationClub = function(req,res,models,app) {
    if(req.body.user_id==undefined || req.body.user_id==null){
        res.status(400).json({error_msg:"user_id not found in body"})
        return;
    }
    if(req.body.club_name==undefined || req.body.club_name==null){
        res.status(400).json({error_msg:"club_name not found in body"})
        return;
    }
    if(req.body.number==undefined || req.body.number==null){
        res.status(400).json({error_msg:"number not found in body"})
        return;
    }
    if(req.body.postal_code==undefined || req.body.postal_code==null){
        res.status(400).json({error_msg:"postal_code not found in body"})
        return;
    }
    var data = {
        user_id:req.body.user_id,
        club_name:req.body.club_name,
        address:req.body.address,
        number:req.body.number,
        postal_code:req.body.postal_code,
        name_holder:req.body.name_holder,
        club_lat:req.body.club_lat,
        club_long:req.body.club_long,
        general_monthly_fee:req.body.generaly_monthy_free,
        account_to_receive_payments:req.body.account_to_receive_payments
    };
    models.clubs.create(data).then(function(club, created) {
        console.log("next functon call--->");
        var stadium = req.body.add_sports;
        var stadiums = [];
        for (var i = 0; i < stadium.length; i++){
            stadiums[i] = {};
            stadiums[i].sports_name = stadium[i].sports_name;
            stadiums[i].sex = stadium[i].sex;
            stadiums[i].monthy_free = stadium[i].monthy_free;
            stadiums[i].value_per_hours = stadium[i].value_per_hours;
            stadiums[i].changing_room = stadium[i].changing_room;
            
            console.log(stadiums[i]);

            // console.log("stadium-->",stadiums[i].sports_name);
            // console.log("stadium-->",stadiums[i].sex);
        }
        // var sport = {
        //     sex: req.body.sex,
        //     sports_name: req.body.sports_name,
        //     monthly_fee: req.body.monthly_fee,
        //     Value_per_hour: req.body.Value_per_hour,
        //     changing_rooms: req.body.changing_rooms,
        // }
        // models.sports.create(sport).then(function(sport, err){
        //     if(sport) {
        //         res.json({"success" : true, "msg":"club registration successfully"});
        //         return;
        //     }
        // })
    }).catch(function(err) {
        console.log(err);
        res.status(400).json({error_msg: "Something want wrong"});
        return;
    })
};


exports.updateClub = function(req,res,models,app) {
    if(req.body.club_id==undefined || req.body.club_id==null){
        res.status(400).json({error_msg:"club_id not found in body"})
        return;
    }


}

// get_all_club function
exports.getAllClub = function(req,res,models,app) {
    models.clubs.findAll().then(function(data){
        if(data!= undefined && data.length>0){
            data = {
                data: data,
                rowsPerPage: 15
            }
            res.json(data);
            return;
        } else {
            res.status(400).json({error_msg:"No club found"});
            return;
        }
    }).catch(function(err){
        console.log(err);
        res.status(400).json({error_msg: "Something want wrong"});
        return;
    })
    

}

// get_Club_By_Id function
exports.getClubById = function(req,res,models,app) {
    if(req.body.club_id==undefined || req.body.club_id==null){
        res.status(400).json({error_msg:"club_id not found in body"})
        return;
    }
    models.clubs.findOne({where:{club_id:req.body.club_id}}).then(function(club){
        if(club!=null){
            console.log("club_id-->",club.club_id);
            models.clubs.findOne({where:{club_id:club.club_id}}).then(function(data) {
                data = {
                    data: data,
                }
                res.json(data);
                return;
            })

        } else {
            res.status(400).json({"error_msg":"No club found for this club_id"});
            return;
        }
    })
}


