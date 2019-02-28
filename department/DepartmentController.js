// var Department = require('./Department');
var DepartmentService = require('./DepartmentService');
var EmployeeController = require('../employee/EmployeeController');

function addDepartment(department, cb) {
  DepartmentService.addDepartment(department, cb);
}

function removeDepartment(department, cb) {
  var departmentRemove = DepartmentService.removeDepartment.bind(this, department, cb);
  EmployeeController.removeAllEmployees({department: department.id}, departmentRemove);
}

function updateDepartment(department, cb) {
  DepartmentService.updateDepartment(department, cb);
}

function showEmployees(department, cb) {
  EmployeeController.getEmployees(department, cb);
}

function getDepartments(department, cb) {
  DepartmentService.getDepartments(null, department, cb);
}

module.exports = {
  addDepartment,
  removeDepartment,
  updateDepartment,
  showEmployees,
  getDepartments
};
