const {Employee} = require('./models/employee/Employee');
const {Department} = require('./models/department/Department');
const {Logger} = require('./models/logger/Logger');
const {SEQUELIZE} = require('./config');
require('./utilities/associations');
const {sequelize} = require('./utilities/sequelizeConnector');
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


