'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UsersCompanies', [
      {
        id: 1,
        userId: 1,
        companyId: 1,
      },
      {
        id: 2,
        userId: 1,
        companyId: 2,
      },
      {
        id: 3,
        userId: 2,
        companyId: 2,
      },
      {
        id: 4,
        userId: 2,
        companyId: 3,
      },
      {
        id: 5,
        userId: 3,
        companyId: 1,
      },
      {
        id: 6,
        userId: 4,
        companyId: 3,
      },
      {
        id: 7,
        userId: 4,
        companyId: 4,
      },
      {
        id: 8,
        userId: 5,
        companyId: 2,
      },
      {
        id: 9,
        userId: 5,
        companyId: 3,
      },
      {
        id: 10,
        userId: 5,
        companyId: 4,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UsersCompanies', null, {});
  },
};
