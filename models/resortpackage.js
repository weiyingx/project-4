'use strict';
module.exports = function(sequelize, DataTypes) {
  var resortpackage = sequelize.define('resortpackage', {
    island: DataTypes.STRING,
    resort: DataTypes.STRING,
    roomType: DataTypes.STRING,
    packageType: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.resortpackage.hasMany(models.booking);
      }
    }
  });
  return resortpackage;
};
