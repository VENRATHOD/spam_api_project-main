'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});

  Contact.associate = function(models) {
    Contact.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Contact;
};
