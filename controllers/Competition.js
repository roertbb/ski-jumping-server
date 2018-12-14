const Competition = require('../models/Competition');
const SkiJumpingHill = require('../models/SkiJumpingHill');
const { flatten } = require('../utils/flatten');

exports.getCompetition = async (req, res) => {
  try {
    const result = await Competition.findAll({
      include: {
        model: SkiJumpingHill,
        nested: false,
        required: true
      },
      raw: true
    });

    res.status(200).json({
      status: 'success',
      results: result.map(res => flatten(res))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      error
    });
  }
};
