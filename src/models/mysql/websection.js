'use strict';
module.exports = (sequelize, DataTypes) => {
  var Websection = sequelize.define('Websection', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: { type: DataTypes.STRING},
    text: { type: DataTypes.STRING},
    image: { type: DataTypes.STRING},
    code: { type: DataTypes.INTEGER}
  }, {underscored: true });

  Websection.associate = function (models) {
    models.Websection.belongsTo(models.Company);
  };

  return Websection;
};