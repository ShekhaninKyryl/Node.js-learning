const {Employee} = require('./Employee');

async function addEmployee(employee) {
  let newEmployee = await Employee.create(employee);
  let {id, name, pay, email, department} = {...newEmployee.dataValues};
  return {id, name, pay, email, department};
}

async function removeEmployee(employee) {
  await Employee.destroy({where: {id: employee.id}});
  let {id, name, pay, email, department} = employee;
  return {id, name, pay, email, department};
}

async function updateEmployee(employee) {
  await Employee.update(employee, {where: {id: employee.id}});
  let {id, name, pay, email, department} = employee;
  return {id, name, pay, email, department};

}

async function getEmployees(employee) {
  return await Employee.findAll({where: {department: employee.department}});
}

module.exports = {
  addEmployee,
  removeEmployee,
  updateEmployee,
  getEmployees,
};
