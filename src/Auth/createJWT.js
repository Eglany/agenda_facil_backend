const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET = fs.readFileSync('jwt.key', 'utf-8');

const jwtConfig = {
  expiresIn: '12h',
  algorithm: 'HS256',
};

const token = ({ id, email }) => {
  const newToken = jwt.sign({ data: { id, email } }, SECRET, jwtConfig);
  return newToken;
};

module.exports = token;
