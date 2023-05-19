const request = require('supertest');
const { describe, expect } = require('@jest/globals');
const app = require('../../../app');
require('dotenv').config();

describe('Test endpoint /user/schedules', () => {
  let userToken;
  const URL = '/user/schedules';
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

    describe('2. success case:', () => {
      it('Caso a requisição um seja efetuada com sucesso.', async () => {
        const expectResponse = {
          status: 200,
          data: [
            {
              id: 4,
              date: '2023/05/27',
              hour: '09:00:00',
              company: {
                id: 1,
                name: 'Barbearia Dom Pedro',
              },
              service: {
                name: 'Corte',
                price: '30.00',
                averageTime: '00:45:00',
                description: '',
              },
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
        const response = await request(app).post(URL);

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
          .post(URL)
          .set('Authorization', 'invalid');

        expect(response.status).toEqual(401);
        expect(response.body).toStrictEqual(expectResponse);
      });
    });

    describe('2. validation filds', () => {
      it('Caso o campo "serviceId" não seja enviado.', async () => {
        const expectResponse = {
          status: 400,
          error: [{
            field: 'serviceId',
            message: '"serviceId" is required',
          }],
        };

        const actual = {
          date: '2023/06/14',
          hour: '14:30:00',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', userToken);

        expect(response.status).toEqual(400);
        expect(response.body).toStrictEqual(expectResponse);
      });

      it('Caso o campo "serviceId" seja igual a 0 ou não positivo.', async () => {
        const expectResponse = {
          status: 400,
          error: [
            { field: 'serviceId', message: '"serviceId" must be a positive number' },
            { field: 'serviceId', message: '"serviceId" must be greater than 0' },
          ],
        };

        const actual = {
          serviceId: 0,
          date: '2023/06/14',
          hour: '14:30:00',
        };
        const actual2 = {
          serviceId: -3,
          date: '2023/06/14',
          hour: '14:30:00',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', userToken);

        const response2 = await request(app)
          .post(URL)
          .send(actual2)
          .set('Authorization', userToken);

        expect(response.status && response2.status).toEqual(400);
        expect(response.body).toStrictEqual(expectResponse);
        expect(response2.body).toStrictEqual(expectResponse);
      });

      it('Caso o campo "date" não seja enviado.', async () => {
        const expectResponse = {
          status: 400,
          error: [{
            field: 'date',
            message: '"date" is required',
          }],
        };

        const actual = {
          serviceId: 1,
          hour: '14:30:00',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', userToken);

        expect(response.status).toEqual(400);
        expect(response.body).toStrictEqual(expectResponse);
      });

      it('Caso o campo "date" esteja vazio ou não em um formato desejado.', async () => {
        const expectResponse = {
          status: 400,
          error: [{
            field: 'date',
            message: '"date" must be in YYYY/MM/DD format',
          }],
        };

        const actual = {
          serviceId: 1,
          date: '',
          hour: '14:30:00',
        };
        const actual2 = {
          serviceId: 1,
          date: 'invalid',
          hour: '14:30:00',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', userToken);

        const response2 = await request(app)
          .post(URL)
          .send(actual2)
          .set('Authorization', userToken);

        expect(response.status && response2.status).toEqual(400);
        expect(response.body).toStrictEqual(expectResponse);
        expect(response2.body).toStrictEqual(expectResponse);
      });

      it('Caso o campo "hour" não seja enviado.', async () => {
        const expectResponse = {
          status: 400,
          error: [{
            field: 'hour',
            message: '"hour" is required',
          }],
        };

        const actual = {
          serviceId: 1,
          date: '2023/06/14',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', userToken);

        expect(response.status).toEqual(400);
        expect(response.body).toStrictEqual(expectResponse);
      });

      it('Caso o campo "hour" esteja vazio ou não em um formato desejado.', async () => {
        const expectResponse = {
          status: 400,
          error: [{
            field: 'hour',
            message: '"hour" must be in HH:mm:ss format',
          }],
        };

        const actual = {
          serviceId: 1,
          date: '2023/06/14',
          hour: '',
        };
        const actual2 = {
          serviceId: 1,
          date: '2023/06/14',
          hour: 'invalid',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', userToken);

        const response2 = await request(app)
          .post(URL)
          .send(actual2)
          .set('Authorization', userToken);

        expect(response.status && response2.status).toEqual(400);
        expect(response.body).toStrictEqual(expectResponse);
        expect(response2.body).toStrictEqual(expectResponse);
      });
    });

    describe('3. success case:', () => {
      it('Caso a requisição um seja efetuada com sucesso.', async () => {
        const actual = {
          serviceId: 1,
          date: '2023/06/14',
          hour: '14:30:00',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', userToken);

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data).toHaveProperty('message');
      });
    });
  });
});
