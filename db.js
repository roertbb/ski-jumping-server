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

exports.connectToDb = () => {
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
};
