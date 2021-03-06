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

// routes
const skiJumperRoute = require('./routes/skiJumper');
const teamRoute = require('./routes/Team');
const tournamentRoute = require('./routes/Tournament');
const skiJumpingHillRoute = require('./routes/SkiJumpingHill');
const coachRoute = require('./routes/Coach');
const individualCompetitonRoute = require('./routes/IndividualCompetiton');
const teamCompetitonRoute = require('./routes/TeamCompetition');
const competitonRoute = require('./routes/Competition');
const placementRoute = require('./routes/Placement');
const seriesResultRoute = require('./routes/SeriesResult');
const resultRoute = require('./routes/Result');

app.use('/ski-jumper', skiJumperRoute);
app.use('/team', teamRoute);
app.use('/tournament', tournamentRoute);
app.use('/ski-jumping-hill', skiJumpingHillRoute);
app.use('/coach', coachRoute);
app.use('/individual-competition', individualCompetitonRoute);
app.use('/team-competition', teamCompetitonRoute);
app.use('/competition', competitonRoute);
app.use('/placement', placementRoute);
app.use('/series-result', seriesResultRoute);
app.use('/result', resultRoute);

app.listen(port);
