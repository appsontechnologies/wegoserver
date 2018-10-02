/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    //console.log("invitation Schema create Successfully-->!", sequelize);
    return sequelize.define('invitation', {
        invitation_id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        sent_user_id: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        received_user_id: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
        {
        tableName: 'invitation'
    });
};
