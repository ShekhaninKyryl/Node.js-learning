const {sequelize, Sequelize} = require('../utilities/sequelizeConnector');

/** @namespace Sequelize.STRING */
/** @namespace Sequelize.BOOLEAN */
/** @namespace Sequelize.INTEGER */
const Logger = sequelize.define('log',
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
