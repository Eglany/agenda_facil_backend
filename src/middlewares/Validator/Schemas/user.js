const Joi = require('joi').extend(require('@joi/date'));

const phoneNumberRegex = /(\d{2}) (\d{1}) (\d{4})-(\d{4})/;

const userSchema = Joi.object({
  name: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phoneNumber: Joi.string()
    .regex(phoneNumberRegex)
    .message('"phoneNumber" must follow the format: "DD 9 XXXX-XXXX"')
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const scheduleSchema = Joi.object({
  serviceId: Joi.number().positive().greater(0).required(),
  date: Joi.date().format('YYYY/MM/DD').required(),
  hour: Joi.date().format('HH:mm:ss').required(),
});

module.exports = { userSchema, loginSchema, scheduleSchema };
