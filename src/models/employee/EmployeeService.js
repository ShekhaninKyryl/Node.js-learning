const {getDepartments} = require("../department/DepartmentService");
const {Employee} = require('./Employee');

async function addEmployee(employee) {
  let newEmployee = await Employee.create(employee);
  let {id, name, pay, email, department} = {...newEmployee.dataValues};
  return {id, name, pay, email, department};
}

async function removeEmployee(employee) {
  let emp = await Employee.destroy({where: {id: employee.id}});
  if (emp) {
    let {id, name, pay, email, department} = employee;
    return {id, name, pay, email, department};
  } else {
    throw {
      errors: [{
        value: employee.department,
        message: 'Employee not found!',
        path: 'department',
      }],
    };
  }
}

async function updateEmployee(employee) {
  try {
    await Employee.update(employee, {where: {id: employee.id}});
    let emp = await Employee.find({where: {id: employee.id}});
    let {id, name, pay, email, department} = emp.dataValues;
    return {id, name, pay, email, department};
  } catch (e) {
    throw {
      errors: [{
        value: employee.id,
        message: 'Cannot update employee',
        path: 'id',
      }],
    };
  }
}

async function wrappedGetEmployees(employee) {
  let dep = await getDepartments();
  if (dep.find((element) => element.id.toString() === employee.department)) {
    return await getEmployees(employee);
  } else {
    throw {
      errors: [{
        value: employee.department,
        message: 'Department not found!',
        path: 'department',
      }],
    };
  }
}


async function getEmployees(employee) {
  let departmentId = employee.department;
  let employees;
  if (departmentId === '*') {
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
  let where = {};
  where[attribute] = value;
  return await Employee.find({where: where});
}


module.exports = {
  addEmployee,
  removeEmployee,
  updateEmployee,
  wrappedGetEmployees,
  getEmployees,
  getEmployeesAttribValue
};
