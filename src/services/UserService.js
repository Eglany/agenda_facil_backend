const md5 = require('md5');
const {
  User,
  Company,
  UserCompany,
  CompanyAddress,
  Schedule,
  Service,
  BusinessHour,
} = require('../database/models');
const { createJWT } = require('../Auth');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  const checkPassword = md5(password);

  const error = {
    field: 'email/password',
    message: 'Incorrect email or password',
  };

  if (!user || user.password !== checkPassword) return { status: 409, error };

  const token = createJWT(user);

  return { status: 200, data: { name: user.fullName, token } };
};

const getCompanyById = async (id) => {
  const company = await Company.findOne({ where: { id } });
  const error = {
    field: 'params',
    message: 'Company does not exist',
  };

  if (!company) return { error };

  return { data: company };
};

const getAllCompanyByUserId = async (userId) => {
  const userCompany = await UserCompany.findAll({
    where: { userId },
    include: {
      model: Company,
      as: 'company',
      attributes: {
        exclude: ['password'],
      },
      include: {
        model: CompanyAddress,
        as: 'companyAddresses',
        attributes: {
          exclude: ['id', 'companyId'],
        },
      },
    },
  });

  const data = userCompany.map(({ company }) => company);

  return { status: 200, data };
};

const favorite = async (userId, companyId) => {
  const { error } = await getCompanyById(companyId);

  if (error) return { status: 404, error };

  await UserCompany.create({ userId, companyId });

  const data = {
    message: 'Company added to favorites successfully',
  };

  return { status: 201, data };
};

const getAllUserSchedules = async (userId) => {
  const schedules = await Schedule.findAll({
    where: { userId },
    attributes: { exclude: ['userId', 'serviceId'] },
    include: [
      {
        model: Service,
        as: 'service',
        attributes: { exclude: ['id', 'companyId'] },
        include: {
          model: Company,
          as: 'company',
          attributes: ['id', 'name'],
        },
      },
    ],
    order: [['date', 'ASC']],
  });

  const data = schedules.map(
    ({
      id,
      date,
      hour,
      service: { name, price, averageTime, description, company },
    }) => ({
      id,
      date: date.replaceAll('-', '/'),
      hour,
      company: {
        id: company.id,
        name: company.name,
      },
      service: {
        name,
        price,
        averageTime,
        description,
      },
    })
  );

  return { status: 200, data };
};

const createScheduleByUser = async (
  userId,
  companyId,
  serviceId,
  date,
  hour
) => {
  const { id } = await Schedule.create({
    date,
    hour,
    userId,
    serviceId,
    companyId,
  });

  const data = {
    id,
    message: 'Schedule made successfully',
  };

  return { status: 201, data };
};

const createListBlockTimesByBusinessHour = (
  { openTime, closeTime },
  requestedDate
) => {
  const TI_30MIN_IN_MILLISECONDS = 1800000;

  const openTimeInMilliseconds = new Date(
    `${requestedDate} ${openTime}.000Z`
  ).getTime();
  const closeTimeInMilliseconds = new Date(
    `${requestedDate} ${closeTime}.000Z`
  ).getTime();

  const BusinessHoursInMilliseconds =
    closeTimeInMilliseconds - openTimeInMilliseconds;

  const amountBlockTimes =
    BusinessHoursInMilliseconds / TI_30MIN_IN_MILLISECONDS;

  const listBlockTimes = [];
  let blockTime = openTimeInMilliseconds;
  for (let index = 1; index <= amountBlockTimes; index += 1) {
    listBlockTimes.push({
      itsSchedule: false,
      scheduleTime: new Date(blockTime),
    });
    blockTime += TI_30MIN_IN_MILLISECONDS;
  }

  return listBlockTimes;
};

const convertInMillSeconds = (anyHour) =>
  anyHour
    .split(':')
    .reverse()
    .reduce((prev, curr, i) => prev + curr * 60 ** i, 0) * 1000;

const verifyCanSchedule = (
  schedules,
  scheduleToBeChecked,
  averageTimeToBeRequested
) => {
  const verify = schedules.some(({ hour, date, service: { averageTime } }) => {
    const averageTimeInMilliseconds = convertInMillSeconds(averageTime);
    const scheduleDateInMilliseconds = new Date(
      `${date} ${hour}.000Z`
    ).getTime();
    return (
      scheduleToBeChecked.getTime() >
        scheduleDateInMilliseconds - averageTimeToBeRequested &&
      scheduleToBeChecked.getTime() <
        scheduleDateInMilliseconds + averageTimeInMilliseconds
    );
  });

  return verify;
};

const getAvailableScheduleByCompanyAndDate = async (
  companyId,
  serviceId,
  requestedDate
) => {
  const dayWeekOfTheRequestedDate = new Date(
    `${requestedDate} 12:00:00.000Z`
  ).getDay();

  const { businessHours, service, schedules } = await Company.findOne({
    where: { id: companyId },
    attributes: ['id', 'name'],
    include: [
      {
        model: BusinessHour,
        as: 'businessHours',
        attributes: { exclude: ['id', 'companyId'] },
        where: { weekDay: dayWeekOfTheRequestedDate },
        required: false,
      },
      {
        model: Schedule,
        as: 'schedules',
        attributes: ['date', 'hour'],
        where: { date: requestedDate },
        required: false,
        include: {
          model: Service,
          as: 'service',
          attributes: ['averageTime'],
        },
      },
      {
        model: Service,
        as: 'service',
        where: { id: serviceId },
        attributes: ['id', 'averageTime'],
        required: false,
      },
    ],
  });

  const listBlockTimes = createListBlockTimesByBusinessHour(
    businessHours[0],
    requestedDate
  );
  const averageTimeInMilliseconds = convertInMillSeconds(
    service[0].averageTime
  );
  const closeTimeInMilliseconds = new Date(
    `${requestedDate} ${businessHours[0].closeTime}.000Z`
  ).getTime();
  const createAvailablesSchedules = listBlockTimes.map(({ scheduleTime }) => {
    const ver =
      scheduleTime.getTime() >
      closeTimeInMilliseconds - averageTimeInMilliseconds;
    return {
      itsSchedule:
        verifyCanSchedule(schedules, scheduleTime, averageTimeInMilliseconds) ||
        ver,
      scheduleTime: scheduleTime
        .toISOString()
        .split('T')[1]
        .replace('.000Z', ''),
    };
  });

  return { status: 200, data: createAvailablesSchedules };
};

const getAllCompanyServices = async (companyId) => {
  const services = await Service.findAll({
    where: { companyId },
    attributes: { exclude: ['companyId'] },
  });

  return { status: 200, data: services };
};

module.exports = {
  login,
  getAllCompanyByUserId,
  favorite,
  getAllUserSchedules,
  createScheduleByUser,
  getAvailableScheduleByCompanyAndDate,
  getAllCompanyServices,
};
