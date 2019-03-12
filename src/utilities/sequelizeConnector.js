var {SEQUELIZE} = require('../config');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
  SEQUELIZE.DATABASE,
  SEQUELIZE.USER,
  SEQUELIZE.PASSWORD,
  {
    host: SEQUELIZE.HOST,
    dialect: SEQUELIZE.DIALECT,
  }
);


module.exports = {
  sequelize,
  Sequelize
};



