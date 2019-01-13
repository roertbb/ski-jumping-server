const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  }
);

const path = require('path');

const models = {
  Coach: sequelize.import('./models/Coach.js'),
  Competition: sequelize.import(
    path.join(__dirname, './models/Competition.js')
  ),
  IndividualCompetition: sequelize.import(
    path.join(__dirname, './models/IndividualCompetition.js')
  ),
  Person: sequelize.import(path.join(__dirname, './models/Person.js')),
  Placement: sequelize.import(path.join(__dirname, './models/Placement.js')),
  Result: sequelize.import(path.join(__dirname, './models/Result.js')),
  SeriesResult: sequelize.import(
    path.join(__dirname, './models/SeriesResult.js')
  ),
  SkiJumper: sequelize.import(path.join(__dirname, './models/SkiJumper.js')),
  SkiJumpingHill: sequelize.import(
    path.join(__dirname, './models/SkiJumpingHill.js')
  ),
  Team: sequelize.import(path.join(__dirname, './models/Team.js')),
  TeamCompetition: sequelize.import(
    path.join(__dirname, './models/TeamCompetition.js')
  ),
  Tournament: sequelize.import(path.join(__dirname, './models/Tournament.js'))
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

exports.models = models;
exports.sequelize = sequelize;

const initialMigration = require('./utils/initialMigration');

exports.connectToDb = () => {
  sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => sequelize.sync({ force: true }))
    .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .then(async () => {
      await initialMigration();
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
};
