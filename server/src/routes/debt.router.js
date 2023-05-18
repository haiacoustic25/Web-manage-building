const express = require('express');
const debtController = require('../controllers/debt.controller');
const verifyToken = require('./../middleware/verifyToken.middleware');

const router = express.Router();

router.post('/create', verifyToken, debtController.create);
router.post('/getAllDebt', verifyToken, debtController.getAllDebt);
router.get('/findDebtByRoomId/:roomId', debtController.findDebtByRoomId);
router.post('/update', verifyToken, debtController.update);
router.delete('/delete', verifyToken, debtController.destroy);

module.exports = router;
