'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CompanyAddresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      complement: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      district: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      houseNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('CompanyAddresses');
  },
};
