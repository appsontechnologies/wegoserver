var exports = module.exports = {}

//games_List services
exports.gamesList = function(req, res, models, app){
    var query = "SELECT sports_id, square_sports_image, sports_name from sports";
    models.sequelize.query(query, { type: models.sequelize.QueryTypes.SELECT })
    .then(function (games, err) {
        if (games) {
            res.json({ games, "success": true });
            return;
        }
    }).catch(function (err) {
        console.log(err);
        res.status(400).json({ error_msg: "Something went wrong" });
        return;
    })
}


//stadium_Lat_Long services
exports.clubsLatLong = function(req, res, models, app){
    if(req.body.sports_id==undefined || req.body.sports_id==null){
        res.status(400).json({error_msg:"sports_id not found in body"});
        return;
    }
    var sports_id = req.body.sports_id;
    var query = " SELECT club_details.club_id, club_details.club_name, club_details.user_id, club_details.general_monthly_fee, club_details.club_lat, club_details.club_long, club_sports.club_sports_name, club_sports.sports_id FROM club_details INNER JOIN club_sports ON club_details.club_id = club_sports.club_id WHERE club_sports.sports_id = "+sports_id+"";
    models.sequelize.query(query, { type: models.sequelize.QueryTypes.SELECT })
    .then(function (data, err) {
        if (data) {
            res.json({ data, "success": true });
            return;
        }
    }).catch(function (err) {
        console.log(err);
        res.status(400).json({ error_msg: "Something went wrong" });
        return;
    })
}


//create_games services
exports.createGame = function(req, res, models, app) {
    if(req.body.user_id==undefined || req.body.user_id==null){
        res.status(400).json({error_msg:"user_id not found in body"});
        return;
    }
    if(req.body.club_id==undefined || req.body.club_id==null){
        res.status(400).json({error_msg:"club_id not found in body"});
        return;
    }
    if(req.body.sports_id==undefined || req.body.sports_id==null){
        res.status(400).json({error_msg:"sports_id not found in body"});
        return;
    }
    if(req.body.game_name==undefined || req.body.game_name==null){
        res.status(400).json({error_msg:"game_name not found in body"});
        return;
    }
    if(req.body.date==undefined || req.body.date==null){
        res.status(400).json({error_msg:"date not found in body"});
        return;
    }

    if(req.body.no_of_player==undefined || req.body.no_of_player==null){
        res.status(400).json({error_msg:"no_of_player not found in body"});
        return;
    }
    if(req.body.start_time==undefined || req.body.start_time==null){
        res.status(400).json({error_msg:"start_time not found in body"});
        return;
    }
    if(req.body.end_time==undefined || req.body.end_time==null){
        res.status(400).json({error_msg:"end_time not found in body"});
        return;
    }
    if(req.body.start_time_pos==undefined || req.body.start_time_pos==null){
        res.status(400).json({error_msg:"start_time_pos not found in body"});
        return;
    }
    if(req.body.end_time_pos==undefined || req.body.end_time_pos==null){
        res.status(400).json({error_msg:"end_time_pos not found in body"});
        return;
    }
    models.game.create(
        {
            game_name: req.body.game_name,
            sex : req.body.sex, 
            date : req.body.date,
            start_time : req.body.start_time,
            end_time : req.body.end_time, 
            level : req.body.level,
            friends : req.body.friends,
            pp_type : req.body.pp_type,
            friends : req.body.friends,
            total : req.body.total,
            club_id : req.body.club_id,
            user_id : req.body.user_id,
            sports_id : req.body.sports_id,
            total : req.body.total,
            start_time_pos: req.body.start_time_pos,
            end_time_pos: req.body.end_time_pos,
            no_of_player : req.body.no_of_player
        }
    ).then(function (create, err) {
        if(create) {
            res.json(
                {
                    game_id: create.game_id,
                    "success" : true, 
                    msg: "Game create Successfully."
                }
            );
            return;
        }
    }).catch(function(err){
        console.log(err);
        res.status(400).json({error_msg: "Something went wrong"});
        return;
    })
};


