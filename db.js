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
