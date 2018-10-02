module.exports = (sequelize, DataTypes) => {
    console.log("DATABASE CREATED============>")
    return sequelize.define('clubs', {
        club_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        club_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: ''
        },
        stadium_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: ''
        },
        number: {
            type: DataTypes.STRING(255),
            allowNull: false
          },
        club_image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        postal_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        account_to_receive_payments: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        club_lat: {
            type: DataTypes.STRING(255),
            allowNull: true
          },
        club_long: {
            type: DataTypes.STRING(255),
            allowNull: true
          },
        name_holder:{
            type:DataTypes.STRING(255),
            allowNull:true
        },
        general_monthly_fee: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    },  {
        tableName: 'clubs'
    });
};