//clubDetailsAndInviteFriends services
exports.sendNotificationAndInviteFriends = function (req, res, models, admin, config, app) {
     var invitation = req.body.invitation;
    var invitations = [];
    var invite_type = "game_invitation";
    var datas = [];

    if (req.body.invitation == null) {
        console.log('Please enter the parameter');
    }
    else {
        for (var i = 0; i < invitation.length; i++) {
            if (req.body.invitation[i].sent_user_id == undefined || req.body.invitation[i].sent_user_id == null) {
                res.status(400).json({ error_msg: "sent_user_id not found in body" });
                return;
            }
            if (req.body.invitation[i].received_user_id == undefined || req.body.invitation[i].received_user_id == null) {
                res.status(400).json({ error_msg: "received_user_id not found in body" });
                return;
            }
            if (req.body.invitation[i].token == undefined || req.body.invitation[i].token == null) {
                res.status(400).json({ error_msg: "token not found in body" });
                return;
            }

            var message = {
                
                notification: {
                    title: invitation[i].title,
                    body : JSON.stringify (
                        { "payload": 
                            {   "sent_user_id": "" + invitation[i].sent_user_id,
                                "invite_type": "" +invite_type,
                                "sent_user_name": "" + invitation[i].body,
                                "sent_user_name": "" + invitation[i].sent_user_name
                            }
                        }
                    )
                },
                android: {
                    ttl: 3600 * 1000,
                    notification: {
                        color: '#f45342',
                        sound: "default",
                    },
                },
                // payload : {
                //     "sent_user_id": "" + invitation[i].sent_user_id,
                //     "sent_user_name": "" + invitation[i].body,
                //     "sent_user_name": "" + invitation[i].sent_user_name,
                //     "invite_type": "" + invitation[i].invite_type,
                // },
                token: invitation[i].token
            };

            invitations.push({
                sent_user_id: invitation[i].sent_user_id,
                received_user_id: invitation[i].received_user_id,
                sent_user_name: invitation[i].sent_user_name,
                token: invitation[i].token,
                status: 0,
                invite_type: "game_invitation",
                notification_text: invitation[i].body + invitation[i].sent_user_name,
            })
        }
        admin.messaging().send(message).then(function (response, err) {
            console.log("notification_id-->", response);
            if (response != null) {
                models.invitation.bulkCreate(invitations).then(function (result, err) {
                    res.json({ success: true, msg: "Notification Send Successfully" });
                    return;
                })
            }
        }).catch(function (err) {
            console.log(err);
            res.json({ success: false, msg: "registration-token-not-registered" });
            return;
        });
    }

    // var invitation = req.body.invitation;
    // var invitations = [];
    // var invite_type = "game_invitation";
    // var datas = [];

    // if (req.body.invitation == null) {
    //     console.log('Please enter the parameter');
    // }
    // else {
    //     for (var i = 0; i < invitation.length; i++) {
    //         if (req.body.invitation[i].sent_user_id == undefined || req.body.invitation[i].sent_user_id == null) {
    //             res.status(400).json({ error_msg: "sent_user_id not found in body" });
    //             return;
    //         }
    //         if (req.body.invitation[i].received_user_id == undefined || req.body.invitation[i].received_user_id == null) {
    //             res.status(400).json({ error_msg: "received_user_id not found in body" });
    //             return;
    //         }
    //         if (req.body.invitation[i].token == undefined || req.body.invitation[i].token == null) {
    //             res.status(400).json({ error_msg: "token not found in body" });
    //             return;
    //         }

    //         var message = {
    //             notification: {
    //                 title: invitation[i].title,
    //                 body: invitation[i].sent_user_id + ',' + invitation[i].title + invitation[i].body + invitation[i].sent_user_name 
    //             },
    //             android: {
    //                 ttl: 3600 * 1000,
    //                 notification: {
    //                     color: '#f45342',
    //                     sound: "default",
    //                 },
    //             },
    //             data: {"sent_user_id": "" + invitation[i].sent_user_id},
    //             token: invitation[i].token
    //         };

    //         invitations.push({
    //             sent_user_id: invitation[i].sent_user_id,
    //             received_user_id: invitation[i].received_user_id,
    //             sent_user_name: invitation[i].sent_user_name,
    //             token: invitation[i].token,
    //             status: 0,
    //             invite_type: "game_invitation",
    //             notification_text: invitation[i].body + invitation[i].sent_user_name,
    //         })
    //     }
    //     admin.messaging().send(message).then(function (response, err) {
    //         console.log("notification_id-->", response);
    //         if (response != null) {
    //             models.invitation.bulkCreate(invitations).then(function (result, err) {
    //                 res.json({ success: true, msg: "Notification Send Successfully" });
    //                 return;
    //             })
    //         }
    //     }).catch(function (err) {
    //         console.log(err);
    //         res.json({ success: false, msg: "registration-token-not-registered" });
    //         return;
    //     });
    // }
};



