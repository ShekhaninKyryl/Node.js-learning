const EmployeeService = require('./EmployeeService');

async function addEmployee(employee) {
  return await EmployeeService.addEmployee(employee);
}

async function removeEmployee(employee) {
  return await EmployeeService.removeEmployee(employee);
}

async function updateEmployee(employee) {
  return await EmployeeService.updateEmployee(employee);
}

async function getEmployees(employee) {
  return await EmployeeService.getEmployees(employee);
}

module.exports = {
  addEmployee,
  removeEmployee,
  updateEmployee,
  getEmployees
};
