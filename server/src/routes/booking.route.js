const express = require('express');
const bookingController = require('../controllers/booking.controller');
const verifyToken = require('./../middleware/verifyToken.middleware');

const router = express.Router();

router.post('/create', verifyToken, bookingController.create);
router.post('/getAll', verifyToken, bookingController.getAll);
router.post('/update', verifyToken, bookingController.update);

module.exports = router;
