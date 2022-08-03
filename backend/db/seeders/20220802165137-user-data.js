'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Jim',
        lastName: 'Bob',
        email: 'jbob@user.io',
        username: 'JimBob',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Tim',
        lastName: 'Bob',
        email: 'tbob1@user.io',
        username: 'TimBob',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Kim',
        lastName: 'Bob',
        email: 'user2@user.io',
        username: 'KimBob',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Ben',
        lastName: 'Jamin',
        email: 'benjamin@user.io',
        username: 'BenJamin',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Dan',
        lastName: 'Hoff',
        email: 'dhoff@user.io',
        username: 'DanHoff',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Nate',
        lastName: 'Scott',
        email: 'nscott@user.io',
        username: 'NateScott',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Jung',
        lastName: 'Gu',
        email: 'jgu@user.io',
        username: 'JungGu',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        firstName: 'Kev',
        lastName: 'Duong',
        email: 'kduong@user.io',
        username: 'opkduong',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        firstName: 'Raph',
        lastName: 'Yohan',
        email: 'ryohan@user.io',
        username: 'RaphYohan',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        firstName: 'Kim',
        lastName: 'Bop',
        email: 'kbop@user.io',
        username: 'Bibimbop',
        hashedPassword: bcrypt.hashSync('password10')
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['JimBob', 'KimBob', 'TimBob', 'BenJamin', 'DanHoff', 'NateScott', 'JungGu', 'opkduong', 'RaphYohan', 'Bibimbop'] }
    }, {});
  }
};
