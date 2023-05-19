const request = require('supertest');
const app = require('../../../app');
require('dotenv').config();

describe('Test endpoint /company/my-Services', () => {
  const URL = '/company/my-services';

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
              id: 1,
              name: 'Corte',
              price: '30.00',
              averageTime: '00:45:00',
              description: '',
              companyId: 1,
            },
            {
              id: 2,
              name: 'Barba',
              price: '20.00',
              averageTime: '00:30:00',
              description: '',
              companyId: 1,
            },
            {
              id: 3,
              name: 'Corte + Barba',
              price: '45.00',
              averageTime: '01:00:00',
              description: '',
              companyId: 1,
            },
          ],
        };
        const actual = {
          email: 'barbearia@mail.com',
          password: 'Barbearia@123',
        };

        const { body: { data } } = await request(app)
          .post('/company/login')
          .send(actual);

        const response = await request(app)
          .get(URL)
          .set('Authorization', data.token);

        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual(expectResponse);
      });
    });
  });

  describe('==POST==', () => {
    describe('1. Validation fields:', () => {
      let token;
      beforeAll((done) => {
        const actual = {
          email: 'barbearia@mail.com',
          password: 'Barbearia@123',
        };

        request(app)
          .post('/company/login')
          .send(actual)
          .end((err, { body }) => {
            token = body.data.token;
            if (err) return done(err);
            return done();
          });
      });

      it('Caso o campo "name" não seja enviado.', async () => {
        const expectResponse = {
          status: 400,
          error: [{
            field: 'name',
            message: '"name" is required',
          }],
        };

        const actual = {
          price: 250.00,
          averageTime: '02:30:00',
          description: '',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', token);

        expect(response.status).toEqual(400);
        expect(response.body).toStrictEqual(expectResponse);
      });

      it('Caso o campo "name" esteja vazaio.', async () => {
        const expectResponse = {
          status: 400,
          error: [{
            field: 'name',
            message: '"name" is not allowed to be empty',
          }],
        };

        const actual = {
          name: '',
          price: 250.00,
          averageTime: '02:30:00',
          description: '',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', token);

        expect(response.status).toEqual(400);
        expect(response.body).toStrictEqual(expectResponse);
      });

      it('Caso o campo "name" não tenha o tamanho desejado.', async () => {
        const expectResponse = {
          status: 400,
          error: [{
            field: 'name',
            message: '"name" length must be at least 3 characters long',
          }],
        };

        const actual = {
          name: 'no',
          price: 250.00,
          averageTime: '02:30:00',
          description: '',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', token);

        expect(response.status).toEqual(400);
        expect(response.body).toStrictEqual(expectResponse);
      });

      it('Caso o campo "price" não seja enviado.', async () => {
        const expectResponse = {
          status: 400,
          error: [{
            field: 'price',
            message: '"price" is required',
          }],
        };

        const actual = {
          name: 'Progressiva',
          averageTime: '02:30:00',
          description: '',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', token);

        expect(response.status).toEqual(400);
        expect(response.body).toStrictEqual(expectResponse);
      });

      it('Caso o campo "price" seja igual a 0 ou não positivo.', async () => {
        const expectResponse = {
          status: 400,
          error: [
            { field: 'price', message: '"price" must be a positive number' },
            { field: 'price', message: '"price" must be greater than 0' },
          ],
        };

        const actual = {
          name: 'Progressiva',
          price: 0,
          averageTime: '02:30:00',
          description: '',
        };

        const actual2 = {
          name: 'Progressiva',
          price: -30,
          averageTime: '02:30:00',
          description: '',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', token);

        const response2 = await request(app)
          .post(URL)
          .send(actual2)
          .set('Authorization', token);

        expect(response.status && response2.status).toEqual(400);
        expect(response.body).toStrictEqual(expectResponse);
        expect(response2.body).toStrictEqual(expectResponse);
      });

      it('Caso o campo "averageTime" não seja enviado.', async () => {
        const expectResponse = {
          status: 400,
          error: [{
            field: 'averageTime',
            message: '"averageTime" is required',
          }],
        };

        const actual = {
          name: 'Progressiva',
          price: 250.00,
          description: '',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', token);

        expect(response.status).toEqual(400);
        expect(response.body).toStrictEqual(expectResponse);
      });

      it('Caso o campo "averageTime" esteja vazio ou não em um formato desejado.', async () => {
        const expectResponse = {
          status: 400,
          error: [{
            field: 'averageTime',
            message: '"averageTime" must be in HH:mm:ss format',
          }],
        };

        const actual = {
          name: 'Progressiva',
          price: 250.00,
          averageTime: '',
          description: '',
        };

        const actual2 = {
          name: 'Progressiva',
          price: 250.00,
          averageTime: 'notformat',
          description: '',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', token);

        const response2 = await request(app)
          .post(URL)
          .send(actual2)
          .set('Authorization', token);

        expect(response.status && response2.status).toEqual(400);
        expect(response.body).toStrictEqual(expectResponse);
        expect(response2.body).toStrictEqual(expectResponse);
      });

      it('Caso o campo "description" não esteja no formato desejado.', async () => {
        const expectResponse = {
          status: 400,
          error: [{
            field: 'description',
            message: '"description" is required',
          }],
        };

        const actual = {
          name: 'Progressiva',
          price: 250.00,
          averageTime: '02:30:00',
        };

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', token);

        expect(response.status).toEqual(400);
        expect(response.body).toStrictEqual(expectResponse);
      });
    });

    describe('2. fail case:', () => {
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

    describe('3. Success case:', () => {
      it('Caso o estabelecimento consiga criar um servico novo.', async () => {
        const expectResponse = {
          status: 200,
          data: {
            id: 9,
            message: 'service was created successfully',
          },
        };

        const actual = {
          name: 'Progressiva',
          price: 250.00,
          averageTime: '02:30:00',
          description: '',
        };

        const { body: { data } } = await request(app)
          .post('/company/login')
          .send({
            email: 'barbearia@mail.com',
            password: 'Barbearia@123',
          });

        const response = await request(app)
          .post(URL)
          .send(actual)
          .set('Authorization', data.token);

        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual(expectResponse);
      });
    });
  });
});
