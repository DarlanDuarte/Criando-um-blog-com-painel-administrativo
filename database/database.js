const Sequelize = require('sequelize');

const sequelize = new Sequelize('guiapress', 'root', 'cada362514', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00',
});

module.exports = sequelize;
