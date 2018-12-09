const { flatten } = require('../flatten');
const { parseSearch2 } = require('../parse');

exports.get = async (req, res, relationData) => {
  const { class: secClass, id: secId } = relationData.secondaryRelation;
  const { class: primClass, id: primId } = relationData.mainRelation;

  try {
    const result = await secClass.findAll({
      where: parseSearch2(req.query, relationData, secId),
      include: {
        model: primClass,
        where: parseSearch2(req.query, relationData, primId),
        nested: false,
        required: true
      },
      raw: true
    });

    res.status(200).json({
      status: 'success',
      results: result.map(res => flatten(res))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      error
    });
  }
};
