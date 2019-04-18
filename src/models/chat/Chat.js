const {sequelize, Sequelize} = require('../../utilities/sequelizeConnector');

const Chat = sequelize.define('chat',
  {
    id: {type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    room: {
      type: Sequelize.STRING
    },
    sender: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.STRING
    }
  }, {
    tableName: 'chat',
  });

module.exports = {
  Chat
};
