var {SEQUELIZE} = require('../config');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
  SEQUELIZE.DATABASE,
  SEQUELIZE.USER,
  SEQUELIZE.PASSWORD,
  {
    host: SEQUELIZE.HOST,
    dialect: SEQUELIZE.DIALECT,
    logging: SEQUELIZE.LOGGING
  }
);


module.exports = {
  sequelize,
  Sequelize
};



