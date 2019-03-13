const DepartmentService = require('./DepartmentService');

async function addDepartment(department) {
  return await DepartmentService.addDepartment(department);
}

async function removeDepartment(department) {
  return await DepartmentService.removeDepartment(department);
}

async function updateDepartment(department) {
  return await DepartmentService.updateDepartment(department);
}

async function getDepartments() {
  return await DepartmentService.getDepartments();
}

module.exports = {
  addDepartment,
  removeDepartment,
  updateDepartment,
  getDepartments
};
