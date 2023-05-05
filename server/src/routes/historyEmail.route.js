const express = require('express');
const verifyToken = require('./../middleware/verifyToken.middleware');
const HistoryController = require('../controllers/history.controller');

const router = express.Router();

router.post('/getAllHistory', verifyToken, HistoryController.getAll);
router.post('/send-email-payment', verifyToken, HistoryController.sendEmailPayment);

module.exports = router;
