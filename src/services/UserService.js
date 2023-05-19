const md5 = require('md5');
const {
  User, Company, UserCompany, CompanyAddress, Schedule, Service, BusinessHour,
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

  return { status: 200, data: { token } };
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
  });

  const data = schedules.map(({
    id, date, hour, service: {
      name, price, averageTime, description, company,
    },
  }) => ({
    id,
    date: date.replaceAll('-', '/'),
    hour,
    company: {
      id: company.id,
      name: company.name,
    },
    service: {
      name, price, averageTime, description,
    },
  }));

  return { status: 200, data };
};

const createScheduleByUser = async (userId, serviceId, date, hour) => {
  const { id } = await Schedule.create({
    date, hour, userId, serviceId,
  });

  const data = {
    id,
    message: 'Schedule made successfully',
  };

  return { status: 201, data };
};

const createListBlockTimesByBusinessHour = ({ openTime, closeTime }, requestedDate) => {
  const TI_30MIN_IN_MILLISECONDS = 1800000;

  const openTimeInMilliseconds = (new Date(`${requestedDate} ${openTime}.000Z`)).getTime();
  const closeTimeInMilliseconds = (new Date(`${requestedDate} ${closeTime}.000Z`)).getTime();

  const BusinessHoursInMilliseconds = closeTimeInMilliseconds - openTimeInMilliseconds;

  const amountBlockTimes = BusinessHoursInMilliseconds / TI_30MIN_IN_MILLISECONDS;

  const listBlockTimes = [];
  let blockTime = openTimeInMilliseconds;
  for (let index = 1; index <= amountBlockTimes; index += 1) {
    listBlockTimes.push({ itsSchedule: false, scheduleTime: new Date(blockTime) });
    blockTime += TI_30MIN_IN_MILLISECONDS;
  }

  return listBlockTimes;
};

const convertInMillSeconds = (anyHour) => (anyHour.split(':').reverse().reduce((prev, curr, i) => (prev + curr * 60 ** i), 0)) * 1000;

const verifyCanSchedule = (schedules, scheduleToBeChecked, averageTimeToBeRequested) => {
  const verify = schedules.some(({ hour, date, service: { averageTime } }) => {
    const averageTimeInMilliseconds = convertInMillSeconds(averageTime);
    const scheduleDateInMilliseconds = (new Date(`${date} ${hour}.000Z`)).getTime();
    return (scheduleToBeChecked.getTime() > (scheduleDateInMilliseconds - averageTimeInMilliseconds)
    || scheduleToBeChecked.getTime() > (scheduleDateInMilliseconds - averageTimeToBeRequested))
    && scheduleToBeChecked.getTime() < (scheduleDateInMilliseconds + averageTimeInMilliseconds);
  });

  return verify;
};

const getAvailableScheduleByCompanyAndDate = async (companyId, serviceId, requestedDate) => {
  const TI_30MIN_IN_MILLISECONDS = 1800000;
  const dayWeekOfTheRequestedDate = (new Date(`${requestedDate} 12:00:00.000Z`)).getDay();

  const { averageTime, schedules, company } = await Service.findOne({
    where: { id: serviceId },
    attributes: { exclude: ['companyId', 'description', 'price'] },
    include: [
      {
        model: Schedule,
        as: 'schedules',
        // attributes: ['id', 'date', 'hour'],
        where: { date: requestedDate },
        required: false,
      },
      {
        model: Company,
        as: 'company',
        attributes: ['id', 'name'],
        include: {
          model: BusinessHour,
          as: 'businessHours',
          attributes: { exclude: ['id', 'companyId'] },
          where: { weekDay: dayWeekOfTheRequestedDate },
          required: false,

        },
      },
    ],
  });

  const result = await Company.findOne({
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

  const listBlockTimes = createListBlockTimesByBusinessHour(result.businessHours[0], requestedDate);
  const currentAverageTimeInMilliseconds = convertInMillSeconds(result.service[0].averageTime);
  const createAvailablesSchedules = listBlockTimes.map(({ scheduleTime }) => ({
    itsSchedule: verifyCanSchedule(result.schedules, scheduleTime, currentAverageTimeInMilliseconds),
    scheduleTime: scheduleTime.toISOString().split('T')[1].replace('.000Z', ''),
  }));

  const averageTimeToMill = (averageTime.split(':').reverse().reduce((prev, curr, i) => (prev + curr * 60 ** i), 0)) * 1000;
  const roundAverageTimeToMill = (Math.ceil(averageTimeToMill / TI_30MIN_IN_MILLISECONDS)) * TI_30MIN_IN_MILLISECONDS;

  const { openTime, closeTime } = company.businessHours.find(({ weekDay }) => {
    const day = (new Date(`${requestedDate} 12:00:00.000Z`)).getDay();
    return weekDay === day;
  });

  const open = (new Date(`${requestedDate} ${openTime}.000Z`)).getTime();
  const close = (new Date(`${requestedDate} ${closeTime}.000Z`)).getTime();

  const milliseconds = close - open;

  const available = [];
  let daytime = open;
  for (let index = 1; index <= (milliseconds / TI_30MIN_IN_MILLISECONDS); index += 1) {
    if (available.length > 0) {
      daytime += TI_30MIN_IN_MILLISECONDS;
      available.push({ ItScheduled: false, scheduleHour: new Date(daytime) });
    } else {
      available.push({ ItScheduled: false, scheduleHour: new Date(daytime) });
    }
  }

  const dpr = available.map(({ ItScheduled, scheduleHour }) => {
    const x = scheduleHour.toISOString().split('T')[1].replace('.000Z', '');
    const y = schedules.some(({ hour }) => {
      const d = (new Date(`${requestedDate} ${hour}.000Z`)).getTime();
      // console.log(scheduleHour, new Date(d - roundAverageTimeToMill));
      return scheduleHour.getTime() > (d - averageTimeToMill)
      && scheduleHour.getTime() < (d + averageTimeToMill);
    });
    return { ItScheduled: y, scheduleHour: x };
  });

  return { createAvailablesSchedules, result, dpr };
};

module.exports = {
  login,
  getAllCompanyByUserId,
  favorite,
  getAllUserSchedules,
  createScheduleByUser,
  getAvailableScheduleByCompanyAndDate,
};

// return (Math.ceil(averageTimeInMillSeecond / I_30MIN_IN_MILLISECONDS)) * I_30MIN_IN_MILLISECONDS;
