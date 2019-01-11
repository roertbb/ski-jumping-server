const Person = require('../models/Person');
const SkiJumper = require('../models/SkiJumper');
const Team = require('../models/Team');
const Placement = require('../models/Placement');
const Competition = require('../models/Competition');
const { Op } = require('sequelize');
const { sequelize } = require('../db');
const { deletePrefixesSingleEntry } = require('../utils/deletePrefixes');

const relationData = {
  create: {
    person: ['person_id', 'first_name', 'surname', 'birth_date', 'team_id'],
    'ski-jumper': [
      'person_id',
      'fis_id',
      'personal_best',
      'active',
      'height',
      'weight',
      'classification'
    ]
  },
  search: {
    person: {
      first_name: {
        op: Op.like
      },
      surname: {
        op: Op.like
      },
      birth_date_from: {
        value: 'birth_date',
        op: Op.gte
      },
      birth_date_to: {
        value: 'birth_date',
        op: Op.lte
      },
      team_id: {
        op: Op.eq
      }
    },
    'ski-jumper': {
      fis_id: {
        op: Op.eq
      },
      height_from: {
        value: 'height',
        op: Op.gte
      },
      height_to: {
        value: 'height',
        op: Op.lte
      },
      weight_from: {
        value: 'weight',
        op: Op.gte
      },
      weight_to: {
        value: 'height',
        op: Op.lte
      },
      personal_best_from: {
        value: 'personal_best',
        op: Op.gte
      },
      personal_best_to: {
        value: 'personal_best',
        op: Op.lte
      }
    }
  },
  mainRelation: { class: Person, id: 'person' },
  secondaryRelation: { class: SkiJumper, id: 'ski-jumper' },
  id: 'person_id',
  name: 'Ski Jumper'
};

const { get, create, update, del } = require('../utils/generalization');

exports.createSkiJumper = async (req, res) => {
  create(req, res, relationData);
};

exports.getSkiJumpers = async (req, res) => {
  get(req, res, relationData);
};

exports.getSkiJumper = async (req, res) => {
  const id = req.params.id;

  try {
    const skiJumper = await SkiJumper.findById(id, {
      include: {
        model: Person,
        raw: true,
        required: true,
        nested: false
      },
      raw: true
    });
    const parsedSkiJumper = deletePrefixesSingleEntry(skiJumper);
    const team = await Team.findById(parsedSkiJumper.team_id, { raw: true });
    const bmiResp = await sequelize.query(`select calcBMI(${id})`);
    const bmi = Object.values(bmiResp[0][0])[0];

    const placements = await Placement.findAll({
      where: {
        person_id: parsedSkiJumper.person_id
      }
    });

    res.status(200).json({
      status: 'success',
      skiJumper: {
        ...team,
        ...parsedSkiJumper,
        bmi,
        placements
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      error
    });
  }
};

exports.updateSkiJumper = async (req, res) => {
  update(req, res, relationData);
};

exports.deleteSkiJumper = async (req, res) => {
  del(req, res, relationData);
};

exports.getBmi = async (req, res) => {
  const resp = await sequelize.query(`select calcBMI(${req.query.person_id})`);
  const bmi = Object.values(resp[0][0])[0];
  res.status(200).json({
    status: 'success',
    bmi: bmi
  });
};
