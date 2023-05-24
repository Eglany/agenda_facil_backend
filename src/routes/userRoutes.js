const { Router } = require('express');
const UserController = require('../controllers/UserController');
const { registerValidate, loginValidate, scheduleValidate } = require('../middlewares/Validator/UserValidator');
const { AuthValidator } = require('../middlewares/auth');
const { availableScheduleValidate } = require('../middlewares/Validator/ScheduleValidator');

const router = Router();

router
  .post('/login', loginValidate, UserController.login)
  .post('/register', registerValidate, UserController.register)
  .get('/my-companies', AuthValidator, UserController.getUserCompanies)
  .post('/my-companies/:id', AuthValidator, UserController.favoriteCompany)
  .get('/my-companies/:id/services', AuthValidator, UserController.allCompanyServices)
  .get('/schedules', AuthValidator, UserController.getSchedules)
  .post('/schedules', AuthValidator, scheduleValidate, UserController.createSchudele)
  .post('/available-schedules', AuthValidator, availableScheduleValidate, UserController.availableSchedules);

module.exports = router;