exports.clubDetailsAndInviteFriends = function(req,res,models,app) {
    if(req.body.club_id==undefined || req.body.club_id==null){
        res.status(400).json({error_msg:"club_id not found in body"});
        return;
    }
    if(req.body.game_id==undefined || req.body.club_id==null){
        res.status(400).json({error_msg:"club_id not found in body"});
        return;
    }
    var game_id = req.body.game_id;
    var user_id = req.body.user_id;

    models.club_details.findOne({wher:{club_id: req.body.club_id}}).then(function(club){
        if(club!=null){
            var club = "select club_id, club_name, address, number, club_lat, club_long, createdAt from club_details where club_id = "+req.body.club_id+"";
            var game = "select game_id, game_name,date, no_of_player, level, pp_type from game where game_id = "+game_id+"";
            var users ="select user_id, user_name, profile_picture_url, fcm_token, latitude, longitude FROM users where user_id NOT IN ('"+user_id+"')";
            models.sequelize.query(club, { type: models.sequelize.QueryTypes.SELECT}).then(function(club){
                models.sequelize.query(game, { type: models.sequelize.QueryTypes.SELECT }).then(function (game) {
                    models.sequelize.query(users, { type: models.sequelize.QueryTypes.SELECT }).then(function(users, err){
                        data = {
                            club_details : club,
                            game_details : game,
                            friends      :  users,
                            "success"    : true
                        }
                        res.json(data)
                        return;
                    })
                })
            })
        } else {
            res.json({ success: false, message: "club_id not found for club." });
            return;

        }
    })
};


// // send_Notification_And_Invite_Friends services
// exports.sendNotificationAndInviteFriends = function(req,res,models,admin,config,app){
//     var invitation = req.body.invitation;
//     var invitations = [];
//     var datas = [];

//     if (req.body.invitation == null) {
//         console.log('Please enter the parameter');
//     }
//     else {
//         for (var i = 0; i < invitation.length; i++) {
//             if (req.body.invitation[i].sent_user_id == undefined || req.body.invitation[i].sent_user_id == null) {
//                 res.status(400).json({ error_msg: "sent_user_id not found in body" });
//                 return;
//             }
//             if (req.body.invitation[i].received_user_id == undefined || req.body.invitation[i].received_user_id == null) {
//                 res.status(400).json({ error_msg: "received_user_id not found in body" });
//                 return;
//             }
//             if (req.body.invitation[i].token == undefined || req.body.invitation[i].token == null) {
//                 res.status(400).json({ error_msg: "token not found in body" });
//                 return;
//             }
        
//             var message = {
//                 notification: {
//                     title: invitation[i].title,
//                     body : invitation[i].sent_user_id + ',' + invitation[i].body + ',' + invitation[i].sent_user_name + ',' + invite_type,
                    
//                 },
//                 android: {
//                     ttl: 3600 * 1000,
//                     notification: {                     
//                     color: '#f45342',
//                     sound : "default",
//                     },
//                 },
//                 data : { "sent_user_id": "" + invitation[i].sent_user_id },
//                 token : invitation[i].token,
//             };

