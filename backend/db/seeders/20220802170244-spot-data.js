'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        ownerId: 1,
        address: '123 Main Street',
        city: 'Irvine',
        state: 'California',
        country: 'USA',
        lat: 33.6846,
        lng: 117.8265,
        name: 'Cabin',
        description: 'Bedroom 1: King, Bedroom 2: Queen, Bedroom 3: Queen with private balcony, Loft: King and two singles (accessed by a steep staircase with railings, but not recommended for young children)',
        price: 123.32
      },
      {
        ownerId: 2,
        address: '23 Main Street',
        city: 'Irvine',
        state: 'California',
        country: 'USA',
        lat: 38.6846,
        lng: 111.8265,
        name: 'Treehouse',
        description: 'As you drive up to Bluebird Farm you will be captivated by amazing views of the Bluebird Farm Life. This amazing Cabin in the sky has all the modern amenities youll need to relax in the countryside, while still giving you a sense of camping. Spacious but simply designed for your comfort, the Treehouse has all the supplies you need in the kitchenette, bathroom, and shower. Great Wi-Fi for those who work from home, need to catch up on emails or seek creative spaces in-between relaxing at Bluebird Farm.',
        price: 128.32
      },
      {
        ownerId: 3,
        address: '12 Main Street',
        city: 'Irvine',
        state: 'California',
        country: 'USA',
        lat: 3.6846,
        lng: 17.8265,
        name: 'Beach House',
        description: 'Updated 2 bed, 1 bath Oceanfront Home with a beautiful UNOBSTRUCTED VIEW, GARAGE PARKING, & OCEANFRONT PATIO. The home includes 1 Queen Bed, 2 Singles, and a Queen Size pullout couch. This updated home comes with a SMART TV, WiFi, Propane BBQ, washer and dryer (shared), Beach/Bath Towels, Boogie Boards, Beach Chairs/Toys, and 2 Bicycles.',
        price: 323.32
      },
      {
        ownerId: 4,
        address: '13 Main Street',
        city: 'Irvine',
        state: 'California',
        country: 'USA',
        lat: 323.6846,
        lng: 17.8265,
        name: 'Beach House',
        description: 'This property centrally located on 15th Street between the Balboa and Newport Beach piers. You can walk or ride our bikes to anywhere on the peninsula from this home. The best thing about this location is that you are a 5-15 minute walk to over 20+ restaurants, shopping, the balboa fun zone, boat rentals, all while staying at the beach.',
        price: 423.32
      },
      {
        ownerId: 5,
        address: '132 Main Street',
        city: 'Irvine',
        state: 'California',
        country: 'USA',
        lat: 23.6846,
        lng: 147.8265,
        name: 'Modern Cabin',
        description: 'Nestled in the heart of the Big Thicket, our Naturalist Boudoir B&B has everything you need to revitalize your senses. Extremely private area for the naturalist with outdoor hot tub and shower. We welcome all guests to experience our lovely Naturalist Boudoir & reconnect with your special someone.',
        price: 133.32
      },
      {
        ownerId: 6,
        address: '312 Main Street',
        city: 'Irvine',
        state: 'California',
        country: 'USA',
        lat: 39.6846,
        lng: 127.8265,
        name: 'House with Infinity pool',
        description: 'Plan for fall travel now! 2 King, 2 Queen, 1 bunk bed. Relax in the hot tub - included! Optional pool heating with fee (2 consecutive days). Pool is gated. 16 miles from SNA airport or 32 miles from LAX. Outdoor picnic table and bbq for use. Only 7 min drive to Disneyland 3.5 miles & Anaheim Convention Center 5 miles to Knotts Berry Farm.',
        price: 103.32
      },
      {
        ownerId: 7,
        address: '321 Main Street',
        city: 'Irvine',
        state: 'California',
        country: 'USA',
        lat: 37.6846,
        lng: 187.8265,
        name: 'House with view',
        description: 'Step out onto the semiprivate deck on the oceanfront for breathtaking sunsets over the Pacific... Situated on prime oceanfront property, youll experience peace and ultimate relaxation with breathtaking ocean views and miles of sandy beaches in a furnished 1929 Art Deco studio.',
        price: 353.32
      },
      {
        ownerId: 8,
        address: '32 Main Street',
        city: 'Irvine',
        state: 'California',
        country: 'USA',
        lat: 31.6846,
        lng: 123.8265,
        name: 'Overlooking the beach',
        description: 'Enjoy a unique ocean front experience at our family town home. The front unit sleeps 6 adults. Private access to Laguna Beaches most exclusive beach (Turks Beach) with private stairs connected to the house leading directly to the sand.',
        price: 453.32
      },
      {
        ownerId: 9,
        address: '31 Main Street',
        city: 'Irvine',
        state: 'California',
        country: 'USA',
        lat: 33.6846,
        lng: 117.8265,
        name: 'Cabin',
        description: 'Bring your childhood dreams to life by going on a real treehouse adventure! This beautiful, one-of-a-kind escape is situated at 8,000 feet and embraced by a 200 year old fir. Accessible only by 4x4/AWD for 3 miles of dirt or snow-packed roads, it features a lofted bedroom with skylight, kitchen, hot-water bathroom, main room with 270-degree glass windows and large deck. ',
        price: 100.32
      },
      {
        ownerId: 10,
        address: '21 Main Street',
        city: 'Irvine',
        state: 'California',
        country: 'USA',
        lat: 39.6846,
        lng: 111.8265,
        name: 'Tiny home in mountains',
        description: 'A Truly Unique High Elevation Experience Bolted to a Cliffline in the Gorge',
        price: 103.32
      }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      address: { [Op.in]: ['123 Main Street', '23 Main Street', '12 Main Street', '13 Main Street', '132 Main Street', '312 Main Street', '321 Main Street', '32 Main Street', '31 Main Street', '21 Main Street'] }
    }, {});
  }
};
