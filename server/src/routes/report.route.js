const express = require('express');
const verifyToken = require('./../middleware/verifyToken.middleware');
const ReportController = require('../controllers/report.controller');
const router = express.Router();

router.post('/create', verifyToken, ReportController.create);
router.post('/getAllReport', verifyToken, ReportController.getAll);
router.post('/update', verifyToken, ReportController.update);
module.exports = router;
