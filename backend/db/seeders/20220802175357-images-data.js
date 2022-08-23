'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [
      {
        url: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_960_720.jpg',
        previewImage: true,
        spotId: 1,
        reviewId: null,
        userId: 2
      },
      {
        url: 'https://design-milk.com/images/2017/06/Roundup-Modern-Treehouses-1-RPA-treehouse.jpg',
        previewImage: true,
        spotId: 2,
        reviewId: 5,
        userId: 3
      },
      {
        url: 'https://cdn.pixabay.com/photo/2017/05/01/12/07/sand-2275341_960_720.jpg',
        previewImage: true,
        spotId: 3,
        reviewId: null,
        userId: 4
      },
      {
        url: 'https://cdn.pixabay.com/photo/2020/10/13/13/28/ameland-5651866_960_720.jpg',
        previewImage: true,
        spotId: 4,
        reviewId: 11,
        userId: 5
      },
      {
        url: 'https://cdn.pixabay.com/photo/2016/11/19/14/30/aurora-borealis-1839582_960_720.jpg',
        previewImage: true,
        spotId: 5,
        reviewId: 14,
        userId: 6
      },
      {
        url: 'https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_960_720.jpg',
        previewImage: true,
        spotId: 6,
        reviewId: null,
        userId: 7
      },
      {
        url: 'https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990_960_720.jpg',
        previewImage: true,
        spotId: 7,
        reviewId: 20,
        userId: 8
      },
      {
        url: 'https://cdn.pixabay.com/photo/2018/05/09/08/41/aerial-3384845_960_720.jpg',
        previewImage: true,
        spotId: 8,
        reviewId: null,
        userId: 9
      },
      {
        url: 'https://cdn.pixabay.com/photo/2013/03/22/00/24/log-home-95677_960_720.jpg',
        previewImage: true,
        spotId: 9,
        reviewId: 26,
        userId: 10
      },
      {
        url: 'https://cdn.pixabay.com/photo/2022/01/12/19/28/mountains-6933693_960_720.jpg',
        previewImage: true,
        spotId: 10,
        reviewId: null,
        userId: 1
      },
      {
        url: 'https://www.thespruce.com/thmb/CksWMdX91Ogcd-Wp4YdKEkw78sQ=/941x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/rollingtable-d89ff55575c2487e8cea30d944424717.jpeg',
        previewImage: true,
        spotId: 10,
        reviewId: null,
        userId: 1
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
