const express = require('express');
const multer = require('multer');
const verifyToken = require('./../middleware/verifyToken.middleware');
const FurnitureController = require('../controllers/furniture.controller');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post('/create', upload.single('file'), verifyToken, FurnitureController.create);
router.post('/getAllFurniture', verifyToken, FurnitureController.getAll);
router.post('/update', upload.single('file'), verifyToken, FurnitureController.update);

module.exports = router;
