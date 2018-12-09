const Sequelize = require('sequelize');

const { sequelize } = require('../db');

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
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Person;
