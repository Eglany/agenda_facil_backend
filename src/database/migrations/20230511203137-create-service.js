'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: false,
      },
      averageTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Companies',
          key: 'id',
        },
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Services');
  },
};
