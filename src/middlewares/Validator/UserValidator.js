const { userSchema, loginSchema, scheduleSchema } = require('./Schemas/user');

const registerValidate = (request, response, next) => {
  const { error: err } = userSchema.validate(request.body, { abortEarly: false });
  if (err) {
    const error = err.details.map(({ message, path }) => {
      const field = path[0];
      return { field, message };
    });
    return response.status(400).json({ status: 400, error });
  }
  return next();
};

const loginValidate = (request, response, next) => {
  const { error: err } = loginSchema.validate(request.body, { abortEarly: false });
  if (err) {
    const error = err.details.map(({ message, path }) => {
      const field = path[0];
      return { field, message };
    });
    return response.status(400).json({ status: 400, error });
  }
  return next();
};

const scheduleValidate = (request, response, next) => {
  const { error: err } = scheduleSchema.validate(request.body, { abortEarly: false });
  if (err) {
    const error = err.details.map(({ message, path }) => {
      const field = path[0];
      return { field, message };
    });
    return response.status(400).json({ status: 400, error });
  }
  return next();
};
module.exports = { registerValidate, loginValidate, scheduleValidate };
