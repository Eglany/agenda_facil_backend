const { validateJWT } = require('../../Auth');

const AuthValidator = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    const error = {
      field: 'headers',
      message: '"Authorization" is required',
    };

    return response.status(401).json({ status: 401, error });
  }
  const isAuthorized = validateJWT(authorization);

  if (!isAuthorized) {
    const error = {
      field: 'authorization',
      message: 'Expired or invalid token',
    };

    return response.status(401).json({ status: 401, error });
  }
  request.data = isAuthorized.data;

  return next();
};

module.exports = { AuthValidator };
