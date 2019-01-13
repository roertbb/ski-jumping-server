const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Coach = sequelize.define('coach', {
    person_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nationality: {
      type: Sequelize.STRING(30),
      allowNull: false
    }
  });

  Coach.associate = models => {
    models.Coach.belongsTo(models.Person, {
      foreignKey: 'person_id',
      constraints: true,
      primaryKey: true,
      allowNull: false,
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
  };

  return Coach;
};
