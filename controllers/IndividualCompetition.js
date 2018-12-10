const Competition = require('../models/Competition');
const IndividualCompetition = require('../models/IndividualCompetition');
const { Op } = require('sequelize');

const relationData = {
  create: {
    competition: [
      'competition_id',
      'competition_date',
      'start_gate',
      'tournament_id',
      'hill_id'
    ],
    'individual-competition': ['competition_id', 'qualification_date']
  },
  search: {
    competition: {
      competition_date_from: {
        value: 'competition_date',
        op: Op.gte
      },
      competition_date_to: {
        value: 'competition_date',
        op: Op.lte
      },
      start_gate_from: {
        value: 'start_gate',
        op: Op.gte
      },
      start_gate_to: {
        value: 'start_gate',
        op: Op.lte
      },
      tournament_id: {
        op: Op.eq
      },
      hill_id: {
        op: Op.eq
      }
    },
    'individual-competition': {
      qualification_date_from: {
        value: 'qualification_date',
        op: Op.gte
      },
      qualification_date_to: {
        value: 'qualification_date',
        op: Op.lte
      }
    }
  },
  mainRelation: { class: Competition, id: 'competition' },
  secondaryRelation: {
    class: IndividualCompetition,
    id: 'individual-competition'
  },
  id: 'competition_id',
  name: 'Individual Competition'
};

const { get, create, update, del } = require('../utils/generalization');

exports.createIndividualCompetition = async (req, res) => {
  create(req, res, relationData);
};

exports.getIndividualCompetition = async (req, res) => {
  get(req, res, relationData);
};

exports.updateIndividualCompetition = async (req, res) => {
  update(req, res, relationData);
};

exports.deleteIndividualCompetition = async (req, res) => {
  del(req, res, relationData);
};
