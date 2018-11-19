module.exports = (sequelize, DataTypes) => {
    return sequelize.define('club_sports', {
        club_sports_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        club_sports_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        sports_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: true
        },
        club_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: true
        },
        monthly_fee: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        sex: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        changing_room: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        value_per_hours: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
            tableName: 'club_sports'
        });
};