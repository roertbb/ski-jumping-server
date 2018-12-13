const { parseId } = require('../../utils/parse');

exports.del = async (req, res, relationData) => {
  const { class: relClass } = relationData.relation;
  const { id, name } = relationData;

  console.log(req.query, id, req.query, parseId(id, req.query));

  try {
    await relClass.destroy({ where: parseId(id, req.query) });
    res.status(200).json({
      status: 'success',
      message: `Successfully deleted ${name}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      message: `Couldn't delete ${name}`,
      error
    });
  }
};
