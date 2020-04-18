'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    industry: {
      type: DataTypes.ENUM,
      values: ['Hospital', 'Hotel', 'Factory']
    }
  }, {});
  Site.associate = function (models) {
    Site.hasMany(models.Device, { as: 'devices' })
  };

  Site.beforeCreate((site, _) => {
    return site.id = uuid();
  });

  return Site;
};