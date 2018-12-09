const Team = require('../models/Team');
const { Op } = require('sequelize');

const relationData = {
  create: {
    team: ['team_id', 'team', 'classification']
  },
  search: {
    team: {
      team: {
        op: Op.like
      },
      classification_from: {
        value: 'classification',
        op: Op.gte
      },
      classification_to: {
        value: 'classification',
        op: Op.lte
      }
    }
  },
  relation: { class: Team, id: 'team' },
  id: 'team_id',
  name: 'Team'
};

const { get, create, update, del } = require('../utils/standalone');

exports.createTeam = async (req, res) => {
  create(req, res, relationData);
};

exports.getTeam = async (req, res) => {
  get(req, res, relationData);
};

exports.updateTeam = async (req, res) => {
  update(req, res, relationData);
};

exports.deleteTeam = async (req, res) => {
  del(req, res, relationData);
};
