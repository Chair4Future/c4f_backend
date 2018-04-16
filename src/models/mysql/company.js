'use strict';
module.exports = (sequelize, DataTypes) => {
  var Company = sequelize.define('Company', {
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
        msg: 'company name already registered'
      }
    },
    description: { type: DataTypes.STRING }
  }, { underscored: true });

  Company.associate = function (models) {
    models.Company.belongsTo(models.User, { as: 'admin' });
    models.Company.belongsTo(models.BusinessArea, { as: 'business' });
    models.Company.hasMany(models.Department);
  };

  return Company;
};