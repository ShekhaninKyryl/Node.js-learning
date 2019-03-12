const {logEmitter} = require('../logger/LoggerService');
const {Employee} = require('./Employee');
const render = 'employee';

function addEmployee(employee, cb) {

  Employee.create(employee)
    .then(res => {
      logEmitter.emit('log', render, 'add', res.dataValues, false);
      cb(null, null, employee, render);
    })
    .catch(err => {
      logEmitter.emit('log', render, 'add', err, true);
      cb(err, null, employee, render);
    });
}

function removeEmployee(employee, cb) {

  Employee.destroy({where: {id: employee.id}})
    .then(() => {
      logEmitter.emit('log', render, 'remove', employee, false);
      cb(null, null, employee, render);
    })
    .catch(err => {
      logEmitter.emit('log', render, 'remove', err, true);
      cb(err, null, employee, render);
    });
}

function updateEmployee(employee, cb) {
  return Employee.update(employee, {where: {id: employee.id}})
    .then(() => {
      logEmitter.emit('log', render, 'update', employee, false);
      cb(null, null, employee, render);
    })
    .catch(err => {
      logEmitter.emit('log', render, 'update', err, true);
      cb(err, null, employee, render);
    });

}

function getEmployees(error, employee, cb) {
  Employee.findAll({where: {department: employee.department}})
    .then(res => {
      const resArray = res.map(obj => {
        return obj.dataValues
      });
      cb(error, resArray, employee, render);
    })
    .catch(err => {
      err = [err];
      cb(err, null, employee, render);
    });

}

module.exports = {
  addEmployee,
  removeEmployee,
  updateEmployee,
  getEmployees,
};
