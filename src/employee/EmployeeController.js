var EmployeeService = require('./EmployeeService');

function addEmployee(employee, cb) {
  EmployeeService.addEmployee(employee, cb);
}

function removeEmployee(employee, cb) {
  EmployeeService.removeEmployee(employee, cb);
}

function updateEmployee(employee, cb) {
  EmployeeService.updateEmployee(employee, cb);
}

function getEmployees(employee, cb) {
  EmployeeService.getEmployees(null, employee, cb);
}

module.exports = {
  addEmployee,
  removeEmployee,
  updateEmployee,
  getEmployees
};
