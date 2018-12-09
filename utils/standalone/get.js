const { parseSearch2 } = require('../parse');

exports.get = async (req, res, relationData) => {
  const { class: relClass, id: relId } = relationData.relation;

  try {
    const result = await relClass.findAll({
      where: parseSearch2(req.query, relationData, relId),
      raw: true
    });

    res.status(200).json({
      status: 'success',
      results: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      error
    });
  }
};
