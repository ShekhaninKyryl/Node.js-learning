const {Employee} = require('./models/employee/Employee');
const {Department} = require('./models/department/Department');
const {Logger} = require('./models/logger/Logger');
require('./utilities/associations');

const {sequelize} = require('./utilities/sequelizeConnector');

const options = {
    alter: true,
    force: false
};

sequelize.sync(options)
    .then(() => {
        console.log('All table are synchronized!');
        process.exit(0);
    })
    .catch((err) => {
        throw err;
        process.exit(1);

    });


