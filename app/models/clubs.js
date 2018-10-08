module.exports = (sequelize, DataTypes) => {
    return sequelize.define('clubs', {
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
            type: DataTypes.STRING(255),
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
        name_holder: {
            type:DataTypes.STRING(255),
            allowNull: true
        },
        general_monthly_fee: {
            type: DataTypes.STRING(255),
            allowNull: true
        },        
        sports_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        sports_name: {
            type: DataTypes.STRING(255),
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
        value_par_hour: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        stadium_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        no_of_player: {
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
          }
    },  {
        tableName: 'clubs'
    });
};