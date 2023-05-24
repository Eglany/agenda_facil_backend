const { availableScheduleSchema } = require('./Schemas/schedule');

const availableScheduleValidate = (request, response, next) => {
  const { error: err } = availableScheduleSchema.validate(request.body, { abortEarly: false });
  if (err) {
    const error = err.details.map(({ message, path }) => {
      const field = path[0];
      return { field, message };
    });
    return response.status(400).json({ status: 400, error });
  }
  return next();
};

module.exports = { availableScheduleValidate };
