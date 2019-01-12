const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('team', {
    team_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    team: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    classification: {
      type: Sequelize.INTEGER(2)
    },
    classification_points: {
      type: Sequelize.INTEGER(4)
    }
  });
  Team.associate = models => {
    Team.belongsToMany(models.TeamCompetition, {
      through: {
        model: models.Result,
        unique: false
      },
      primaryKey: true,
      foreignKey: 'team_id',
      otherKey: 'competition_id',
      constraints: true,
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
  };

  return Team;
};
