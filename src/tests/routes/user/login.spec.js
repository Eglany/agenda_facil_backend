const request = require('supertest');
const app = require('../../../app');
require('dotenv').config();

describe('Test endpoint POST /user/login', () => {
  const URL = '/user/login';
  describe('1. Validation fields:', () => {
    it('Caso o campo "email" não seja enviado.', async () => {
      const expectResponse = {
        status: 400,
        error: [{ field: 'email', message: '"email" is required' }],
      };
      const actual = {
        password: 'Barbearia@123',
      };

      const response = await request(app)
        .post(URL)
        .send(actual)
        .expect(400);

      expect(response.body).toStrictEqual(expectResponse);
    });

    it('Caso o campo "email" esteja vazaio.', async () => {
      const expectResponse = {
        status: 400,
        error: [{ field: 'email', message: '"email" is not allowed to be empty' }],
      };
      const actual = {
        email: '',
        password: 'Barbearia@123',
      };

      const response = await request(app)
        .post(URL)
        .send(actual)
        .expect(400);

      expect(response.body).toStrictEqual(expectResponse);
    });

    it('Caso o campo "email" não esteja no formato desejado.', async () => {
      const expectResponse = {
        status: 400,
        error: [{
          field: 'email',
          message: '"email" must be a valid email',
        }],
      };
      const actual = {
        email: 'barbearia.com',
        password: 'Barbearia@123',
      };
      const response = await request(app)
        .post(URL)
        .send(actual)
        .expect(400);

      expect(response.body).toStrictEqual(expectResponse);
    });

    it('Caso o campo "password" não seja enviado.', async () => {
      const expectResponse = {
        status: 400,
        error: [{
          field: 'password',
          message: '"password" is required',
        }],
      };

      const actual = {
        email: 'barbearia@mail.com',
      };

      const response = await request(app)
        .post(URL)
        .send(actual)
        .expect(400);

      expect(response.body).toStrictEqual(expectResponse);
    });

    it('Caso o campo "password" esteja vazaio.', async () => {
      const expectResponse = {
        status: 400,
        error: [{ field: 'password', message: '"password" is not allowed to be empty' }],
      };

      const actual = {
        email: 'barbearia@mail.com',
        password: '',
      };

      const response = await request(app)
        .post(URL)
        .send(actual)
        .expect(400);

      expect(response.body).toStrictEqual(expectResponse);
    });

    it('Caso o campo "password" não tenha o tamanho desejado.', async () => {
      const expectResponse = {
        status: 400,
        error: [{
          field: 'password',
          message: '"password" length must be at least 6 characters long',
        }],
      };

      const actual = {
        email: 'barbearia@mail.com',
        password: '@123',
      };

      const response = await request(app)
        .post(URL)
        .send(actual)
        .expect(400);

      expect(response.body).toStrictEqual(expectResponse);
    });
  });

  describe('2: Fail cases', () => {
    it('Caso o usuario não exista', async () => {
      const expectResponse = {
        status: 409,
        error: {
          field: 'email/password',
          message: 'Incorrect email or password',
        },
      };

      const actual = {
        email: 'failcase@mail.com',
        password: 'fail@123',
      };

      const response = await request(app)
        .post(URL)
        .send(actual)
        .expect(409);

      expect(response.body).toStrictEqual(expectResponse);
    });

    it('Caso o usuario exista mas a senha estiver incorreta.', async () => {
      const expectResponse = {
        status: 409,
        error: {
          field: 'email/password',
          message: 'Incorrect email or password',
        },
      };

      const actual = {
        email: 'barbearia@mail.com',
        password: 'notPassword@123',
      };

      const response = await request(app)
        .post(URL)
        .send(actual)
        .expect(409);

      expect(response.body).toStrictEqual(expectResponse);
    });
  });

  describe('3. Success Case:', () => {
    it('Caso o login seja efetuado com sucesso.', async () => {
      const actual = {
        email: 'oswaldo@mail.com',
        password: 'Oswaldo@123',
      };

      const response = await request(app)
        .post(URL)
        .send(actual);

      expect(response.status).toEqual(200);
      expect(response.body.data.token).not.toBeNull();
    });
  });
});
