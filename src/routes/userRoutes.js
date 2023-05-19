const { Router } = require('express');
const UserController = require('../controllers/UserController');
const { registerValidate, loginValidate, scheduleValidate } = require('../middlewares/Validator/UserValidator');
const { AuthValidator } = require('../middlewares/auth');

const router = Router();

router
  .post('/login', loginValidate, UserController.login)
  .post('/register', registerValidate, UserController.register)
  .get('/my-companies', AuthValidator, UserController.getUserCompanies)
  .post('/my-companies/:id', AuthValidator, UserController.favoriteCompany)
  .get('/schedules', AuthValidator, UserController.getSchedules)
  .post('/schedules', AuthValidator, scheduleValidate, UserController.createSchudele)
  .post('/teste', AuthValidator, UserController.availableSchedules);

module.exports = router;
