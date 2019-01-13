const {
  models: { Team, Person, SkiJumper, Coach }
} = require('../db');
const { Op } = require('sequelize');
const { deletePrefixes } = require('../utils/deletePrefixes');

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
      },
      classification_points_from: {
        value: 'classification_points',
        op: Op.gte
      },
      classification_points_to: {
        value: 'classification_points',
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

exports.getTeams = async (req, res) => {
  get(req, res, relationData);
};

exports.getTeam = async (req, res) => {
  const id = req.params.id;

  try {
    const team = await Team.findById(id, { raw: true });
    const skiJumpers = await SkiJumper.findAll({
      include: {
        where: { team_id: id },
        model: Person,
        raw: true,
        required: true,
        nested: false
      },
      raw: true
    });
    const coaches = await Coach.findAll({
      include: {
        where: { team_id: id },
        model: Person,
        raw: true,
        required: true,
        nested: false
      },
      raw: true
    });
    res.status(200).json({
      status: 'success',
      team: {
        ...team,
        skiJumpers: deletePrefixes(skiJumpers),
        coaches: deletePrefixes(coaches)
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

exports.updateTeam = async (req, res) => {
  update(req, res, relationData);
};

exports.deleteTeam = async (req, res) => {
  del(req, res, relationData);
};
