const jwt = require('jsonwebtoken');
const Employee = require('../employee/EmployeeService');

const crypto = require('../../utilities/crypto');
const config = require('../../config');
const secret = config.JWT.SECRET;
const expires = config.JWT.EXPIRES;

//todo validation DONE

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

  let token = await jwt.sign(employeeInfo, secret, {expiresIn: expires});
  return {type: 'token', token};
}

async function authorizationSetPassword(verifyingData) {
  let employees = await validationRegistrationVerifyingData(verifyingData);

  let hash = crypto.GetHash(verifyingData.password);
  await employees.update({password: hash}, {where: {email: verifyingData.email}});
  let {id, name, email} = employees.dataValues;
  let employeeInfo = {id, name, email};
  let token = await jwt.sign(employeeInfo, secret, {expiresIn: expires});
  return {type: 'token', token};
}


module.exports = {
  authorizationGetLoginToken,
  authorizationSetPassword
};
