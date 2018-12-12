const Competition = require('./Competition');
const SkiJumper = require('./SkiJumper');
const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Placement = sequelize.define('placement', {
  ski_jumper_id: {
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
  point: {
    type: Sequelize.INTEGER(3)
  }
});

SkiJumper.belongsToMany(Competition, {
  through: {
    model: Placement,
    unique: false
  },
  primaryKey: true,
  foreignKey: 'ski_jumper_id',
  otherKey: 'competition_id',
  constraints: true,
  onDelete: 'restrict',
  onUpdate: 'restrict'
});

module.exports = Placement;
