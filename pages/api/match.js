import getEloRating from '../../utils/getEloloRating';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './mauricio.db',
});

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const Country = sequelize.define('Country', {
  name: Sequelize.STRING,
  flag: Sequelize.STRING,
  elo: Sequelize.NUMBER,
});

test();

export default async function handler(req, res) {
  try {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'POST') {
      const { winnerId, looserId } = req.body;
      const winner = await Country.findOne({
        where: { id: winnerId },
      });
      const looser = await Country.findOne({
        where: { id: looserId },
      });
      const winnerEloBefore = winner.dataValues.elo;
      const LooserEloBefore = looser.dataValues.elo;
      const [winnerEloAfter, looserEloAfter] = getEloRating({
        winner: winnerEloBefore,
        looser: LooserEloBefore,
      });
      await Country.update(
        { elo: winnerEloAfter },
        { where: { id: winnerId } }
      );
      await Country.update(
        { elo: looserEloAfter },
        { where: { id: looserId } }
      );
      res.status(200).send('success');
    }
    if (req.method === 'GET') {
      const matchCountries = await Country.findAll({
        order: sequelize.random(),
        limit: 2,
      });
      res.send(matchCountries);
    }
  } catch (error) {
    console.log(error);
  }
}
