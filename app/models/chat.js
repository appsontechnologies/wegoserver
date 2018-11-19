module.exports = (sequelize, DataTypes) => {
    console.log("chat");
    return sequelize.define('chat', {
        chat_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        sender_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        receiver_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        chat_lat: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        chat_long: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'chat'
    });
};