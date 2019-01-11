const relationsToNames = {
  'ski-jumpers': 'Ski Jumper',
  coaches: 'Coach',
  teams: 'Team',
  'ski-jumping-hills': 'Ski Jumping Hill',
  tournaments: 'Tournament',
  'individual-competitions': 'Individual Competition',
  'team-competitions': 'Team Competition',
  placements: 'Placement',
  competitions: 'Competition',
  people: 'Person',
  results: 'Team Result',
  'series-results': 'Series Result'
};

module.exports = (error, relationName) => {
  console.log(error);

  const { errno, sqlState, sqlMessage } = error.original;
  console.log(errno, sqlState, sqlMessage);

  let msg = '';
  switch (errno) {
    case 1451:
      const secondRelation = /\.\`([A-Za-z]+)\`\,/.exec(sqlMessage)[1];
      const deletedRelation = /REFERENCES \`([A-Za-z\-]+)\`/.exec(
        sqlMessage
      )[1];
      msg = `${
        relationsToNames[deletedRelation]
      } is already connected with certain ${relationsToNames[secondRelation]}`;
  }

  return {
    status: 'failure',
    message: `Couldn't delete ${relationName}`,
    errorMessage: msg
  };
};
