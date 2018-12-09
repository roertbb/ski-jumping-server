const Person = require('./Person');
const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Coach = sequelize.define('coach', {
  person_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nationality: {
    type: Sequelize.STRING(30),
    allowNull: false
  }
});

Coach.belongsTo(Person, {
  foreignKey: 'person_id',
  constraints: true,
  primaryKey: true
});

module.exports = Coach;
