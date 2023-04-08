const Sequelize = require('sequelize');

const sequelize = new Sequelize('guiapress', 'root', 'cada362514', {
   host: 'localhost',
   dialect: 'mysql',
});

module.exports = sequelize;
