module.exports = (sequelize, DataTypes) => {
    return sequelize.define('payment_options', {
        payment_id : {
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
        card_number: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        expiration_date: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        security_code: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name_of_card_holder: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }

    }, {
        tableName: 'payment_options'
    });
};