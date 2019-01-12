const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('person', {
    person_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    surname: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    birth_date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    team_id: {
      type: Sequelize.INTEGER
    }
  });

  Person.associate = models => {
    Person.belongsTo(models.Team, {
      foreignKey: 'team_id',
      constraints: true,
      allowNull: false,
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
  };

  return Person;
};
