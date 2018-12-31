const Tournament = require('../models/Tournament');
const SkiJumpingHill = require('../models/SkiJumpingHill');
const IndividualCompetition = require('../models/IndividualCompetition');
const TeamCompetition = require('../models/TeamCompetition');
const Competition = require('../models/Competition');
const { Op } = require('sequelize');
const { deletePrefixes } = require('../utils/deletePrefixes');

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

exports.getTournaments = async (req, res) => {
  get(req, res, relationData);
};

exports.getTournament = async (req, res) => {
  const id = req.params.id;

  try {
    const skiJumpingHills = await SkiJumpingHill.findAll({ raw: true });
    // get individual competition and it's ski jumping hills
    const individualCompetitions = await IndividualCompetition.findAll({
      include: [
        {
          model: Competition,
          where: { tournament_id: id },
          raw: true,
          required: true,
          nested: false
        }
      ],
      raw: true
    });
    const parsedIndividualCompetition = deletePrefixes(individualCompetitions);
    const indWithHills = parsedIndividualCompetition.map(comp => {
      const hill = skiJumpingHills.filter(
        hill => hill.ski_jumping_hill_id === comp.ski_jumping_hill_id
      )[0];
      return {
        ...hill,
        ...comp
      };
    });
    // get team competition and it's ski jumping hills
    const teamCompetitions = await TeamCompetition.findAll({
      include: [
        {
          model: Competition,
          where: { tournament_id: id },
          raw: true,
          required: true,
          nested: false
        }
      ],
      raw: true
    });
    const parsedTeamCompetition = deletePrefixes(teamCompetitions);
    const teamWithHills = parsedTeamCompetition.map(comp => {
      const hill = skiJumpingHills.filter(
        hill => hill.ski_jumping_hill_id === comp.ski_jumping_hill_id
      )[0];
      return {
        ...hill,
        ...comp
      };
    });
    // get tournaments
    const tournament = await Tournament.findById(id, { raw: true });
    res.status(200).json({
      status: 'success',
      tournament: {
        ...tournament,
        individualCompetitions: indWithHills,
        teamCompetitions: teamWithHills
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

exports.updateTournament = async (req, res) => {
  update(req, res, relationData);
};

exports.deleteTournament = async (req, res) => {
  del(req, res, relationData);
};
