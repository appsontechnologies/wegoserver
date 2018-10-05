module.exports = (sequelize, DataTypes) => {
    return sequelize.define('game', {
        game_id : {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        sports_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        club_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        stadium_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        }
    }, {
        tableName: 'game'
    });
};