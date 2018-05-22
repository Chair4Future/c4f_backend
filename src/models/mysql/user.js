'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
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
      allowNull: false,
      unique: {
        args: true,
        msg: 'email already registered'
      }
    },
    birthdate: { type: DataTypes.DATEONLY },
    photo: { type: DataTypes.STRING },
    country_code: { type: DataTypes.STRING(2) },
    city: { type: DataTypes.STRING },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_moderator: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
      scopes: {
        profile: { attributes: { exclude: ['password', 'is_mod', 'is_adm'] } }
      },
      underscored: true
    });

  User.associate = function (models) {
    models.User.belongsToMany(models.Department, { through: models.DepartmentUser });
    models.User.belongsToMany(models.Skill, { through: models.UserSkill });
    models.User.hasMany(models.Company);
    models.User.hasMany(models.Experience);
    models.User.hasMany(models.Link);
  };

  return User;
};