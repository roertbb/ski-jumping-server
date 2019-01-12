const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define('tournament', {
    tournament_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    edition: {
      type: Sequelize.INTEGER(3),
      allowNull: false
    }
  });

  Tournament.associate = models => {};

  return Tournament;
};
