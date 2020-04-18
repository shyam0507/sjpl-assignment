'use strict';
module.exports = (sequelize, DataTypes) => {
  const AccessToken = sequelize.define('AccessToken', {
    userId: DataTypes.UUID,
    access: DataTypes.STRING,
    token: DataTypes.STRING
  }, {});
  AccessToken.associate = function (models) {
    AccessToken.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
  };
  return AccessToken;
};