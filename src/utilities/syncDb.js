const {SEQUELIZE} = require('../config');

const {Employee} = require('../models/employee/Employee');
const {Department} = require('../models/department/Department');
const {Logger} = require('../models/logger/Logger');
const {Chat} = require('../models/chat/Chat');
const {sequelize} = require('./sequelizeConnector');

require('./associations');
require('regenerator-runtime/runtime');

const options = {
  alter: true,
  force: SEQUELIZE.FORCE,
};
let sync = async (options) => {
  let res = await sequelize.sync(options);
};

sync = sync.bind(this, options);
module.exports = {
  sync
};


