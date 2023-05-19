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
  const { serviceId, date, hour } = request.body;

  const { status, data } = await UserService.createScheduleByUser(userId, serviceId, date, hour);

  return response.status(status).json({ status, data });
};

const testeroute = async (_request, response) => {
  // const { id: userId } = request.data;

  const idk = await UserService.getAvailableScheduleByCompanyAndDate(1, 1, '2023-05-29');

  return response.status(200).json(idk);
};

module.exports = {
  register, login, getUserCompanies, favoriteCompany, getSchedules, createSchudele, testeroute,
};
