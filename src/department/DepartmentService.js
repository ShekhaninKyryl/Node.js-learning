var {sequelize} = require('../utilities/sequelizeConnector');
var {logEmitter} = require('../logger/LoggerService');
var {Department} = require('./Department');
var render = 'departments';

function addDepartment(department, cb) {
  return Department.create(department)
    .then(res => {
      logEmitter.emit('log', render, 'add', res.dataValues, false);
      cb(null, null, department, render);
    })
    .catch(err => {
      logEmitter.emit('log', render, 'add', err, true);
      cb(err, null, department, render);
    });
}

function removeDepartment(department, cb) {
  var currentDepartment = Department.scope({method: ['employees', department.id]});
  sequelize.transaction(function (transaction) {
    var departmentObject;
    return currentDepartment.find({transaction: transaction})
      .then(dep => {
        departmentObject = dep;
        return departmentObject.destroyEmployees({transaction: transaction});
      })
      .then(() => {
        return departmentObject.destroy({transaction: transaction});
      })
  })
    .then(res => {
      logEmitter.emit('log', render, 'remove', res.dataValues, false);
      cb(null, null, department, render);
    })
    .catch(err => {
      logEmitter.emit('log', render, 'remove', err, true);
      cb(err, null, department, render);
    });
}

function updateDepartment(department, cb) {
  return Department.update(department, {where: {id: department.id}})
    .then(res => {
      logEmitter.emit('log', render, 'update', department, false);
      cb(null, null, department, render);
    })
    .catch(err => {
      logEmitter.emit('log', render, 'update', err, true);
      cb(err, null, department, render);
    });
}

function getDepartments(error, department, cb) {
  return sequelize.query(
    `SELECT departments.id, departments.name, IFNULL(AVG(employees.pay),0) as averagePayment, COUNT(employees.id) as employeeCount  from departments
     LEFT JOIN employees on departments.id = employees.department
     GROUP BY departments.id`,
    {
      type: sequelize.QueryTypes.SELECT,
    })
    .then(res => {
      cb(null, res, department, render);
    })
    .catch(err => {
      err = [err];
      cb(err, null, department, render);
    });
}

module.exports = {
  addDepartment,
  removeDepartment,
  updateDepartment,
  getDepartments,
};
