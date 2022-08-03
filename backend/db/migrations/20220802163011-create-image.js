'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING(99),
        allowNull: false,
        unique: true
      },
      previewImage: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Spots',
          key: 'id',
        },
        onDelete: 'cascade'
      },
      reviewId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Reviews',
          key: 'id',
        },
        onDelete: 'cascade'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  }
};
