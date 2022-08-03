'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.addColumn('Users', 'firstName', { type: Sequelize.STRING });
    await queryInterface.addColumn('Users', 'lastName', { type: Sequelize.STRING })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.removeColumn('Users', 'firstName', { type: Sequelize.STRING }),
      await queryInterface.removeColumn('Users', 'lastName', { type: Sequelize.STRING })
  }
};
