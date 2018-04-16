'use strict';
module.exports = (sequelize, DataTypes) => {
  var BusinessArea = sequelize.define('BusinessArea', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'business area already registered'
      }
    }
  }, { underscored: true });

  BusinessArea.associate = function (models) {
    models.BusinessArea.hasMany(models.Company);
  };
  
  return BusinessArea;
};