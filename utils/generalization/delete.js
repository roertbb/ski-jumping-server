const { parseId } = require('../../utils/parse');
const parseError = require('../parseError');

exports.del = async (req, res, relationData) => {
  const { class: secClass } = relationData.secondaryRelation;
  const { class: primClass } = relationData.mainRelation;
  const { id, name } = relationData;

  try {
    await secClass.destroy({ where: parseId(id, req.query) });
    await primClass.destroy({ where: parseId(id, req.query) });
    res.status(200).json({
      status: 'success',
      message: `Successfully deleted ${name}`
    });
  } catch (error) {
    res.status(500).json(parseError(error, name));
  }
};
