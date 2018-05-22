'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserSkill = sequelize.define('UserSkill', {
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, { underscored: true });

  return UserSkill;
};