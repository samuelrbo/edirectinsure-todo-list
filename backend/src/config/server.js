const path = require('path');
const MAIN_DIR = `${path.dirname(require.main.filename)}`;

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const jwt = require('./../app/middleware/jwt.middleware');

const app = express();

app.use(cors({ exposedHeaders: [
  'Cache-Control', 'Content-Language', 'Content-Type',
  'Expires', 'Last-Modified', 'Pragma', 'Content-Range'
]}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt);

module.exports = app;
