const express = require('express');
const userController = require('../controllers/user.controller');
const multer = require('multer');
// const upload = multer({ dest: "images/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
// const customerController = require("../controllers/customer.controller");

const router = express.Router();

router.post('/register', upload.single('file'), userController.register);
router.post('/login', userController.login);
router.get('/getUserByToken', userController.getUserByToken);
// router.post("/getAllBuildingsByUserId", userController.getAllBuildings);

module.exports = router;
