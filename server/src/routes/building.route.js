const express = require('express');
const buildingController = require('../controllers/building.controller');
const verifyToken = require('./../middleware/verifyToken.middleware');

const router = express.Router();

router.post('/create', verifyToken, buildingController.create);
router.post('/getAllBuildingsByUserId', verifyToken, buildingController.getAllBuildings);
router.post('/update', verifyToken, buildingController.update);
router.delete('/delete', verifyToken, buildingController.deleteBuilding);

module.exports = router;
