const Tournament = require('../models/Tournament');
const { Op } = require('sequelize');

const relationData = {
  create: {
    tournament: ['tournament_id', 'name', 'edition']
  },
  search: {
    tournament: {
      name: {
        op: Op.like
      },
      edition_from: {
        value: 'edition',
        op: Op.gte
      },
      edition_to: {
        value: 'edition',
        op: Op.lte
      }
    }
  },
  relation: { class: Tournament, id: 'tournament' },
  id: 'tournament_id',
  name: 'tournament'
};

const { get, create, update, del } = require('../utils/standalone');

exports.createTournament = async (req, res) => {
  create(req, res, relationData);
};

exports.getTournament = async (req, res) => {
  get(req, res, relationData);
};

exports.updateTournament = async (req, res) => {
  update(req, res, relationData);
};

exports.deleteTournament = async (req, res) => {
  del(req, res, relationData);
};
