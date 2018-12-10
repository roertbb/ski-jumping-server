const Competition = require('../models/Competition');
const TeamCompetition = require('../models/TeamCompetition');
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
    'team-competition': ['competition_id']
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
    'team-competition': {}
  },
  mainRelation: { class: Competition, id: 'competition' },
  secondaryRelation: {
    class: TeamCompetition,
    id: 'team-competition'
  },
  id: 'competition_id',
  name: 'Team Competition'
};

const { get, create, update, del } = require('../utils/generalization');

exports.createTeamCompetition = async (req, res) => {
  create(req, res, relationData);
};

exports.getTeamCompetition = async (req, res) => {
  get(req, res, relationData);
};

exports.updateTeamCompetition = async (req, res) => {
  update(req, res, relationData);
};

exports.deleteTeamCompetition = async (req, res) => {
  del(req, res, relationData);
};
