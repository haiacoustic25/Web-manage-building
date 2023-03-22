const express = require('express');
const roomController = require('../controllers/room.controller');
const verifyToken = require('./../middleware/verifyToken.middleware');

const router = express.Router();

// router.post("/create", verifyToken, buildingController.create);
router.post('/getAllRoomByBuildingId', verifyToken, roomController.getAllRooms);
router.post('/update', verifyToken, roomController.update);
// router.delete("/delete", verifyToken, roomController.deleteBuilding);

module.exports = router;
