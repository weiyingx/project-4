'use strict';
module.exports = function(sequelize, DataTypes) {
  var booking = sequelize.define('booking', {
    fullName: DataTypes.TEXT,
    email: DataTypes.TEXT,
    contact: DataTypes.TEXT,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE,
    pax: DataTypes.INTEGER,
    resortpackageId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.booking.belongsTo(models.resortpackage);
      }
    }
  });
  return booking;
};
