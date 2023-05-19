const md5 = require('md5');
const { Company, Service } = require('../database/models');
const { createJWT } = require('../Auth');

const login = async (email, password) => {
  const company = await Company.findOne({ where: { email } });
  const checkPassword = md5(password);

  const error = {
    field: 'email/password',
    message: 'Incorrect email or password',
  };

  if (!company || company.password !== checkPassword) return { status: 409, error };

  const token = createJWT(company);

  return { status: 200, data: { token } };
};

const getAllCompanyServices = async (companyId) => {
  const allServices = await Service.findAll({ where: { companyId } });

  return { status: 200, data: allServices };
};

const createService = async (companyId, {
  name, price, averageTime, description,
}) => {
  const { id } = await Service.create({
    name, price, averageTime, description, companyId,
  });

  const data = {
    id,
    message: 'service was created successfully',
  };
  return { status: 200, data };
};

module.exports = { login, getAllCompanyServices, createService };
