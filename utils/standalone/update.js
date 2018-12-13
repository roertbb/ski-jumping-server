const { parseId, parseCreate } = require('../parse');

exports.update = async (req, res, relationData) => {
  const { class: relClass, id: relId } = relationData.relation;
  const { id, name } = relationData;

  try {
    await relClass.update(parseCreate(req.body, relationData, relId), {
      where: parseId(id, req.body)
    });

    const updated = await relClass.find({
      where: parseId(id, req.body),
      raw: true
    });

    res.status(201).json({
      status: 'success',
      message: `Successfully updated ${name}`,
      updated: updated
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      message: `Couldn't update ${name}`,
      error
    });
  }
};