//             invitations.push({
//                 sent_user_id: invitation[i].sent_user_id,
//                 received_user_id: invitation[i].received_user_id,
//                 sent_user_name: invitation[i].sent_user_name,
//                 token: invitation[i].token,
//                 status: 0,
//                 //invite_type: invitation[i].invite_type,
//                 invite_type: 'game_invitation' ,
//                 notification_text: invitation[i].body + invitation[i].sent_user_name,
//             })
//         }  
//         admin.messaging().send(message).then(function (response, err) {
//             if (response!=null) {
//                 models.invitation.bulkCreate(invitations).then(function (result, err) {
//                     res.json({ success: true, msg: "Notification Send Successfully" });
//                     return;
//                 })
//             } 
//         }).catch(function (err) {
//             console.log(err);
//             res.json({ success: false, msg: "registration-token-not-registered" });
//             return;
//         })
//     }
// };


//accept_Friend_Request services
exports.acceptFriendRequest = function(req, res, models, app) {
    if(req.body.received_user_id==undefined || req.body.received_user_id==null){
        res.status(400).json({error_msg:"received_user_id not found in body"});
        return;
    }
    models.invitation.findOne({where:{received_user_id: req.body.received_user_id}}).then(function(user){
        if(user!=null) {
            models.invitation.update({status : 1}, {where:{received_user_id: req.body.received_user_id}
            }).then(function(){
                res.json(
                    {
                        "success": true,
                        msg: "friend request accept successfully" 
                    }
                );
                return;
            })
        } else {
            res.json(
                {
                    success: false, 
                    msg: "un registered user." 
                }
            );
            return;
        }
    })
};

//  COMMON API Using All Function
//set_Bank_Account_Details services 
exports.setBankAccountDetails = function(req, res, models, app) {
    if(req.body.user_id==undefined || req.body.user_id==null){
        res.status(400).json({error_msg:"user_id not found in body"});
        return;
    }
    if(req.body.club_id==undefined || req.body.club_id==null){
        res.status(400).json({error_msg:"club_id not found in body"});
        return;
    }
    if(req.body.sports_id==undefined || req.body.sports_id==null){
        res.status(400).json({error_msg:"sports_id not found in body"});
        return;
    }
    if(req.body.card_number==undefined || req.body.card_number==null){
        res.status(400).json({error_msg:"card_number not found in body"});
        return;
    }
    if(req.body.expiration_date==undefined || req.body.expiration_date==null){
        res.status(400).json({error_msg:"expiration_date not found in body"});
        return;
    }
    if(req.body.security_code==undefined || req.body.security_code==null){
        res.status(400).json({error_msg:"security_code not found in body"});
        return;
    }
    if(req.body.name_of_card_holder==undefined || req.body.name_of_card_holder==null){
        res.status(400).json({error_msg:"name_of_card_holder not found in body"});
        return;
    }
    //var security = req.body.security_code;
    models.payment_options.create({
        user_id : req.body.user_id,
        club_id : req.body.club_id,
        sports_id : req.body.sports_id,
        card_number : req.body.card_number,
        security_code : req.body.security_code,
        expiration_date : req.body.expiration_date,
        name_of_card_holder : req.body.name_of_card_holder
    }).then(function(save, err) {
        if(save) {
            res.json({success: true, msg: "Card Information Save Successfully."})
            return;
        }
    }).catch(function(err){
        console.log(err);
        res.status(400).json({error_msg: "Something went wrong"});
        return;
    })
};


