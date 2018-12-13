const Placement = require('../models/Placement');
const { Op } = require('sequelize');

const relationData = {
  create: {
    placement: ['person_id', 'competition_id', 'place', 'point']
  },
  search: {
    placement: {
      person_id: {
        op: Op.eq
      },
      competition_id: {
        op: Op.eq
      },
      place_from: {
        value: 'place',
        op: Op.gte
      },
      place_to: {
        value: 'place',
        op: Op.lte
      },
      point_from: {
        value: 'point',
        op: Op.gte
      },
      point_to: {
        value: 'point',
        op: Op.lte
      }
    }
  },
  relation: { class: Placement, id: 'placement' },
  id: ['ski_jumper_id', 'competition_id'],
  name: 'Placement'
};

const { get, create, update, del } = require('../utils/generalization');

exports.createPlacement = async (req, res) => {
  // create(req, res, relationData);
};

exports.getPlacement = async (req, res) => {
  // get(req, res, relationData);
};

exports.updatePlacement = async (req, res) => {
  // update(req, res, relationData);
};

exports.deletePlacement = async (req, res) => {
  // del(req, res, relationData);
};
