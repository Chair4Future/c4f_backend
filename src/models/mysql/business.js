'use strict';
module.exports = (sequelize, DataTypes) => {
  var Business = sequelize.define('Business', {
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

  Business.associate = function (models) {
    models.Business.belongsToMany(models.Company, { through: models.CompanyBusiness });
  };
  
  return Business;
};