const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const SkiJumpingHill = sequelize.define('ski-jumping-hill', {
    ski_jumping_hill_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    country: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    city: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    type: {
      type: Sequelize.STRING(1),
      allowNull: false
    },
    size: {
      type: Sequelize.INTEGER(3),
      allowNull: false
    },
    k_point: {
      type: Sequelize.INTEGER(3),
      allowNull: false
    },
    record: {
      type: Sequelize.FLOAT(4, 1)
    }
  });

  // SkiJumpingHill.associate = models => {};
  return SkiJumpingHill;
};
