'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Companies', [
      {
        id: 1,
        name: 'Barbearia Dom Pedro',
        email: 'barbearia@mail.com',
        password: 'c5e6dcafbed49ba930f36bc1e4309e86', // password md5('Barbearia@123');
        phoneNumber: '92 9 0000-0000',
      },
      {
        id: 2,
        name: 'Clinica Odontologiaca Dona Maria',
        email: 'dona_maria@mail.com',
        password: '2a2c9d3a54c5bd6ea9e297cc2981dce1', // password md5('Dentista@123');
        phoneNumber: '92 9 0000-0000',
      },
      {
        id: 3,
        name: 'Clinica Terapeutica',
        email: 'terapia@mail.com',
        password: '5382177840afc7b3810578ffb3d20d6e', // password md5('Terapia@123');
        phoneNumber: '92 9 0000-0000',
      },
      {
        id: 4,
        name: 'Manicure Cheila',
        email: 'manicure@mail.com',
        password: '08dc35899ac31b58ef86a8edf06bcb1b', // password md5('Manicure@123');
        phoneNumber: '92 9 0000-0000',
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Companies', null, {});
  },
};
