'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        fullName: 'Ruan Almeida dos Santos',
        email: 'ruan@mail.com',
        password: 'f519b33efee882ffb88c2ed7cada2965', // password: md5('Ruan@123')
        phoneNumber: '92 9 0000-0000',
      },
      {
        id: 2,
        fullName: 'Igor Bennet Gonçalves da Silva',
        email: 'igor@mail.com',
        password: '825222a6bec39d6273911779f9b37e44', // password: md5('Igor@123')
        phoneNumber: '92 9 0000-0000',
      },
      {
        id: 3,
        fullName: 'Oswaldo Mauricio dos Santos de assis',
        email: 'oswaldo@mail.com',
        password: '09ee78671d11b914c4181075e6568a3a', // password: md5('Oswaldo@123')
        phoneNumber: '92 9 0000-0000',
      },
      {
        id: 4,
        fullName: 'Marjory Sofia de Oliveira Bezerra',
        email: 'marjory@mail.com',
        password: '171cc54bbab2052f3fffe30af677f09e', // password: md5('Marjory@123')
        phoneNumber: '92 9 0000-0000',
      },
      {
        id: 5,
        fullName: 'Sofia Dos Santos Nascimento',
        email: 'sofia@mail.com',
        password: '9522e93ffe213398538b70a48d14ce16', // password: md5('Sofia@123')
        phoneNumber: '92 9 0000-0000',
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
