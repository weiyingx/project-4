'use strict';
module.exports = function(sequelize, DataTypes) {
  var package = sequelize.define('package', {
    island: DataTypes.STRING,
    resort: DataTypes.STRING,
    roomType: DataTypes.STRING,
    packageType: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.package.hasMany(models.booking);
      }
    }
  });
  return package;
};
