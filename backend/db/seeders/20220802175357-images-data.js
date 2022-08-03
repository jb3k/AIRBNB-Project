'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [
      {
        url: 'www.home1.com',
        previewImage: true,
        spotId: 1,
        reviewId: null,
        userId: 1
      },
      {
        url: 'www.home2.com',
        previewImage: true,
        spotId: null,
        reviewId: 5,
        userId: 2
      },
      {
        url: 'www.home3.com',
        previewImage: true,
        spotId: 3,
        reviewId: null,
        userId: 3
      },
      {
        url: 'www.home4.com',
        previewImage: true,
        spotId: null,
        reviewId: 11,
        userId: 4
      },
      {
        url: 'www.home5.com',
        previewImage: true,
        spotId: null,
        reviewId: 14,
        userId: 5
      },
      {
        url: 'www.home6.com',
        previewImage: true,
        spotId: 6,
        reviewId: null,
        userId: 6
      },
      {
        url: 'www.home7.com',
        previewImage: true,
        spotId: null,
        reviewId: 20,
        userId: 7
      },
      {
        url: 'www.home8.com',
        previewImage: true,
        spotId: 8,
        reviewId: null,
        userId: 8
      },
      {
        url: 'www.home9.com',
        previewImage: true,
        spotId: null,
        reviewId: 26,
        userId: 9
      },
      {
        url: 'www.home10.com',
        previewImage: false,
        spotId: 10,
        reviewId: null,
        userId: 10
      },
      {
        url: 'www.home11.com',
        previewImage: false,
        spotId: 10,
        reviewId: null,
        userId: 10
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
