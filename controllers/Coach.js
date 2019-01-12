const {
  models: { Team, Person, Coach }
} = require('../db');
const { Op } = require('sequelize');
const { deletePrefixesSingleEntry } = require('../utils/deletePrefixes');

const relationData = {
  create: {
    person: ['person_id', 'first_name', 'surname', 'birth_date', 'team_id'],
    coach: ['person_id', 'nationality']
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
    coach: {
      nationality: {
        op: Op.like
      }
    }
  },
  mainRelation: { class: Person, id: 'person' },
  secondaryRelation: { class: Coach, id: 'coach' },
  id: 'person_id',
  name: 'Coach'
};

const { get, create, update, del } = require('../utils/generalization');

exports.createCoach = async (req, res) => {
  create(req, res, relationData);
};

exports.getCoaches = async (req, res) => {
  get(req, res, relationData);
};

exports.getCoach = async (req, res) => {
  const id = req.params.id;

  try {
    const coach = await Coach.findById(id, {
      include: {
        model: Person,
        raw: true,
        required: true,
        nested: false
      },
      raw: true
    });
    const parsedCoach = deletePrefixesSingleEntry(coach);
    const team = await Team.findById(parsedCoach.team_id, { raw: true });

    res.status(200).json({
      status: 'success',
      coach: {
        ...team,
        ...parsedCoach
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'failure',
      error
    });
  }
};

exports.updateCoach = async (req, res) => {
  update(req, res, relationData);
};

exports.deleteCoach = async (req, res) => {
  del(req, res, relationData);
};
