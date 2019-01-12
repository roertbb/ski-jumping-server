const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const TeamCompetition = sequelize.define('team-competition', {
    competition_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  });

  TeamCompetition.associate = models => {
    TeamCompetition.belongsTo(models.Competition, {
      foreignKey: 'competition_id',
      constraints: true,
      primaryKey: true,
      allowNull: false,
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
  };

  return TeamCompetition;
};
