const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET = fs.readFileSync('jwt.key', 'utf-8');

const decoded = (token) => {
  try {
    const decodedToken = jwt.verify(token, SECRET);
    return decodedToken;
  } catch (error) {
    return null;
  }
};

module.exports = decoded;
