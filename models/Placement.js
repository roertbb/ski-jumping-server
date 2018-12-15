const Competition = require('./Competition');
const SkiJumper = require('./SkiJumper');
const Person = require('./Person');
const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Placement = sequelize.define('placement', {
  person_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  competition_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  place: {
    type: Sequelize.INTEGER(2)
  },
  points: {
    type: Sequelize.INTEGER(3)
  }
});

Placement.hasOne(Person, {
  foreignKey: 'person_id'
});

SkiJumper.belongsToMany(Competition, {
  through: {
    model: Placement,
    unique: false,
    as: 'Placement'
  },
  primaryKey: true,
  foreignKey: 'person_id',
  otherKey: 'competition_id',
  constraints: true,
  onDelete: 'restrict',
  onUpdate: 'restrict'
});

module.exports = Placement;
