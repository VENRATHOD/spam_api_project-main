'use strict';
module.exports = (sequelize, DataTypes) => {
  const SpamReport = sequelize.define('SpamReport', {
    phone: DataTypes.STRING,
    reportedBy: DataTypes.INTEGER
  }, {});

  SpamReport.associate = function(models) {
    SpamReport.belongsTo(models.User, { foreignKey: 'reportedBy' });
  };

  return SpamReport;
};
