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
  let emp = await Employee.find({where: {id: employee.id}});
  let {id, name, pay, email, department} = emp.dataValues;
  return {id, name, pay, email, department};
}

async function getEmployees(employee) {
  let employees;
  if (employee.department === '*') {
    employees = await Employee.findAll();
  } else {
    employees = await Employee.findAll({where: {department: employee.department}});
  }
  employees = employees.map(value => {
    let {id, name, pay, email, department} = value.dataValues;
    return {id, name, pay, email, department}
  });
  return employees;
}

async function getEmployeesAttribValue(attribute, value) {
  let whereOption = {};
  whereOption[attribute] = value;
  return await Employee.find({where: whereOption});
}

module.exports = {
  addEmployee,
  removeEmployee,
  updateEmployee,
  getEmployees,
  getEmployeesAttribValue
};
