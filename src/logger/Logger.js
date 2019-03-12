var {sequelize, Sequelize} = require('../utilities/sequelizeConnector');

var Logger = sequelize.define('log',
  {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    instance: {
      type: Sequelize.STRING
    },
    action: {
      type: Sequelize.STRING
    },
    eventMessage: {
      type: Sequelize.STRING
    },
    error: {
      type: Sequelize.BOOLEAN
    }
  }, {
    tableName: 'log',
    updatedAt: false
  });


module.exports = {
  Logger
};
