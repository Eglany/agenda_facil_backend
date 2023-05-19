const { companySchema, loginSchema, serviceSchema } = require('./Schemas/company');

const joiOptions = { abortEarly: false, convert: true };

const registerValidate = (request, response, next) => {
  const { error: err } = companySchema.validate(request.body, joiOptions);
  if (err) {
    const error = err.details.map(({ message, path }) => {
      const field = path[0];
      console.log(path);
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

const servicesValidate = (request, response, next) => {
  const { error: err } = serviceSchema.validate(request.body, { abortEarly: false });
  if (err) {
    const error = err.details.map(({ message, path }) => {
      const field = path[0];
      return { field, message };
    });
    return response.status(400).json({ status: 400, error });
  }
  return next();
};

module.exports = { registerValidate, loginValidate, servicesValidate };
