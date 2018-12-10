const Competition = require('./Competition');
const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const IndividualCompetition = sequelize.define('individual-competition', {
  competition_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  qualification_date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  }
});

IndividualCompetition.belongsTo(Competition, {
  foreignKey: 'competition_id',
  constraints: true,
  primaryKey: true,
  allowNull: false,
  onDelete: 'restrict',
  onUpdate: 'restrict'
});

module.exports = IndividualCompetition;
