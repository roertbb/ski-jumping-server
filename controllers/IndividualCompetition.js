const Competition = require('../models/Competition');
const Tournament = require('../models/Tournament');
const SkiJumpingHill = require('../models/SkiJumpingHill');
const IndividualCompetition = require('../models/IndividualCompetition');
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
      ski_jumping_hill_id: {
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

exports.getIndividualCompetitions = async (req, res) => {
  get(req, res, relationData);
};

exports.getIndividualCompetition = async (req, res) => {
  const id = req.params.id;

  try {
    const indComp = await IndividualCompetition.findById(id, {
      include: {
        model: Competition,
        where: { competition_id: id },
        raw: true,
        required: true,
        nested: false
      },
      raw: true
    });
    const parsedIndComp = deletePrefixesSingleEntry(indComp);
    const tournament = await Tournament.findAll({
      where: { tournament_id: parsedIndComp.tournament_id },
      raw: true
    });
    const hill = await SkiJumpingHill.findAll({
      where: { ski_jumping_hill_id: parsedIndComp.ski_jumping_hill_id },
      raw: true
    });

    res.status(200).json({
      status: 'success',
      indComp: {
        ...parsedIndComp,
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

exports.updateIndividualCompetition = async (req, res) => {
  update(req, res, relationData);
};

exports.deleteIndividualCompetition = async (req, res) => {
  del(req, res, relationData);
};
