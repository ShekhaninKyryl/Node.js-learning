var {Employee} = require('./employee/Employee');
var {Department} = require('./department/Department');
var {Logger} = require('./logger/Logger');
require('./utilities/associations');

var options = {
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


