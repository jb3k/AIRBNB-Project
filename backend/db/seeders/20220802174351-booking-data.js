'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: 10 - 12 - 2022,
        endDate: 10 - 14 - 2022
      },
      {
        spotId: 2,
        userId: 2,
        startDate: 11 - 12 - 2022,
        endDate: 11 - 14 - 2022
      },
      {
        spotId: 3,
        userId: 3,
        startDate: 10 - 1 - 2022,
        endDate: 10 - 4 - 2022
      },
      {
        spotId: 4,
        userId: 4,
        startDate: 10 - 2 - 2022,
        endDate: 10 - 4 - 2022
      },
      {
        spotId: 5,
        userId: 5,
        startDate: 10 - 3 - 2022,
        endDate: 10 - 6 - 2022
      },
      {
        spotId: 6,
        userId: 6,
        startDate: 10 - 13 - 2022,
        endDate: 10 - 15 - 2022
      },
      {
        spotId: 7,
        userId: 7,
        startDate: 10 - 19 - 2022,
        endDate: 10 - 22 - 2022
      },
      {
        spotId: 8,
        userId: 8,
        startDate: 10 - 13 - 2022,
        endDate: 10 - 25 - 2022
      },
      {
        spotId: 9,
        userId: 9,
        startDate: 10 - 1 - 2022,
        endDate: 10 - 4 - 2022
      },
      {
        spotId: 10,
        userId: 10,
        startDate: 10 - 18 - 2022,
        endDate: 10 - 24 - 2022
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
