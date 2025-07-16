const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cartdb', 'root', 'Akash@36091115', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
