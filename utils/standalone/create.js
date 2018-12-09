const { parseCreate } = require('../parse');

exports.create = async (req, res, relationData) => {
  const { class: relClass, id: relId } = relationData.relation;
  const { id, name } = relationData;

  try {
    const main = await relClass.create(
      parseCreate(req.body, relationData, relId)
    );

    const result = await relClass.find({
      where: { [id]: main.dataValues[id] },
      raw: true
    });

    res.status(200).json({
      status: 'success',
      message: `${name} created`,
      created: result
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
