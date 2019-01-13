const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
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

  Placement.associate = models => {
    Placement.hasOne(models.Person, {
      foreignKey: 'person_id'
    });

    Placement.belongsTo(models.SkiJumper, {
      foreignKey: 'person_id',
      constraints: true,
      allowNull: false,
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });

    Placement.hasOne(models.Competition, {
      foreignKey: 'competition_id',
      constraints: true,
      allowNull: false
    });
  };

  return Placement;
};
