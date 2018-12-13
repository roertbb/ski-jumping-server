const { flatten } = require('../flatten');
const { parseId, parseCreate } = require('../parse');

exports.create = async (req, res, relationData) => {
  const { class: secClass, id: secId } = relationData.secondaryRelation;
  const { class: primClass, id: primId } = relationData.mainRelation;
  const { id, name } = relationData;

  try {
    const main = await primClass.create(
      parseCreate(req.body, relationData, primId)
    );

    const secondary = await secClass.create(
      parseCreate(req.body, relationData, secId, {
        [id]: main.dataValues[id]
      })
    );

    const result = await secClass.find({
      where: parseId(id, main.dataValues),
      include: {
        model: primClass,
        nested: false,
        required: true
      },
      raw: true
    });

    res.status(200).json({
      status: 'success',
      message: `${name} created`,
      created: flatten(result)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      message: `Couldn't create ${name}`,
      error
    });
  }
};
