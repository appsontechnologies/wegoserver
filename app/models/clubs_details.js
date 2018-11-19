module.exports = (sequelize, DataTypes) => {
    return sequelize.define('club_details', {
        club_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        club_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        number: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        postal_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        account_receive_payment: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        name_holder: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        general_monthly_fee: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        club_image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        club_lat: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        club_long: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
            tableName: 'club_details'
        });
};