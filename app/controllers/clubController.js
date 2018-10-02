var exports = module.exports = {}

exports.registrationClub = function(req,res,models,app) {
    if(req.body.club_name==undefined || req.body.club_name==null){
        res.status(400).json({error_msg:"club_name not found in body"})
        return;
    }
    if(req.body.address==undefined || req.body.address==null){
        res.status(400).json({error_msg:"address not found in body"})
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
    if(req.body.name_holder==undefined || req.body.name_holder==null){
        res.status(400).json({error_msg:"name_holder not found in body"})
        return;
    }
    if(req.body.account_to_receive_payments==undefined || req.body.account_to_receive_payments==null){
        res.status(400).json({error_msg:"account_to_receive_payments not found in body"})
        return;
    }
    if(req.body.general_monthly_fee==undefined || req.body.general_monthly_fee==null){
        res.status(400).json({error_msg:"general_monthly_fee not found in body"})
        return;
    }
    if(req.body.sports_name==undefined || req.body.sports_name==null){
        res.status(400).json({error_msg:"sports_name not found in body"})
        return;
    }
    if(req.body.monthly_fee==undefined || req.body.monthly_fee==null){
        res.status(400).json({error_msg:"monthly_fee not found in body"})
        return;
    }
    if(req.body.sex==undefined || req.body.sex==null){
        res.status(400).json({error_msg:"sex not found in body"})
        return;
    }
    if(req.body.changing_rooms==undefined || req.body.changing_rooms==null){
        res.status(400).json({error_msg:"changing_rooms not found in body"})
        return;
    }
    if(req.body.Value_per_hour==undefined || req.body.Value_per_hour==null){
        res.status(400).json({error_msg:"Value_per_hour not found in body"})
        return;
    }
    var data = {
        club_name:req.body.club_name,
        address:req.body.address,
        number:req.body.number,
        postal_code:req.body.postal_code,
        name_holder:req.body.name_holder,
        general_monthly_fee:req.body.general_monthly_fee,
        account_to_receive_payments:req.body.account_to_receive_payments
    };
    models.clubs.create(data).then(function(club, created){
        var sport = {
            sports_name: req.body.sports_name,
            Value_per_hour: req.body.Value_per_hour,
            changing_rooms: req.body.changing_rooms,
            monthly_fee: req.body.monthly_fee,
            sex: req.body.sex,
        }
        models.sports.create(sport).then(function(sport, err){
            if(sport) {
                res.json({"success" : true, "msg":"club registration successfully"});
                return;
            }
        })
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


