'use strict';
module.exports = (sequelize, DataTypes) => {
  var Skill = sequelize.define('Skill', {
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
        msg: 'skill already registered'
      }
    }
  }, { underscored: true });

  Skill.associate = function (models) {
    models.Skill.belongsToMany(models.User, { through: models.UserSkill });
  };
  
  return Skill;
};