// reserve_club services {for disabling calender date and time if club is already reserved at time of create game}
exports.reserveClub = function(req,res,models,app) {
    if(req.body.club_id==undefined || req.body.club_id==null){
        res.status(400).json({error_msg:"club_id not found in body"});
        return;
    };
    if(req.body.date==undefined || req.body.date==null){
        res.status(400).json({error_msg:"date not found in body"});
        return;
    }
    var club_id = req.body.club_id;
    var date = req.body.date;

    var query = " SELECT game_id, game_name, sports_id, user_id, club_id, game.date, start_time, end_time, start_time_pos, end_time_pos FROM game WHERE club_id = "+club_id+" AND date = '"+ date +"' ";
    models.sequelize.query(query,{type: models.sequelize.QueryTypes.SELECT})
    .then(function(result){
        if(result!=null && result.length>0){
            data = {
                reserve_club : result,
                "success" : true
            }
            res.json(data);
            return;
        } else {
            data = {
                reserve_club : result,
                "success" : false
            }
            res.json(data);
            return;  
        }
    }).catch(function(err){
        console.log(err);
        res.status(400).json({error_msg: "Something went wrong"});
        return;
    });
};


//get_search_game services
exports.getSearchGame = function(req,res,models,app) {
    if(req.body.sports_id==undefined || req.body.sports_id==null){
        res.status(400).json({error_msg:"sports_id not found in body"});
        return;
    }
    if(req.body.date==undefined || req.body.date==null){
        res.status(400).json({error_msg:"date not found in body"});
        return;
    }
    if(req.body.sex==undefined || req.body.sex==null){
        res.status(400).json({error_msg:"sex not found in body"});
        return;
    }
    if(req.body.level==undefined || req.body.level==null){
        res.status(400).json({error_msg:"level not found in body"});
        return;
    }
    if(req.body.no_of_player==undefined || req.body.no_of_player==null){
        res.status(400).json({error_msg:"no_of_player not found in body"});
        return;
    }
    var sex = req.body.sex;
    var date = req.body.date;
    var level = req.body.level;
    var sports_id = req.body.sports_id;
    var no_of_player = req.body.no_of_player;
    var query = "SELECT game.*, club_details.club_name, club_details.address FROM game INNER JOIN club_details ON game.club_id = club_details.club_id WHERE (sports_id = "+sports_id+" AND date = '"+ date +"' AND sex = '" + sex + "' AND level = " + level + ")";
    models.sequelize.query(query, { type: models.sequelize.QueryTypes.SELECT }).then(function (result) {
        if (result != null && result.length > 0) {
            data = {
                search_result: result,
                "success": true
            }
            res.json(data);
            return;
        } else {
            //console.log("Hello")
            // res.status(200).json({
            //      error_msg: "There are no game available." });
            // return;
            data = {
                search_result: "No game available",
                "success": false
            }
            res.json(data);
            return;
        }
    }).catch(function (err) {
        console.log(err);
        res.status(400).json({ error_msg: "Something went wrong" });
        return;
    });
};


