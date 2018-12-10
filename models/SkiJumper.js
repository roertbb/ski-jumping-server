const Person = require('./Person');
const Competition = require('./Competition');
const Placement = require('./Placement');
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
    type: Sequelize.FLOAT(4, 1)
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
  primaryKey: true,
  allowNull: false,
  onDelete: 'restrict',
  onUpdate: 'restrict'
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

module.exports = SkiJumper;
