'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    phone: { type: DataTypes.STRING, unique: true },
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Contact, { foreignKey: 'userId' });
    User.hasMany(models.SpamReport, { foreignKey: 'reportedBy' });
  };

  return User;
};
