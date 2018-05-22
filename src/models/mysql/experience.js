'use strict';
module.exports = (sequelize, DataTypes) => {
  var Experience = sequelize.define('Experience', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: "country must be defined"
        }
      }
    },
    function: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: "country must be defined"
        }
      }
    },
    actual: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    initDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    description: { type: DataTypes.STRING },
    is_education: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, { underscored: true });

  Experience.associate = function (models) {
    models.Experience.belongsTo(models.User);
  };

  return Experience;
};