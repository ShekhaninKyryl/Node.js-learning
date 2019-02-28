var EmployeeService = require('./EmployeeService');

function addEmployee(employee, cb) {
  EmployeeService.addEmployee(employee, cb);
}

function removeEmployee(employee, cb) {
  EmployeeService.removeEmployee(employee, cb);
}

function removeAllEmployees(employee, cb) {
  EmployeeService.removeAllEmployee(employee, cb);
}

function editEmployee(employee, cb) {
  EmployeeService.editEmployee(employee, cb);
}

function getEmployees(employee, cb) {
  EmployeeService.getEmployees(null, employee, cb);
}

module.exports = {
  addEmployee,
  removeEmployee,
  removeAllEmployees,
  editEmployee,
  getEmployees
};
