'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      hour: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      serviceId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Services',
          key: 'id',
        },
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
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Schedules');
  },
};
