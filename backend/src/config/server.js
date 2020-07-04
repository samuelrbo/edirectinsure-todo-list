const path = require('path');
const MAIN_DIR = `${path.dirname(require.main.filename)}`;

const rfs = require('rotating-file-stream');
const morgan = require('morgan');

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const jwt = require('./../app/middleware/jwt.middleware');

const logStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(MAIN_DIR, 'log')
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt);
app.use(morgan('combined', { stream: logStream }));

module.exports = app;
