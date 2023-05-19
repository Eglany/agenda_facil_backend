const { Router } = require('express');
const userRoutes = require('./userRoutes');
const companyRoutes = require('./companyRoutes');

const router = Router();

router.use('/user', userRoutes);
router.use('/company', companyRoutes);

module.exports = router;
