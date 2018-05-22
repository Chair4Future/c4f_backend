'use strict';
module.exports = (sequelize, DataTypes) => {
  var Link = sequelize.define('Link', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: "url must be defined"
        }
      }
    },
    social: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, { underscored: true });

  Link.associate = function (models) {
    models.Link.belongsTo(models.User);
  };

  return Link;
};