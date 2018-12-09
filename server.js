const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

// config
const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
dotenv.config();
const port = process.env.PORT || 3000;

// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// db connection
const { connectToDb } = require('./db');
connectToDb();

const skiJumperRoute = require('./routes/skiJumper');
app.use('/ski-jumper', skiJumperRoute);

app.listen(port);
