const request = require('supertest');
const app = require('../../../app');
require('dotenv').config();

describe('Test endpoint /user/my-companies', () => {
  let userToken;
  const URL = '/user/my-companies';
  beforeAll((done) => {
    const user = {
      email: 'oswaldo@mail.com',
      password: 'Oswaldo@123',
    };

    request(app)
      .post('/user/login')
      .send(user)
      .end((err, { body }) => {
        userToken = body.data.token;
        if (err) return done(err);
        return done();
      });
  });

  describe('==GET==', () => {
    describe('1. fail case:', () => {
      it('Caso não exista um campo "Authorizarion" no Header da requisição.', async () => {
        const expectResponse = {
          status: 401,
          error: {
            field: 'headers',
            message: '"Authorization" is required',
          },
        };
        const response = await request(app).get(URL);

        expect(response.status).toEqual(401);
        expect(response.body).toStrictEqual(expectResponse);
      });

      it('Caso seja enviado um token invalido.', async () => {
        const expectResponse = {
          status: 401,
          error: {
            field: 'authorization',
            message: 'Expired or invalid token',
          },
        };
        const response = await request(app)
          .get(URL)
          .set('Authorization', 'invalid');

        expect(response.status).toEqual(401);
        expect(response.body).toStrictEqual(expectResponse);
      });
    });
    describe('2. Success case:', () => {
      it('Caso a requisição um seja efetuada com sucesso.', async () => {
        const expectResponse = {
          status: 200,
          data: [
            {
              id: 1,
              name: 'Barbearia Dom Pedro',
              email: 'barbearia@mail.com',
              phoneNumber: '92 9 0000-0000',
              companyAddresses: [
                {
                  cep: '69040-040',
                  address: 'Avenida Dom Pedro I',
                  complement: '',
                  district: 'Dom Pedro',
                  houseNumber: '00',
                  city: 'Manaus',
                  state: 'AM',
                },
              ],
            },
          ],
        };

        const response = await request(app)
          .get(URL)
          .set('Authorization', userToken);

        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual(expectResponse);
      });
    });
  });

  describe('==POST==', () => {
    describe('1. fail case:', () => {
      it('Caso não exista um campo "Authorizarion" no Header da requisição.', async () => {
        const expectResponse = {
          status: 401,
          error: {
            field: 'headers',
            message: '"Authorization" is required',
          },
        };
        const response = await request(app).post(`${URL}/2`);

        expect(response.status).toEqual(401);
        expect(response.body).toStrictEqual(expectResponse);
      });

      it('Caso seja enviado um token invalido.', async () => {
        const expectResponse = {
          status: 401,
          error: {
            field: 'authorization',
            message: 'Expired or invalid token',
          },
        };
        const response = await request(app)
          .post(`${URL}/2`)
          .set('Authorization', 'invalid');

        expect(response.status).toEqual(401);
        expect(response.body).toStrictEqual(expectResponse);
      });

      it('Caso a requisição passe um "id" de um estabelecimento inexistente.', async () => {
        const expectResponse = {
          status: 404,
          error: {
            field: 'params',
            message: 'Company does not exist',
          },
        };

        const response = await request(app)
          .post(`${URL}/9`)
          .set('Authorization', userToken);

        expect(response.status).toEqual(404);
        expect(response.body).toStrictEqual(expectResponse);
      });
    });

    describe('2. success case:', () => {
      it('Caso o estabelecimento consiga criar um servico novo.', async () => {
        const expectResponse = {
          status: 201,
          data: {
            message: 'Company added to favorites successfully',
          },
        };

        const response = await request(app)
          .post(`${URL}/3`)
          .set('Authorization', userToken);

        expect(response.status).toEqual(201);
        expect(response.body).toStrictEqual(expectResponse);
      });
    });
  });
});
