const { flatten } = require('../flatten');
const { parseId, parseCreate } = require('../parse');

exports.update = async (req, res, relationData) => {
  const { class: secClass, id: secId } = relationData.secondaryRelation;
  const { class: primClass, id: primId } = relationData.mainRelation;
  const { id, name } = relationData;

  try {
    await primClass.update(parseCreate(req.body, relationData, primId), {
      where: parseId(id, req.body)
    });

    await secClass.update(parseCreate(req.body, relationData, secId), {
      where: parseId(id, req.body)
    });

    const updated = await secClass.find({
      where: parseId(id, req.body),
      include: {
        model: primClass,
        where: parseId(id, req.body),
        nested: false,
        required: true
      },
      raw: true
    });

    res.status(201).json({
      status: 'success',
      message: `Successfully updated ${name}`,
      updated: flatten(updated)
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
