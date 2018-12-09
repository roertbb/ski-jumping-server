const { Op } = require('sequelize');

exports.parseCreate = (data, relationData, table, fallback = {}) => {
  const params = {};
  relationData.create[table].forEach(attr => {
    if (data[attr]) params[attr] = data[attr];
  });
  Object.entries(fallback).forEach(entry => {
    params[entry[0]] = entry[1];
  });
  return params;
};

exports.parseSearch = (data, relationData, table) => {
  const constraints = {};
  relationData.search[table].forEach(attr => {
    if (data[attr]) {
      const val =
        relationData[attr].op == Op.like ? `%${data[attr]}%` : data[attr];
      if (relationData[attr].value)
        constraints[relationData[attr].value] = {
          [relationData[attr].op]: val
        };
      else constraints[attr] = { [relationData[attr].op]: val };
    }
  });
  return constraints;
};

exports.parseSearch2 = (data, relationData, table) => {
  const constraints = {};
  Object.entries(relationData.search[table]).forEach(entry => {
    const attr = entry[0];
    if (data[attr]) {
      const val =
        relationData.search[table][attr].op == Op.like
          ? `%${data[attr]}%`
          : data[attr];
      if (relationData.search[table][attr].value) {
        constraints[relationData.search[table][attr].value] = {
          [relationData.search[table][attr].op]: val
        };
      } else {
        constraints[attr] = { [relationData.search[table][attr].op]: val };
      }
    }
  });
  return constraints;
};
