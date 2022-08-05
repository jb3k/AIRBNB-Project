'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: '2022-10-10',
        endDate: '2022-10-14'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2022-10-10',
        endDate: '2022-10-14'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2022-10-10',
        endDate: '2022-10-14'
      },
      {
        spotId: 4,
        userId: 4,
        startDate: '2022-10-10',
        endDate: '2022-10-14'
      },
      {
        spotId: 5,
        userId: 5,
        startDate: '2022-10-10',
        endDate: '2022-10-14'
      },
      {
        spotId: 6,
        userId: 6,
        startDate: '2022-10-10',
        endDate: '2022-10-14'
      },
      {
        spotId: 7,
        userId: 7,
        startDate: '2022-10-10',
        endDate: '2022-10-14'
      },
      {
        spotId: 8,
        userId: 8,
        startDate: '2022-10-10',
        endDate: '2022-10-14'
      },
      {
        spotId: 9,
        userId: 9,
        startDate: '2022-10-10',
        endDate: '2022-10-14'
      },
      {
        spotId: 10,
        userId: 10,
        startDate: '2022-10-10',
        endDate: '2022-10-14'
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
