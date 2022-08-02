'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.addColumn('users', 'firstName', { id: Sequelize.STRING }),
      await queryInterface.addColumn('users', 'lastName', { id: Sequelize.STRING })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.removeColumn('users', 'firstName', { id: Sequelize.STRING }),
      await queryInterface.removeColumn('users', 'lastName', { id: Sequelize.STRING })
  }
};
