const express = require('express');
const roomController = require('../controllers/room.controller');
const multer = require('multer');
const verifyToken = require('./../middleware/verifyToken.middleware');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

// router.post("/create", verifyToken, buildingController.create);
router.post('/getAllRoomByBuildingId', verifyToken, roomController.getAllRooms);
router.post('/create', verifyToken, roomController.create);
router.post('/update', verifyToken, roomController.update);
router.delete('/delete', verifyToken, roomController.destroy);
router.post('/createCustomer', verifyToken, upload.single('file'), roomController.createCustomer);
// router.delete("/delete", verifyToken, roomController.deleteBuilding);

module.exports = router;
