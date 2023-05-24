const { successUserRegister } = require('../tests/mock/registerRoute.mock');
const UserService = require('../services/UserService');

const register = (_request, response) => {
  const { status, data } = successUserRegister;

  return response.status(status).json({ status, data });
};

const login = async (request, response) => {
  const { email, password } = request.body;

  const { status, data, error } = await UserService.login(email, password);

  if (error) return response.status(status).json({ status, error });

  return response.status(status).json({ status, data });
};

const getUserCompanies = async (request, response) => {
  const { id } = request.data;

  const { status, data } = await UserService.getAllCompanyByUserId(id);

  return response.status(status).json({ status, data });
};

const favoriteCompany = async (request, response) => {
  const { id: userId } = request.data;
  const { id: companyId } = request.params;

  const { status, error, data } = await UserService.favorite(userId, companyId);

  if (error) return response.status(status).json({ status, error });

  return response.status(status).json({ status, data });
};

const getSchedules = async (request, response) => {
  const { id } = request.data;

  const { status, data } = await UserService.getAllUserSchedules(id);

  return response.status(status).json({ status, data });
};

const createSchudele = async (request, response) => {
  const { id: userId } = request.data;
  const {
    companyId, serviceId, date, hour,
  } = request.body;

  const { status, data } = await UserService
    .createScheduleByUser(userId, companyId, serviceId, date, hour);

  return response.status(status).json({ status, data });
};

const availableSchedules = async (request, response) => {
  const { companyId, serviceId, date } = request.body;

  const { status, data } = await UserService
    .getAvailableScheduleByCompanyAndDate(companyId, serviceId, date);

  return response.status(status).json({ status, data });
};

const allCompanyServices = async (request, response) => {
  // const { id: userId } = request.data;
  const { id: companyId } = request.params;

  const { status, data } = await UserService.getAllCompanyServices(companyId);

  return response.status(status).json({ status, data });
};

module.exports = {
  register,
  login,
  getUserCompanies,
  favoriteCompany,
  getSchedules,
  createSchudele,
  availableSchedules,
  allCompanyServices,
};
