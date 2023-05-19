'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BusinessHours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      weekDay: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      openTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      closeTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      companyId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Companies',
          key: 'id',
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BusinessHours');
  }
};