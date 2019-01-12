const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
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

  IndividualCompetition.associate = models => {
    IndividualCompetition.belongsTo(models.Competition, {
      foreignKey: 'competition_id',
      constraints: true,
      primaryKey: true,
      allowNull: false,
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
  };

  return IndividualCompetition;
};
