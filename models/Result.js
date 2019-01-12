const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('result', {
    team_id: {
      type: Sequelize.INTEGER
    },
    place: {
      type: Sequelize.INTEGER(2)
    },
    points: {
      type: Sequelize.INTEGER(3)
    }
  });

  // Result.associate = models => {};

  return Result;
};