// Join_Game services
exports.joinGame = function(req,res,models,app) {
    if(req.body.game_name==undefined || req.body.game_name==null){
        res.status(400).json({error_msg:"game_name not found in body"});
        return;
    }
    if(req.body.date==undefined || req.body.date==null){
        res.status(400).json({error_msg:"date not found in body"});
        return;
    }
    if(req.body.start_time==undefined || req.body.start_time==null){
        res.status(400).json({error_msg:"start_time not found in body"});
        return;
    }
    if(req.body.end_time==undefined || req.body.end_time==null){
        res.status(400).json({error_msg:"end_time not found in body"});
        return;
    }
    if(req.body.no_of_player==undefined || req.body.no_of_player==null) {
        res.status(400).json({error_msg:"no_of_player not found in body"});
        return;
    }
    if(req.body.club_name==undefined || req.body.club_name==null){
        res.status(400).json({error_msg:"club_name not found in body"});
        return;
    }
    if(req.body.club_address==undefined || req.body.club_address==null){
        res.status(400).json({error_msg:"club_address not found in body"});
        return;
    }
    if(req.body.sex==undefined || req.body.sex==null){
        res.status(400).json({error_msg:"sex not found in body"});
        return;
    }
    if(req.body.level==undefined || req.body.level==null){
        res.status(400).json({error_msg:"level not found in body"});
        return;
    }
    if(req.body.pp_type==undefined || req.body.pp_type==null){
        res.status(400).json({error_msg:"pp_type not found in body"});
        return;
    }
    if(req.body.club_id==undefined || req.body.club_id==null){
        res.status(400).json({error_msg:"club_id not found in body"});
        return;
    }
    if(req.body.user_id==undefined || req.body.user_id==null){
        res.status(400).json({error_msg:"user_id not found in body"});
        return;
    }
    if(req.body.sports_id==undefined || req.body.sports_id==null){
        res.status(400).json({error_msg:"sports_id not found in body"});
        return;
    }
    if(req.body.game_id==undefined || req.body.game_id==null){
        res.status(400).json({error_msg:"game_id not found in body"});
        return;
    }
    var join_game = {
                        game_name : req.body.game_name,
                        date: req.body.date,
                        start_time : req.body.start_time,
                        end_time : req.body.end_time,
                        no_of_player : req.body.no_of_player,
                        club_name : req.body.club_name,
                        sex : req.body.sex,
                        level : req.body.level,
                        pp_type : req.body.pp_type,
                        club_id : req.body.club_id,
                        user_id : req.body.user_id,
                        sports_id : req.body.sports_id,
                        game_id : req.body.game_id,
                        club_address: req.body.club_address
                    };
                models.join_game.create(join_game).then(function(created, err){
                    if(created) {
                        res.json({"success" : true, msg: "join game Successfully."});
                        return;
                    }
                }).catch(function(err){
                    console.log(err);
                    res.status(400).json({error_msg: "Something went wrong"});
                    return;
                });
};

// get_Game_List services
exports.getGameList = function(req,res,models,app) {
    if(req.body.user_id==undefined || req.body.user_id==null){
        res.status(400).json({error_msg:"user_id not found in body"});
        return;
    };
    var user_id = req.body.user_id;
    models.users.findOne({where:{user_id: user_id}}).then(function(user){
        if(user!=null) {
            var query = "SELECT join_game.*, club_details.number, club_details.general_monthly_fee FROM join_game INNER JOIN club_details ON join_game.club_id = club_details.club_id WHERE join_game.user_id = " + user_id + "";
            models.sequelize.query(query,{type: models.sequelize.QueryTypes.SELECT}).then(function(list) {
                if(list!=null && list.length>0){
                    data = {
                        games_list : list,
                        "success" : true
                    }
                    res.json(data);
                    return;
                } else {
                    res.json({error_msg: "There are no game_list found."});
                    return;
                }
            })
        } else {
            res.json({ success: false, message: "user_id not found for users." });
            return;
        }
    })
}; 


//rent_For_Club services
exports.rentForClub = function(req,res,models,app) {
    if(req.body.user_id==undefined || req.body.user_id==null){
        res.status(400).json({error_msg:"user_id not found in body"});
        return;
    };
    if(req.body.club_id==undefined || req.body.club_id==null){
        res.status(400).json({error_msg:"club_id not found in body"});
        return;
    };
    
    if(req.body.sports_id==undefined || req.body.sports_id==null){
        res.status(400).json({error_msg:"game_id not found in body"});
        return;
    };
    if(req.body.date==undefined || req.body.date==null){
        res.status(400).json({error_msg:"date not found in body"});
        return;
    };
    if(req.body.no_of_player==undefined || req.body.no_of_player==null){
        res.status(400).json({error_msg:"no_of_player not found in body"});
        return;
    };
    if(req.body.total==undefined || req.body.total==null){
        res.status(400).json({error_msg:"total not found in body"});
        return;
    };

    models.rent_club.create(
        {
            date : req.body.date,
            total : req.body.total,
            user_id : req.body.user_id, 
            club_id : req.body.club_id, 
            sports_id : req.body.sports_id,
            no_of_player : req.body.no_of_player
        }
        ).then(function (create, err) {
            if(create) {
                res.json({"success" : true, msg: "your rent has been submitted successfully."});
                return;
            }
    }).catch(function(err){
        console.log(err);
        res.status(400).json({error_msg: "Something went wrong"});
        return;
    });
};
