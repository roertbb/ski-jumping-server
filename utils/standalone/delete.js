exports.del = async (req, res, relationData) => {
  const { class: relClass } = relationData.relation;
  const { id, name } = relationData;

  try {
    // await secClass.destroy({ where: { [id]: req.params[id] } });
    await relClass.destroy({ where: { [id]: req.params[id] } });
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