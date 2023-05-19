const { successUserRegister } = require('../tests/mock/registerRoute.mock');
const CompanyService = require('../services/CompanyService');

const register = (request, response) => {
  const { status, data } = successUserRegister;

  return response.status(status).json({ status, data });
};

const login = async (request, response) => {
  const { email, password } = request.body;

  const { status, data, error } = await CompanyService.login(email, password);

  if (error) return response.status(status).json({ status, error });

  return response.status(status).json({ status, data });
};

const getServices = async (request, response) => {
  const { id } = request.data;
  const { status, data } = await CompanyService.getAllCompanyServices(id);

  return response.status(status).json({ status, data });
};

const createService = async (request, response) => {
  const { id } = request.data;
  const { status, data } = await CompanyService.createService(id, request.body);

  return response.status(status).json({ status, data });
};

const getSchedules = async (request, response) => {
  const { id } = request.data;

  const { status, data } = await CompanyService.getAllCompanySchedules(id);

  return response.status(status).json(data);
};

module.exports = {
  register, login, getServices, createService, getSchedules,
};
