const { Router } = require('express');
const CompanyController = require('../controllers/CompanyController');
const { registerValidate, loginValidate, servicesValidate } = require('../middlewares/Validator/CompanyValidator');
const { AuthValidator } = require('../middlewares/auth');

const router = Router();

router
  .post('/login', loginValidate, CompanyController.login)
  .post('/register', registerValidate, CompanyController.register)
  .get('/my-services', AuthValidator, CompanyController.getServices)
  .post('/my-services', AuthValidator, servicesValidate, CompanyController.createService)
  .get('/schedules', AuthValidator, CompanyController.getSchedules);

module.exports = router;
