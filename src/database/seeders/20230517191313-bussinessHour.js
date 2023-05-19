'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('BusinessHours', [
      {
        weekDay: 1,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 1,
      },
      {
        weekDay: 2,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 1,
      },
      {
        weekDay: 3,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 1,
      },
      {
        weekDay: 4,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 1,
      },
      {
        weekDay: 5,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 1,
      },
      {
        weekDay: 6,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 1,
      },
      {
        weekDay: 0,
        openTime: '00:00:00',
        closeTime: '00:00:00',
        companyId: 1,
      },
      {
        weekDay: 1,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 2,
      },
      {
        weekDay: 2,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 2,
      },
      {
        weekDay: 3,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 2,
      },
      {
        weekDay: 4,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 2,
      },
      {
        weekDay: 5,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 2,
      },
      {
        weekDay: 6,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 2,
      },
      {
        weekDay: 0,
        openTime: '00:00:00',
        closeTime: '00:00:00',
        companyId: 2,
      },
      {
        weekDay: 1,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 3,
      },
      {
        weekDay: 2,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 3,
      },
      {
        weekDay: 3,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 3,
      },
      {
        weekDay: 4,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 3,
      },
      {
        weekDay: 5,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 3,
      },
      {
        weekDay: 6,
        openTime: '08:00:00',
        closeTime: '17:30:00',
        companyId: 3,
      },
      {
        weekDay: 0,
        openTime: '00:00:00',
        closeTime: '00:00:00',
        companyId: 3,
      },
      {
        weekDay: 1,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 4,
      },
      {
        weekDay: 2,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 4,
      },
      {
        weekDay: 3,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 4,
      },
      {
        weekDay: 4,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 4,
      },
      {
        weekDay: 5,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 4,
      },
      {
        weekDay: 6,
        openTime: '08:00:00',
        closeTime: '18:00:00',
        companyId: 4,
      },
      {
        weekDay: 0,
        openTime: '00:00:00',
        closeTime: '00:00:00',
        companyId: 4,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('BusinnessHours', null, {});
  },
};
