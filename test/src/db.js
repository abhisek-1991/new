const Sequelize = require('sequelize');

const sequelize = new Sequelize('candy_shop', 'root', 'Aksingh@1993', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
