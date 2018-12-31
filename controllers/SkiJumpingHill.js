const SkiJumpingHill = require('../models/SkiJumpingHill');
const { Op } = require('sequelize');

const relationData = {
  create: {
    ski_jumping_hill: [
      'ski_jumping_hill_id',
      'name',
      'country',
      'city',
      'type',
      'size',
      'k_point',
      'record'
    ]
  },
  search: {
    ski_jumping_hill: {
      name: {
        op: Op.like
      },
      country: {
        op: Op.like
      },
      city: {
        op: Op.like
      },
      type: {
        op: Op.eq
      },
      size_from: {
        value: 'size',
        op: Op.gte
      },
      size_to: {
        value: 'size',
        op: Op.lte
      },
      k_point_from: {
        value: 'k_point',
        op: Op.gte
      },
      k_point_to: {
        value: 'k_point',
        op: Op.lte
      },
      record_from: {
        value: 'record',
        op: Op.gte
      },
      record_to: {
        value: 'record',
        op: Op.lte
      }
    }
  },
  relation: { class: SkiJumpingHill, id: 'ski_jumping_hill' },
  id: 'ski_jumping_hill_id',
  name: 'Ski Jumping Hill'
};

const { get, create, update, del } = require('../utils/standalone');

exports.createSkiJumpingHill = async (req, res) => {
  create(req, res, relationData);
};

exports.getSkiJumpingHills = async (req, res) => {
  get(req, res, relationData);
};

exports.getSkiJumpingHill = async (req, res) => {
  const id = req.params.id;
  try {
    const hill = await SkiJumpingHill.findById(id, { raw: true });
    res.status(200).json({
      status: 'success',
      hill
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'failure',
      error
    });
  }
};

exports.updateSkiJumpingHill = async (req, res) => {
  update(req, res, relationData);
};

exports.deleteSkiJumpingHill = async (req, res) => {
  del(req, res, relationData);
};
