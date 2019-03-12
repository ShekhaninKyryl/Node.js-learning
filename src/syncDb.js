const {Employee} = require('./employee/Employee');
const {Department} = require('./department/Department');
const {Logger} = require('./logger/Logger');
require('./utilities/associations');

const options = {
  alter: true,
  force: false
};

Department.sync(options)
  .then(() => {
    return Employee.sync(options)
  })
  .then(()=>{
    return Logger.sync(options);
  })
  .then(()=>{
    console.log('All table are synchronized!');
    process.exit(0);
  })
  .catch(()=>{
    process.exit(1);
  });


