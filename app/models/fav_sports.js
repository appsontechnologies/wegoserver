module.exports = (sequelize, DataTypes) => {
    console.log("fav_sports");
    return sequelize.define('fav_sports', {
        fav_sport_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        sports_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        }
    }, {
        tableName: 'fav_sports'
    });
};