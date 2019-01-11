const fs = require('fs');
const { sequelize } = require('../db');

const Team = require('../models/Team');
const Person = require('../models/Person');
const SkiJumper = require('../models/SkiJumper');
const SkiJumpingHill = require('../models/SkiJumpingHill');
const Competition = require('../models/Competition');
const IndividualCompetition = require('../models/IndividualCompetition');
const TeamCompetition = require('../models/TeamCompetition');
const Tournament = require('../models/Tournament');

const {
  files,
  triggerNames,
  procedureNames,
  functionNames
} = require('../triggers');

module.exports = async () => {
  const filesContent = await Promise.all(
    files.map(trigger => {
      return fs.readFileSync(`./triggers/${trigger}`, 'utf8');
    })
  );
  // drop procedure
  for (const procedure of procedureNames) {
    await sequelize.query(`DROP PROCEDURE IF EXISTS ${procedure};`);
  }
  // drop functions
  for (const func of functionNames) {
    await sequelize.query(`DROP FUNCTION IF EXISTS ${func};`);
  }
  // drop trigger
  for (const trigger of triggerNames) {
    await sequelize.query(`DROP TRIGGER IF EXISTS ${trigger};`);
  }
  // create triggers
  for (const file of filesContent) {
    await sequelize.query(file);
  }
  // workaround for composite foreign key constraint :(
  await sequelize.query(
    'ALTER TABLE `series-results` ADD CONSTRAINT referencingPlacement FOREIGN KEY(person_id,competition_id) REFERENCES placements(person_id,competition_id);'
  );

  // tables for calculating points in solo/team competitions
  const team_points = [400, 350, 300, 250, 200, 150, 100, 50];
  await sequelize.query(`DROP TABLE IF EXISTS team_points;`);
  await sequelize.query(
    `CREATE TABLE team_points ( place INTEGER PRIMARY KEY, points INTEGER);`
  );
  team_points.forEach(async (pts, index) => {
    await sequelize.query(
      `INSERT INTO team_points(place, points) VALUES (${index + 1},${pts});`
    );
  });

  await sequelize.query(`DROP TABLE IF EXISTS individual_points;`);
  await sequelize.query(
    `CREATE TABLE individual_points ( place INTEGER PRIMARY KEY, points INTEGER);`
  );
  const individual_points = [
    100,
    80,
    60,
    50,
    45,
    40,
    36,
    32,
    29,
    26,
    24,
    22,
    20,
    18,
    16
  ];

  individual_points.forEach(async (pts, index) => {
    await sequelize.query(
      `INSERT INTO individual_points(place, points) VALUES (${index +
        1},${pts});`
    );
  });

  // initial migration
  // team
  await Team.create({
    team: 'Poland'
  });
  await Team.create({
    team: 'Japan'
  });
  await Team.create({
    team: 'Deutschland'
  });
  await Team.create({
    team: 'Austria'
  });
  await Team.create({
    team: 'Norway'
  });

  // ski jumpers
  await Person.create({
    first_name: 'Kamil',
    surname: 'Stoch',
    birth_date: '1987-05-25',
    team_id: 1
  });
  await SkiJumper.create({
    person_id: 1,
    fis_id: 4321,
    active: 'y',
    height: 173,
    weight: 55
  });

  await Person.create({
    first_name: 'Dawid',
    surname: 'Kubacki',
    birth_date: '1990-03-12',
    team_id: 1
  });
  await SkiJumper.create({
    person_id: 2,
    fis_id: 5142,
    active: 'y',
    height: 180,
    weight: 64
  });

  await Person.create({
    first_name: 'Piotr',
    surname: 'Zyla',
    birth_date: '1987-01-16',
    team_id: 1
  });
  await SkiJumper.create({
    person_id: 3,
    fis_id: 4325,
    active: 'y',
    height: 176,
    weight: 59
  });

  await Person.create({
    first_name: 'Stefan',
    surname: 'Kraft',
    birth_date: '1993-05-13',
    team_id: 4
  });
  await SkiJumper.create({
    person_id: 4,
    fis_id: 5497,
    active: 'y',
    height: 170,
    weight: 56
  });

  await Person.create({
    first_name: 'Johann Andre',
    surname: 'Forfang',
    birth_date: '1995-07-04',
    team_id: 5
  });
  await SkiJumper.create({
    person_id: 5,
    fis_id: 6100,
    active: 'y',
    height: 176,
    weight: 60
  });

  await Person.create({
    first_name: 'Markus',
    surname: 'Eisenbichler',
    birth_date: '1991-04-03',
    team_id: 3
  });
  await SkiJumper.create({
    person_id: 6,
    fis_id: 5253,
    active: 'y',
    height: 175,
    weight: 57
  });

  await Person.create({
    first_name: 'Robert',
    surname: 'Johansson',
    birth_date: '1990-03-23',
    team_id: 5
  });
  await SkiJumper.create({
    person_id: 7,
    fis_id: 5589,
    active: 'y',
    height: 182,
    weight: 63
  });

  await Person.create({
    first_name: 'Ryoyu',
    surname: 'Kobayashi',
    birth_date: '1996-11-08',
    team_id: 2
  });
  await SkiJumper.create({
    person_id: 8,
    fis_id: 6288,
    active: 'y',
    height: 174,
    weight: 60
  });

  // ski jumping hills
  await SkiJumpingHill.create({
    name: 'Wisla (Malinka)',
    country: 'Poland',
    city: 'Wisla',
    type: 'l',
    size: 134,
    k_point: 120
  });
  await SkiJumpingHill.create({
    name: 'Wielka Krokiew',
    country: 'Poland',
    city: 'Zakopane',
    type: 'l',
    size: 140,
    k_point: 125
  });
  await SkiJumpingHill.create({
    name: 'Schattenbergschanze',
    country: 'Deutschland',
    city: 'Oberstdorf',
    type: 'l',
    size: 137,
    k_point: 120
  });
  await SkiJumpingHill.create({
    name: 'Große Olympiaschanze	',
    country: 'Deutschland',
    city: 'Garmisch−Partenkirchen',
    type: 'l',
    size: 142,
    k_point: 125
  });
  await SkiJumpingHill.create({
    name: 'Bergisel',
    country: 'Austria',
    city: 'Innsbruck',
    type: 'l',
    size: 130,
    k_point: 120
  });
  await SkiJumpingHill.create({
    name: 'Paul-Ausserleitner-Schanze',
    country: 'Austria',
    city: 'Bischofshofen',
    type: 'l',
    size: 142,
    k_point: 125
  });

  //tournament
  await Tournament.create({
    name: 'Four Hills Tournament',
    edition: 67
  });

  // competitions
  await Competition.create({
    competition_date: '2018-12-31',
    ski_jumping_hill_id: 4,
    tournament_id: 1,
    start_gate: 10
  });
  await IndividualCompetition.create({
    competition_id: 1,
    qualification_date: '2018-12-31'
  });
  await Competition.create({
    competition_date: '2019-01-03',
    ski_jumping_hill_id: 5,
    tournament_id: 1,
    start_gate: 12
  });
  await IndividualCompetition.create({
    competition_id: 2,
    qualification_date: '2019-01-03'
  });
  await Competition.create({
    competition_date: '2018-01-05',
    ski_jumping_hill_id: 6,
    tournament_id: 1,
    start_gate: 14
  });
  await IndividualCompetition.create({
    competition_id: 3,
    qualification_date: '2018-01-05'
  });
  await Competition.create({
    competition_date: '2018-01-06',
    ski_jumping_hill_id: 3,
    tournament_id: 1,
    start_gate: 9
  });
  await IndividualCompetition.create({
    competition_id: 4,
    qualification_date: '2018-01-06'
  });
  await Competition.create({
    competition_date: '2018-01-05',
    ski_jumping_hill_id: 6,
    start_gate: 14
  });
  await TeamCompetition.create({
    competition_id: 5
  });
  await Competition.create({
    competition_date: '2018-01-06',
    ski_jumping_hill_id: 3,
    start_gate: 9
  });
  await TeamCompetition.create({
    competition_id: 6
  });
};
