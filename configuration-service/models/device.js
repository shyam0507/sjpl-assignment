'use strict';
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    name: DataTypes.STRING,
    siteId: DataTypes.UUID,
    isOnline: DataTypes.BOOLEAN
  }, {});
  Device.associate = function (models) {
    Device.belongsTo(models.Site, { foreignKey: 'siteId', as: 'site' })
  };
  return Device;
};