const jwt = require('jsonwebtoken');
const Employee = require('../employee/EmployeeService');
const {getDepartments} = require("../department/DepartmentService");

const crypto = require('../../utilities/crypto');
const config = require('../../config');
const secret = config.JWT.SECRET;
const expired = config.JWT.EXPIRES;

/**
 *Return {id, name, email};
 * */
async function validationLoginVerifyingData(verifyingData) {
  let employees = await Employee.getEmployeesAttribValue('email', verifyingData.email);
  if (employees) {
    if (employees.dataValues.password) {
      let hash = crypto.GetHash(verifyingData.password);
      if (employees.dataValues.password === hash) {
        let {id, name, email} = employees.dataValues;
        return {id, name, email};
      }
    }
  }
  throw {
    errors:
      [
        {
          value: verifyingData.email,
          path: 'email',
          message: 'Authorization is wrong!'
        }
      ]
  }
}

/**
 * Return sequelize class
 * */
async function validationRegistrationVerifyingData(verifyingData) {
  let employees = await Employee.getEmployeesAttribValue('email', verifyingData.email);
  if (employees) {
    if (!employees.dataValues.password) {
      if (verifyingData.password) {
        return employees
      }
    }
  }
  throw {
    errors:
      [
        {
          value: verifyingData.email,
          path: 'email',
          message: 'Registration is wrong!'
        }
      ]
  }
}

async function authorizationGetLoginToken(verifyingData) {
  let employeeInfo = await validationLoginVerifyingData(verifyingData);

  let token = await jwt.sign(employeeInfo, secret, {expiresIn: expired});
  return {type: 'token', token};
}

async function authorizationSetPassword(verifyingData) {
  let employee = {};
  try {
    employee = await validationRegistrationVerifyingData(verifyingData);
  } catch (e) {
    let departments = await getDepartments();
    let dep = departments.find(dep => dep.name === verifyingData.department ? dep : false);
    if (dep) {
      let {pay, name, department, email} = {pay: 0, name: 'newUser', department: dep.id, email: verifyingData.email};
      try {
        let newEmployee = await Employee.addEmployee({pay, name, department, email});
      } catch {
        throw e
      }
    }
  }
  employee = await validationRegistrationVerifyingData(verifyingData);
  let hash = crypto.GetHash(verifyingData.password);
  await employee.update({password: hash}, {where: {email: verifyingData.email}});
  let {id, name, email} = employee.dataValues;
  let employeeInfo = {id, name, email};
  let token = await jwt.sign(employeeInfo, secret, {expiresIn: expired});
  return {type: 'token', token};
}

async function getAuthorizedUser(verifyingData, user) {
  if (user) {
    return user
  } else throw {
    errors:
      [
        {
          path: 'name',
          message: 'User not found!'
        }
      ]
  }
}

async function isAuthorizedUser(verifyingData, user) {
  if (user) {
    return true
  } else throw {
    errors:
      [
        {
          path: 'email',
          message: 'Not authorized!'
        }
      ]
  }


}


module.exports = {
  authorizationGetLoginToken,
  authorizationSetPassword,
  getAuthorizedUser,
  isAuthorizedUser
};
