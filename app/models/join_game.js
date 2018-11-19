module.exports = (sequelize, DataTypes) => {
    return sequelize.define('join_game', {
        join_game_id : {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        game_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        date: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        start_time: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        end_time: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        no_of_player: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        club_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        club_address: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        sex: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        level: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        pp_type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        club_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        sports_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        game_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        }
    }, {
        tableName: 'join_game'
    });
};