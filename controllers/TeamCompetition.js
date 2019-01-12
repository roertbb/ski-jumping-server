const {
  models: { SkiJumpingHill, Competition, TeamCompetition, Tournament }
} = require('../db');
const { Op } = require('sequelize');
const { deletePrefixesSingleEntry } = require('../utils/deletePrefixes');

const relationData = {
  create: {
    competition: [
      'competition_id',
      'competition_date',
      'start_gate',
      'tournament_id',
      'ski_jumping_hill_id'
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
      ski_jumping_hill_id: {
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

exports.getTeamCompetitions = async (req, res) => {
  get(req, res, relationData);
};

exports.getTeamCompetition = async (req, res) => {
  const id = req.params.id;

  try {
    const teamComp = await TeamCompetition.findById(id, {
      include: {
        model: Competition,
        where: { competition_id: id },
        raw: true,
        required: true,
        nested: false
      },
      raw: true
    });
    const parsedTeamComp = deletePrefixesSingleEntry(teamComp);
    const tournament = await Tournament.findAll({
      where: { tournament_id: parsedTeamComp.tournament_id },
      raw: true
    });
    const hill = await SkiJumpingHill.findAll({
      where: { ski_jumping_hill_id: parsedTeamComp.ski_jumping_hill_id },
      raw: true
    });

    res.status(200).json({
      status: 'success',
      teamComp: {
        ...parsedTeamComp,
        tournament: tournament[0] || undefined,
        hill: hill[0] || undefined
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

exports.updateTeamCompetition = async (req, res) => {
  update(req, res, relationData);
};

exports.deleteTeamCompetition = async (req, res) => {
  del(req, res, relationData);
};
