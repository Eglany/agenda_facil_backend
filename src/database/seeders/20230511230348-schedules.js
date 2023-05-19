'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Schedules', [
      {
        date: '2023-05-29',
        hour: '10:00:00',
        userId: 1,
        serviceId: 2,
        companyId: 1,
      },
      {
        date: '2023-05-29',
        hour: '13:00:00',
        userId: 2,
        serviceId: 4,
        companyId: 2,
      },
      {
        date: '2023-06-05',
        hour: '16:30:00',
        userId: 2,
        serviceId: 6,
        companyId: 3,
      },
      {
        date: '2023-05-29',
        hour: '14:30:00',
        userId: 3,
        serviceId: 1,
        companyId: 1,
      },
      {
        date: '2023-05-26',
        hour: '15:0:00',
        userId: 3,
        serviceId: 5,
        companyId: 2,
      },
      {
        date: '2023-05-27',
        hour: '09:30:00',
        userId: 4,
        serviceId: 6,
        companyId: 3,
      },
      {
        date: '2023-06-03',
        hour: '14:00:00',
        userId: 4,
        serviceId: 6,
        companyId: 3,
      },
      {
        date: '2023-05-26',
        hour: '8:30:00',
        userId: 5,
        serviceId: 4,
        companyId: 2,
      },
      {
        date: '2023-06-10',
        hour: '10:00:00',
        userId: 5,
        serviceId: 6,
        companyId: 3,
      },
      {
        date: '2023-06-10',
        hour: '14:30:00',
        userId: 5,
        serviceId: 8,
        companyId: 4,
      },
      {
        date: '2023-05-27',
        hour: '13:00:00',
        userId: 2,
        serviceId: 6,
        companyId: 3,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Schedules', null, {});
  },
};
