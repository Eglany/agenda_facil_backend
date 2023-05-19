const request = require('supertest');
const app = require('../../app');

let server;
beforeAll(() => {
  const PORT = process.env.TEST_PORT || 3002;
  server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

afterAll((done) => {
  server.close(done);
});

const URL = '/company/register';

const requestBodyTest = {
  companyInfo: {
    name: 'Company Name',
    email: 'company@company.com',
    password: 'company123',
    phoneNumber: '92 9 0000-0000',
  },
  companyAddress: [{
    cep: '69037-900',
    address: 'Avenida Coronel Teixeira',
    complement: '',
    neigborhood: 'Ponta Negra',
    houseNumber: '00',
    state: 'AM',
    city: 'Manaus',
  }],
  companyServices: [{
    serviceName: 'Corte de Cabelo Masculino',
    value: 30.00,
    averageTime: '00:30:00',
    description: '',
  }],
};

// describe('Test endpoint POST /company/register', () => {
//   describe('Validation Tests', () => {
//     it('Caso o campo "name" não seja enviado', async () => {
//       // const expectResponse = {
//       //   status: 400,
//       //   error: [{ field: 'name', message: '"name" is required' }],
//       // };
//       // const actual = {
//       //   email: 'user@user.com',
//       //   password: 'user123',
//       //   phoneNumber: '92 9 0000-0000',
//       // };

//       const response = await request(app)
//         .post(URL)
//         .send(requestBodyTest)
//         .expect(400);

//       console.log(response.body);
//       // expect(response.body).toStrictEqual(expectResponse);
//     });
//   });
// });
