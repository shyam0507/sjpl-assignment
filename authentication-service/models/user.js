'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.hasMany(models.AccessToken, { as: 'accessTokens' })
  };

  User.beforeCreate((user, _) => {
    return user.id = uuid();
  });

  return User;
};