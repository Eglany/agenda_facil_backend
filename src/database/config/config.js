// import 'dotenv/config';
require('dotenv').config();

// const config = {
//   username: process.env.DB_USER || 'root',
//   password: process.env.DB_PASS || '123456',
//   database: process.env.DB_NAME || 'agenda_facil',
//   host: process.env.DB_HOST || 'localhost',
//   port: Number(process.env.DB_PORT) || 3306,
//   dialect: 'mysql',
//   dialectOptions: {
//     timezone: 'Z',
//   },
//   logging: false,
// };

const config = {
  development: {
    database: process.env.DB_NAME || 'agenda_facil',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    port: Number(process.env.DB_PORT) || 3306,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    logging: false,
  },
  test: {
    database: process.env.DB_TEST_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    logging: false,
  },
};

module.exports = config;
