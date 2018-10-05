module.exports = (sequelize, DataTypes) => {
    return sequelize.define('gallery', {
        gallery_id : {
            type: DataTypes.INTEGER(50).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        gallery_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        tableName: 'gallery'
    });
};