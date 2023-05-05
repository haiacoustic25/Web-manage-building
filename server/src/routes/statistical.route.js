const express = require('express');
const verifyToken = require('./../middleware/verifyToken.middleware');
const StatisticalController = require('../controllers/statistical.controller');
const router = express.Router();

router.post('/statistical-customer', verifyToken, StatisticalController.statisticalCustomer);
router.post('/statistical-room', verifyToken, StatisticalController.statisticalRoom);
router.post('/statistical-gender', verifyToken, StatisticalController.statisticalGender);
router.post('/statistical-report', verifyToken, StatisticalController.statisticalReport);
router.post('/statistical-revenue', StatisticalController.statisticalRevenue);
module.exports = router;
