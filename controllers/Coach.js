const Person = require('../models/Person');
const Coach = require('../models/Coach');
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

exports.getCoach = async (req, res) => {
  get(req, res, relationData);
};

exports.updateCoach = async (req, res) => {
  update(req, res, relationData);
};

exports.deleteCoach = async (req, res) => {
  del(req, res, relationData);
};
