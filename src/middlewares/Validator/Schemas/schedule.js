const Joi = require('joi').extend(require('@joi/date'));

const availableScheduleSchema = Joi.object({
  companyId: Joi.number().positive().greater(0).required(),
  serviceId: Joi.number().positive().greater(0).required(),
  date: Joi.date().format('YYYY-MM-DD').required(),
});

module.exports = { availableScheduleSchema };
