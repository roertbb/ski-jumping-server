const Person = require('../models/Person');
const Coach = require('../models/Coach');
const Team = require('../models/Team');
const { Op } = require('sequelize');

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
      raw: true
    });
    const person = await Person.findById(id, { raw: true });
    console.log(coach, person);
    const team = await Team.findById(person.team_id, { raw: true });

    res.status(200).json({
      status: 'success',
      coach: {
        ...team,
        ...person,
        ...coach
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
