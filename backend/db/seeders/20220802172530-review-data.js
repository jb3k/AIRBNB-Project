'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        review: 'Beautiful place to unwind and reconnect! Hosts did a great job to make is special.',
        stars: 5,
        userId: 1,
        spotId: 1
      },
      {
        review: 'A perfect couples retreat. Everything about it was first class.',
        stars: 4,
        userId: 2,
        spotId: 1
      }, {
        review: 'Such an amazing experience! The exceeded way beyond our expectations! Most pleasant hosts. We felt like children living a fairytale dream',
        stars: 4,
        userId: 3,
        spotId: 1
      }, {
        review: 'Beautiful place',
        stars: 5,
        userId: 4,
        spotId: 2
      }, {
        review: 'Part of me didnt want to write a good review to keep this gem hidden. Good lord this was far and away the best Airbnb that I have ever booked!!',
        stars: 5,
        userId: 1,
        spotId: 2
      }, {
        review: 'Had a great time!',
        stars: 3,
        userId: 1,
        spotId: 2
      }, {
        review: 'Excellent place to stay with a unique experience. Wonderful hosts, clean space and relaxing environment. ',
        stars: 5,
        userId: 1,
        spotId: 3
      }, {
        review: 'If you are looking for the perfect getaway to escape life and be with nature, this is it!',
        stars: 3,
        userId: 4,
        spotId: 3
      }, {
        review: 'This place is remarkable. You will instantly feel comfortable and calm. Its a relaxing space with spectacular views, serene surroundings, and a beautiful sleeping arrangement',
        stars: 5,
        userId: 5,
        spotId: 3
      }, {
        review: 'This place is amazing! It completely exceeded our expectations in every way. It was a perfect romantic getaway!',
        stars: 5,
        userId: 9,
        spotId: 4
      },
      {
        review: 'Beautiful place to unwind and reconnect! Hosts did a great job to make is special.',
        stars: 5,
        userId: 7,
        spotId: 4
      },
      {
        review: 'A perfect couples retreat. Everything about it was first class.',
        stars: 4,
        userId: 8,
        spotId: 4
      }, {
        review: 'Such an amazing experience! The exceeded way beyond our expectations! Most pleasant hosts. We felt like children living a fairytale dream',
        stars: 5,
        userId: 6,
        spotId: 5
      }, {
        review: 'Beautiful place',
        stars: 3,
        userId: 9,
        spotId: 5
      }, {
        review: 'Part of me didnt want to write a good review to keep this gem hidden. Good lord this was far and away the best Airbnb that I have ever booked!!',
        stars: 4,
        userId: 10,
        spotId: 5
      }, {
        review: 'Had a great time!',
        stars: 3,
        userId: 1,
        spotId: 6
      }, {
        review: 'Excellent place to stay with a unique experience. Wonderful hosts, clean space and relaxing environment. ',
        stars: 4,
        userId: 7,
        spotId: 6
      }, {
        review: 'If you are looking for the perfect getaway to escape life and be with nature, this is it!',
        stars: 3,
        userId: 4,
        spotId: 6
      }, {
        review: 'This place is remarkable. You will instantly feel comfortable and calm. Its a relaxing space with spectacular views, serene surroundings, and a beautiful sleeping arrangement',
        stars: 5,
        userId: 8,
        spotId: 7
      }, {
        review: 'This place is amazing! It completely exceeded our expectations in every way. It was a perfect romantic getaway!',
        stars: 5,
        userId: 3,
        spotId: 7
      }, {
        review: 'If you are looking for the perfect getaway to escape life and be with nature, this is it!',
        stars: 5,
        userId: 2,
        spotId: 7
      }, {
        review: 'This place is alright, wouldnt stay again',
        stars: 1,
        userId: 6,
        spotId: 8
      }, {
        review: 'This decent at best',
        stars: 2,
        userId: 3,
        spotId: 8
      }, {
        review: 'If you are looking for and average place, this is it!',
        stars: 2,
        userId: 4,
        spotId: 8
      }, {
        review: 'This place is okay',
        stars: 2,
        userId: 10,
        spotId: 9
      }, {
        review: 'This place had some good moments',
        stars: 3,
        userId: 6,
        spotId: 9
      }, {
        review: 'If you are looking for and average place, this is it!',
        stars: 3,
        userId: 8,
        spotId: 9
      }, {
        review: 'Beautiful place to unwind and reconnect! Hosts did a great job to make is special.',
        stars: 5,
        userId: 4,
        spotId: 10
      },
      {
        review: 'A perfect couples retreat. Everything about it was first class.',
        stars: 5,
        userId: 5,
        spotId: 10
      }, {
        review: 'Such an amazing experience! The exceeded way beyond our expectations! Most pleasant hosts. We felt like children living a fairytale dream',
        stars: 5,
        userId: 6,
        spotId: 10
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
