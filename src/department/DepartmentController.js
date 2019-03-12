const DepartmentService = require('./DepartmentService');

function addDepartment(department, cb) {
  DepartmentService.addDepartment(department, cb);
}

function removeDepartment(department, cb) {
  DepartmentService.removeDepartment(department,cb);
}

function updateDepartment(department, cb) {
  DepartmentService.updateDepartment(department, cb);
}

function getDepartments(department, cb) {
  DepartmentService.getDepartments(null, department, cb);
}

module.exports = {
  addDepartment,
  removeDepartment,
  updateDepartment,
  getDepartments
};
