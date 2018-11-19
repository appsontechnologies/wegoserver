module.exports = (sequelize, DataTypes) => {
    return sequelize.define('rent_club', {
        rent_id : {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        club_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        sports_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        no_of_player: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        total: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        tableName: 'rent_club'
    });
};