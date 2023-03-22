const ApiRouter = require('./src/routes/api.route');

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// var multer = require("multer");
// var upload = multer();

const morgan = require('morgan');
const app = express();
var bodyParser = require('body-parser');

dotenv.config();

const port = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());

// app.use(express.static(__dirname, "public"));
app.use('public', express.static(__dirname + 'public'));
app.use('/images', express.static('images'));

ApiRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
