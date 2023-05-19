'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Services', [
      {
        id: 1,
        name: 'Corte',
        price: 30.00,
        averageTime: '00:45:00',
        description: '',
        companyId: 1,
      },
      {
        id: 2,
        name: 'Barba',
        price: 20.00,
        averageTime: '00:30:00',
        description: '',
        companyId: 1,
      },
      {
        id: 3,
        name: 'Corte + Barba',
        price: 45.00,
        averageTime: '01:00:00',
        description: '',
        companyId: 1,
      },
      {
        id: 4,
        name: 'Limpeza Dentaria',
        price: 150.00,
        averageTime: '01:00:00',
        description: '',
        companyId: 2,
      },
      {
        id: 5,
        name: 'Canal Dentario',
        price: 225.00,
        averageTime: '01:30:00',
        description: '',
        companyId: 2,
      },
      {
        id: 6,
        name: 'Terapia',
        price: 125.00,
        averageTime: '00:50:00',
        description: '',
        companyId: 3,
      },
      {
        id: 7,
        name: 'Manicure Basica',
        price: 60.00,
        averageTime: '00:50:00',
        description: '',
        companyId: 4,
      },
      {
        id: 8,
        name: 'Manicure completa',
        price: 150.00,
        averageTime: '01:30:00',
        description: '',
        companyId: 4,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
  },
};
