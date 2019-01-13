const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const SkiJumper = sequelize.define('ski-jumper', {
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
      type: Sequelize.INTEGER(2)
    },
    classification_points: {
      type: Sequelize.INTEGER(4)
    }
  });

  SkiJumper.associate = models => {
    SkiJumper.belongsTo(models.Person, {
      foreignKey: 'person_id',
      constraints: true,
      primaryKey: true,
      allowNull: false,
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });

    SkiJumper.hasMany(models.Placement, {
      foreignKey: 'person_id',
      allowNull: false
    });

    SkiJumper.belongsToMany(models.Competition, {
      through: {
        model: models.Placement,
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
  };

  return SkiJumper;
};
