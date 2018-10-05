/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER(50).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    number: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    social_unique_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    login_by: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    encoded_string: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sports_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    profile_picture_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    credit_card_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name_appears_on_card: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: true
    },
    security_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    session_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fcm_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    device_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    } 
  }, {
      tableName: 'users'
  });
  
};
