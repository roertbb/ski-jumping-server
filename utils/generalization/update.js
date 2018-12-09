const { flatten } = require('../flatten');
const { parseCreate } = require('../parse');

exports.update = async (req, res, relationData) => {
  const { class: secClass, id: secId } = relationData.secondaryRelation;
  const { class: primClass, id: primId } = relationData.mainRelation;
  const { id, name } = relationData;

  try {
    await primClass.update(parseCreate(req.body, relationData, primId), {
      where: {
        [id]: req.body[id]
      }
    });

    await secClass.update(parseCreate(req.body, relationData, secId), {
      where: {
        [id]: req.body[id]
      }
    });

    const updated = await secClass.find({
      where: { [id]: req.body[id] },
      include: {
        model: primClass,
        where: { [id]: req.body[id] },
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
