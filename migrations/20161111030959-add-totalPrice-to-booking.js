'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'bookings',
      'totalPrice',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('bookings', 'totalPrice');
  }
};
