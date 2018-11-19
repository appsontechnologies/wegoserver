/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('admin', {
        id: {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email_address: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        mobile_number: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        sex: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        profile_picture_url: {
            type: DataTypes.STRING(255),
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
    }, {
      tableName: 'admin'
    });
  };
  