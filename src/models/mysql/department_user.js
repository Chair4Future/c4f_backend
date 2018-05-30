'use strict';
module.exports = (sequelize, DataTypes) => {
  var DepartmentUser = sequelize.define('DepartmentUser', {
    is_sponsor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, { underscored: true });

  return DepartmentUser;
};