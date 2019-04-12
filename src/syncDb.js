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
const sync = async (options) => {
  try {
    let res = await sequelize.sync(options);
    await console.error('Synchronize table: Resolve.');
    process.exit(0);
  } catch (err) {
    console.error('Synchronize table: Reject.', err);
    process.exit(1);
  }
};

sync(options);


