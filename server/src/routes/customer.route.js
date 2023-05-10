const express = require('express');
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
const customerController = require('../controllers/customer.controller');
// const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.post('/create', verifyToken, upload.single('file'), customerController.create);
router.post('/getAllCustomer', verifyToken, customerController.getAllCustomer);

router.post('/update', verifyToken, upload.single('file'), customerController.update);
router.post('/remove', verifyToken, customerController.remove);

module.exports = router;
