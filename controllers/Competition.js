const Competition = require('../models/Competition');
const SkiJumpingHill = require('../models/SkiJumpingHill');
const IndividualCompetition = require('../models/IndividualCompetition');
const { flatten } = require('../utils/flatten');
const { sequelize } = require('../db');

exports.getCompetition = async (req, res) => {
  try {
    const result = await Competition.findAll({
      include: [
        {
          model: SkiJumpingHill,
          nested: false,
          required: true
        }
      ],
      raw: true
    });

    const ind = await IndividualCompetition.findAll({
      include: {
        model: Competition,
        include: {
          model: SkiJumpingHill
        }
      },
      raw: true
    });
    const parsedInd = ind.map(indComp => flatten(indComp));

    result.forEach(res => {
      if (
        parsedInd.filter(r => r.competition_id === res.competition_id)
          .length === 0
      ) {
        parsedInd.push(flatten(res));
      }
    });

    res.status(200).json({
      status: 'success',
      results: parsedInd
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      error
    });
  }
};

exports.finishCompetition = async (req, res) => {
  try {
    const resp = await IndividualCompetition.find({
      where: {
        competition_id: req.query.competition_id
      }
    });
    // console.log(resp);
    if (resp !== null) {
      await sequelize.query('call updateClassification();');
    } else {
      await sequelize.query('call updateTeamClassification();');
    }
    res.status(200).json({
      message: 'success'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'failure'
    });
  }
};
