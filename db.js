const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  }
);

exports.sequelize = sequelize;

const Team = require('./models/Team');
const Person = require('./models/Person');
const SkiJumper = require('./models/SkiJumper');
const SkiJumpingHill = require('./models/SkiJumpingHill');
const Competition = require('./models/Competition');
const IndividualCompetition = require('./models/IndividualCompetition');
const TeamCompetition = require('./models/TeamCompetition');

const { files, triggerNames, procedureNames } = require('./triggers');
const fs = require('fs');

exports.connectToDb = () => {
  sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => sequelize.sync({ force: true }))
    .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .then(async () => {
      const filesContent = await Promise.all(
        files.map(trigger => {
          return fs.readFileSync(`./triggers/${trigger}`, 'utf8');
        })
      );
      // drop procedure
      for (const procedure of procedureNames) {
        await sequelize.query(`DROP PROCEDURE IF EXISTS ${procedure};`);
      }
      // drop trigger
      for (const trigger of triggerNames) {
        await sequelize.query(`DROP TRIGGER IF EXISTS ${trigger};`);
      }
      // create triggers
      for (const file of filesContent) {
        await sequelize.query(file);
      }
    })
    .then(async () => {
      // workaround for composite foreign key constraint :(
      await sequelize.query(
        'ALTER TABLE `series-results` ADD CONSTRAINT referencingPlacement FOREIGN KEY(person_id,competition_id) REFERENCES placements(person_id,competition_id);'
      );
    })
    .then(async () => {
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
    })
    .then(async () => {
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
    })
    .then(async () => {
      await Team.create({
        team: 'Polska'
      });
      await Team.create({
        team: 'Kostaryka'
      });
      await Person.create({
        first_name: 'Kamil',
        surname: 'Stoch',
        birth_date: '2018-01-01',
        team_id: 1
      });
      await SkiJumper.create({
        person_id: 1,
        fis_id: 1,
        active: 'y',
        height: 123,
        weight: 23
      });
      await Person.create({
        first_name: 'qwe',
        surname: 'qwe',
        birth_date: '2018-01-02',
        team_id: 2
      });
      await SkiJumper.create({
        person_id: 2,
        fis_id: 123,
        active: 'n',
        height: 234,
        weight: 23
      });
      await SkiJumpingHill.create({
        name: 'test hill',
        country: 'test',
        city: 'test',
        type: 's',
        size: 123,
        k_point: 123
      });
      await SkiJumpingHill.create({
        name: 'test hill2',
        country: 'test2',
        city: 'test2',
        type: 's',
        size: 234,
        k_point: 234
      });
      await Competition.create({
        competition_id: 1,
        competition_date: '2018-01-01',
        ski_jumping_hill_id: 1,
        start_gate: 1
      });
      await Competition.create({
        competition_id: 2,
        competition_date: '2018-01-02',
        ski_jumping_hill_id: 2,
        start_gate: 2
      });
      await IndividualCompetition.create({
        competition_id: 1,
        qualification_date: '2018-01-01'
      });
      await TeamCompetition.create({
        competition_id: 2
      });
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
};
