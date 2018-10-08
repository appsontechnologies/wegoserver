module.exports = (sequelize, DataTypes) => {
    return sequelize.define('sports', {
        sports_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        sports_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: ''
        },
        sports_image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        monthly_fee: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        sex:{
            type: DataTypes.STRING(255),
            allowNull: true
        },
        changing_room: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        value_per_hour: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        selected_sport: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'sports'
    });
    
};