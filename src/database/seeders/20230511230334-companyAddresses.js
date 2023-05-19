'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('CompanyAddresses', [
      {
        id: 1,
        cep: '69040-040',
        address: 'Avenida Dom Pedro I',
        complement: '',
        district: 'Dom Pedro',
        houseNumber: '00',
        city: 'Manaus',
        state: 'AM',
        companyId: 1,
      },
      {
        id: 2,
        cep: '69008-000',
        address: 'Avenida Getulio Vargas',
        complement: '',
        district: 'Colonia Antonio Aleixo',
        houseNumber: '00',
        city: 'Manaus',
        state: 'AM',
        companyId: 2,
      },
      {
        id: 3,
        cep: '69008-000',
        address: 'Avenida Djalma Batista',
        complement: 'Atlantic Tower, Altos',
        district: 'Chapada',
        houseNumber: '00',
        city: 'Manaus',
        state: 'AM',
        companyId: 3,
      },
      {
        id: 4,
        cep: '69090-001',
        address: 'Avenida Max Teixeira',
        complement: '',
        district: 'Cidade Nova',
        houseNumber: '00',
        city: 'Manaus',
        state: 'AM',
        companyId: 4,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('CompanyAddresses', null, {});
  },
};
