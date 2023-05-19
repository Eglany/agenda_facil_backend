const Joi = require('joi').extend(require('@joi/date'));

const phoneNumberRegex = /(\d{2}) (\d{1}) (\d{4})-(\d{4})/;
const cepRegex = /^\d{5}-\d{3}$/;

const companySchema = Joi.object({
  companyInfo: Joi.object({
    name: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string()
      .regex(phoneNumberRegex)
      .message('"phoneNumber" must follow the format: "DD 9 XXXX-XXXX"')
      .required(),
  }).required(),
  companyAddress: Joi.array().items({
    cep: Joi.string().regex(cepRegex).required(),
    address: Joi.string().required(),
    complement: Joi.string().allow('').required(),
    neigborhood: Joi.string().required(),
    houseNumber: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
  }).required(),
  companyServices: Joi.array().items({
    serviceName: Joi.string().required(),
    value: Joi.number().positive().greater(0).required(),
    averageTime: Joi.date().format('HH:mm:ss').required(),
    description: Joi.string().allow('').max(500).required(),
  }).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const serviceSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().positive().greater(0).required(),
  averageTime: Joi.date()
    .format('HH:mm:ss')
    .required(),
  description: Joi.string().allow('').max(500).required(),
});

module.exports = { companySchema, loginSchema, serviceSchema };
