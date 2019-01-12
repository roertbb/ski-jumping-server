const {
  models: { Team, Result }
} = require('../db');

exports.getResults = async (req, res) => {
  const { competition_id } = req.query;

  try {
    const result = await Result.findAll({
      where: { competition_id: competition_id },
      raw: true
    });

    const teams = await Team.findAll({ raw: true });
    const parsedTeams = teams.reduce((prev, cur) => {
      prev[cur.team_id] = cur.team;
      return prev;
    }, {});

    const teamsWithNames = result.map(t => {
      t.team = parsedTeams[t.team_id];
      return t;
    });

    res.status(200).json({
      status: 'success',
      results: teamsWithNames
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      error
    });
  }
};
