const Person = require('./Person');
const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const SkiJumper = sequelize.define('ski_jumper', {
  person_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  fis_id: {
    type: Sequelize.INTEGER(5),
    allowNull: false
  },
  personal_best: {
    type: Sequelize.FLOAT(4, 1),
    allowNull: false
  },
  active: {
    type: Sequelize.STRING(1),
    allowNull: false
  },
  height: {
    type: Sequelize.INTEGER(3),
    allowNull: false
  },
  weight: {
    type: Sequelize.INTEGER(2),
    allowNull: false
  },
  classification: {
    type: Sequelize.INTEGER(2),
    defaultValue: null
  }
});

SkiJumper.belongsTo(Person, {
  foreignKey: 'person_id',
  constraints: true,
  primaryKey: true
});

module.exports = SkiJumper;
