const {
  models: { Placement, SeriesResult, SkiJumper, Person }
} = require('../db');
const { flatten } = require('../utils/flatten');
const { Op } = require('sequelize');

const relationData = {
  create: {
    placement: ['person_id', 'competition_id', 'place', 'point']
  },
  search: {
    placement: {
      person_id: {
        op: Op.eq
      },
      competition_id: {
        op: Op.eq
      },
      place_from: {
        value: 'place',
        op: Op.gte
      },
      place_to: {
        value: 'place',
        op: Op.lte
      },
      point_from: {
        value: 'point',
        op: Op.gte
      },
      point_to: {
        value: 'point',
        op: Op.lte
      }
    }
  },
  relation: { class: Placement, id: 'placement' },
  id: ['person_id', 'competition_id'],
  name: 'Placement'
};

exports.createPlacement = async (req, res) => {
  const { person_id, competition_id } = req.body;

  try {
    await Placement.create({
      person_id,
      competition_id
    });
    const result = await Placement.find({
      where: { competition_id, person_id },
      include: [
        {
          model: SkiJumper,
          nested: false,
          required: true
        }
      ],
      raw: true
    });

    res.status(200).json({
      status: 'success',
      message: `Placement created`,
      created: flatten(result)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      error
    });
  }
};

exports.getPlacement = async (req, res) => {
  try {
    const result = await Placement.findAll({
      where: { competition_id: req.query.competition_id },
      include: [
        {
          model: SkiJumper,
          include: {
            model: Person
          },
          nested: false,
          required: true
        }
      ],
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

exports.deletePlacement = async (req, res) => {
  const { person_id, competition_id } = req.query;

  try {
    const resp1 = await SeriesResult.destroy({
      where: {
        person_id: Number(person_id),
        competition_id: Number(competition_id)
      }
    });
    // console.log(resp1);
    const resp2 = await Placement.destroy({
      where: {
        person_id: Number(person_id),
        competition_id: Number(competition_id)
      }
    });
    // console.log(resp2);

    res.status(200).json({
      status: 'success',
      message: `Successfully deleted Placement`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      message: `Couldn't delete Placement`,
      error
    });
  }
};
