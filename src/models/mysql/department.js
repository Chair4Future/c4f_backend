'use strict';
module.exports = (sequelize, DataTypes) => {
  var Department = sequelize.define('Department', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'email already registered'
      },
    },
    phone: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'phone number already registered'
      },
    }
  }, { underscored: true });

  Department.associate = function (models) {
    models.Department.belongsTo(models.Company);
    models.Department.belongsToMany(models.User, { through: models.DepartmentUser });
  };

  return Department;
};