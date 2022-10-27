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
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  try {
    const countries = await Country.findAll({ order: [['elo', 'DESC']] });
    res.json(countries);
  } catch (error) {
    console.log(error);
    res.end('no anda');
  }
}
