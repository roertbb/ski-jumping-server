const Competition = require('./Competition');
const Team = require('./Team');
const Result = require('./Result');
const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const TeamCompetition = sequelize.define('team-competition', {
  competition_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  }
});

TeamCompetition.belongsTo(Competition, {
  foreignKey: 'competition_id',
  constraints: true,
  primaryKey: true,
  allowNull: false,
  onDelete: 'restrict',
  onUpdate: 'restrict'
});

// TeamCompetition.belongsToMany(Team, {
//   through: {
//     model: Result,
//     unique: false
//   },
//   primaryKey: true,
//   foreignKey: 'team_competition_id',
//   constraints: true
// });

module.exports = TeamCompetition;
