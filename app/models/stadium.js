module.exports = (sequelize, DataTypes) => {
    return sequelize.define('stadium', {
        stadium_id : {
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
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        stadium_lat: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        stadium_long: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        country: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        postal_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'stadium'
    });
};