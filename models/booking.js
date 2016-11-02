'use strict';
module.exports = function(sequelize, DataTypes) {
  var booking = sequelize.define('booking', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    contact: DataTypes.INTEGER,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE,
    packageId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.booking.belongsTo(models.package);
      }
    }
  });
  return booking;
};
