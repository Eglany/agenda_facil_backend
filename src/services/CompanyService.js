const md5 = require('md5');
const {
  Company, Service, Schedule, User,
} = require('../database/models');
const { createJWT } = require('../Auth');

const login = async (email, password) => {
  const company = await Company.findOne({ where: { email } });
  console.log(company);
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

const getAllCompanySchedules = async (companyId) => {
  const schedules = await Schedule.findAll({
    where: { companyId },
    attributes: { exclude: ['userId', 'serviceId', 'companyId'] },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'fullName'],
      },
      {
        model: Service,
        as: 'service',
        attributes: ['name', 'averageTime'],
      },
    ],
    order: [['date', 'ASC']],
  });

  return { status: 200, data: schedules };
};

module.exports = {
  login, getAllCompanyServices, createService, getAllCompanySchedules,
};
