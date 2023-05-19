'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UsersCompanies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
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
    await queryInterface.dropTable('UsersCompanies');
  },
};
