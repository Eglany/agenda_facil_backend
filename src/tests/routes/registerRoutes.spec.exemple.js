// const request = require('supertest');
// const app = require('../../app');
// require('dotenv').config();

// let server;
// beforeAll(() => {
//   const PORT = process.env.TEST_PORT || 3002;
//   server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// });

// afterAll((done) => {
//   server.close(done);
// });

// const URL = '/user/register';

// describe('Test endpoint POST /user/register', () => {
//   describe('Validation Tests', () => {
//     it('Caso o body da requisição esteja vazio', async () => {
//       const expectResponse = {
//         status: 400,
//         error: [
//           { field: 'name', message: '"name" is required' },
//           { field: 'email', message: '"email" is required' },
//           { field: 'password', message: '"password" is required' },
//           { field: 'phoneNumber', message: '"phoneNumber" is required' },
//         ],
//       };
//       const response = await request(app)
//         .post(URL)
//         .send({})
//         .expect(400);
//       expect(response.body).toStrictEqual(expectResponse);
//     });

//     it('Caso o campo "name" não seja enviado', async () => {
//       const expectResponse = {
//         status: 400,
//         error: [{ field: 'name', message: '"name" is required' }],
//       };
//       const actual = {
//         email: 'user@user.com',
//         password: 'user123',
//         phoneNumber: '92 9 0000-0000',
//       };

//       const response = await request(app)
//         .post(URL)
//         .send(actual)
//         .expect(400);

//       expect(response.body).toStrictEqual(expectResponse);
//     });

//     it('Caso o campo "name" esteja vazaio', async () => {
//       const expectResponse = {
//         status: 400,
//         error: [{ field: 'name', message: '"name" is not allowed to be empty' }],
//       };
//       const actual = {
//         name: '',
//         email: 'user@user.com',
//         password: 'user123',
//         phoneNumber: '92 9 0000-0000',
//       };

//       const response = await request(app)
//         .post(URL)
//         .send(actual)
//         .expect(400);

//       expect(response.body).toStrictEqual(expectResponse);
//     });

//     it('Caso o campo "name" não tenha o tamanho desejado', async () => {
//       const expectResponse = {
//         status: 400,
//         error: [{
//           field: 'name',
//           message: '"name" length must be at least 8 characters long',
//         }],
//       };
//       const actual = {
//         name: 'Eglany',
//         email: 'user@user.com',
//         password: 'user123',
//         phoneNumber: '92 9 0000-0000',
//       };

//       const response = await request(app)
//         .post(URL)
//         .send(actual)
//         .expect(400);

//       expect(response.body).toStrictEqual(expectResponse);
//     });

//     it('Caso o campo "email" não seja enviado', async () => {
//       const expectResponse = {
//         status: 400,
//         error: [{ field: 'email', message: '"email" is required' }],
//       };
//       const actual = {
//         name: 'Eglany Junior',
//         password: 'user123',
//         phoneNumber: '92 9 0000-0000',
//       };

//       const response = await request(app)
//         .post(URL)
//         .send(actual)
//         .expect(400);

//       expect(response.body).toStrictEqual(expectResponse);
//     });

//     it('Caso o campo "email" esteja vazaio', async () => {
//       const expectResponse = {
//         status: 400,
//         error: [{ field: 'email', message: '"email" is not allowed to be empty' }],
//       };
//       const actual = {
//         name: 'Eglany Junior',
//         email: '',
//         password: 'user123',
//         phoneNumber: '92 9 0000-0000',
//       };

//       const response = await request(app)
//         .post(URL)
//         .send(actual)
//         .expect(400);

//       expect(response.body).toStrictEqual(expectResponse);
//     });

//     it('Caso o campo "email" não esteja no formato desejado', async () => {
//       const expectResponse = {
//         status: 400,
//         error: [{
//           field: 'email',
//           message: '"email" must be a valid email',
//         }],
//       };
//       const actual = {
//         name: 'Eglany Junior',
//         email: 'useruser.com',
//         password: 'user123',
//         phoneNumber: '92 9 0000-0000',
//       };

//       const response = await request(app)
//         .post(URL)
//         .send(actual)
//         .expect(400);

//       expect(response.body).toStrictEqual(expectResponse);
//     });

//     it('Caso o campo "password" não seja enviado ', async () => {
//       const expectResponse = {
//         status: 400,
//         error: [{
//           field: 'password',
//           message: '"password" is required',
//         }],
//       };

//       const actual = {
//         name: 'Eglany Junior',
//         email: 'user@user.com',
//         phoneNumber: '92 9 0000-0000',
//       };

//       const response = await request(app)
//         .post(URL)
//         .send(actual)
//         .expect(400);

//       expect(response.body).toStrictEqual(expectResponse);
//     });

//     it('Caso o campo "password" esteja vazaio', async () => {
//       const expectResponse = {
//         status: 400,
//         error: [{ field: 'password', message: '"password" is not allowed to be empty' }],
//       };
//       const actual = {
//         name: 'Eglany Junior',
//         email: 'user@user.com',
//         password: '',
//         phoneNumber: '92 9 0000-0000',
//       };

//       const response = await request(app)
//         .post(URL)
//         .send(actual)
//         .expect(400);

//       expect(response.body).toStrictEqual(expectResponse);
//     });

//     it('Caso o campo "password" não tenha o tamanho desejado ', async () => {
//       const expectResponse = {
//         status: 400,
//         error: [{
//           field: 'password',
//           message: '"password" length must be at least 6 characters long',
//         }],
//       };

//       const actual = {
//         name: 'Eglany Junior',
//         password: '123',
//         email: 'user@user.com',
//         phoneNumber: '92 9 0000-0000',
//       };

//       const response = await request(app)
//         .post(URL)
//         .send(actual)
//         .expect(400);

//       expect(response.body).toStrictEqual(expectResponse);
//     });

//     it('Caso o campo "phoneNumber" não seja enviado', async () => {
//       const expectResponse = {
//         status: 400,
//         error: [{
//           field: 'phoneNumber',
//           message: '"phoneNumber" is required',
//         }],
//       };

//       const actual = {
//         name: 'Eglany Junior',
//         password: 'user123',
//         email: 'user@user.com',
//       };

//       const response = await request(app)
//         .post(URL)
//         .send(actual)
//         .expect(400);

//       expect(response.body).toStrictEqual(expectResponse);
//     });

//     it('Caso o campo "phoneNumber" esteja vazaio', async () => {
//       const expectResponse = {
//         status: 400,
//         error: [{ field: 'phoneNumber', message: '"phoneNumber" is not allowed to be empty' }],
//       };
//       const actual = {
//         name: 'Eglany Junior',
//         email: 'user@user.com',
//         password: 'user123',
//         phoneNumber: '',
//       };

//       const response = await request(app)
//         .post(URL)
//         .send(actual)
//         .expect(400);

//       expect(response.body).toStrictEqual(expectResponse);
//     });

//     it('Caso o campo "phoneNumber" não esteja no formato desejado', async () => {
//       const expectResponse = {
//         status: 400,
//         error: [{
//           field: 'phoneNumber',
//           message: '"phoneNumber" must follow the format: "DD 9 XXXX-XXXX"',
//         }],
//       };

//       const actual = {
//         name: 'Eglany Junior',
//         password: 'user123',
//         email: 'user@user.com',
//         phoneNumber: '92900000000',
//       };

//       const response = await request(app)
//         .post(URL)
//         .send(actual)
//         .expect(400);

//       expect(response.body).toStrictEqual(expectResponse);
//     });
//   });
// });
