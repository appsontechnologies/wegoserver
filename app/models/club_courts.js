module.exports = (sequelize, DataTypes) => {
    return sequelize.define('club_courts', {
        club_court_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        club_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: true
        },
        sports_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: true
        },
        no_of_player: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
            tableName: 'club_courts'
        });
};