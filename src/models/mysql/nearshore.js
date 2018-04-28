'use strict';
module.exports = (sequelize, DataTypes) => {
  var Nearshore = sequelize.define('Nearshore', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    country_code: { 
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: "country must be defined"
        }
      } 
    },
    city: { 
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: "city must be defined"
        }
      }
    },
    address: { type: DataTypes.STRING }
  }, { underscored: true });

  Nearshore.associate = function (models) {
    models.Nearshore.belongsTo(models.Company);
  };

  return Nearshore;
};