const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Competition = sequelize.define('competition', {
    competition_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    competition_date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    start_gate: {
      type: Sequelize.INTEGER(2),
      allowNull: false
    }
  });

  Competition.associate = models => {
    Competition.belongsTo(models.Tournament, {
      foreignKey: 'tournament_id',
      constraints: true,
      allowNull: true,
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });

    Competition.belongsTo(models.SkiJumpingHill, {
      foreignKey: 'ski_jumping_hill_id',
      constraints: true,
      allowNull: false,
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });

    Competition.hasMany(models.Placement, {
      foreignKey: 'competition_id',
      allowNull: false
    });

    Competition.hasOne(models.IndividualCompetition, {
      foreignKey: 'competition_id',
      allowNull: true
    });

    Competition.hasOne(models.TeamCompetition, {
      foreignKey: 'competition_id',
      allowNull: true
    });
  };

  return Competition;
};
