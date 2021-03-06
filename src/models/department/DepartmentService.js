const {sequelize} = require('../../utilities/sequelizeConnector');
const {Department} = require('./Department');

async function addDepartment(department) {
  let newDepartment = await Department.create(department);
  let {id, name} = {...newDepartment.dataValues};
  return {id, name, averagePayment: '0.0000', employeeCount: 0};
}

async function removeDepartment(department) {
  const currentDepartment = Department.scope({method: ['employees', department.id]});
  let transaction;
  try {
    transaction = await sequelize.transaction();

    let departmentObject = await currentDepartment.find({transaction: transaction});
    if (!departmentObject) {
      throw {
        errors:
          [
            {
              value: department.name,
              path: 'name',
              message: 'Department not found!'
            },
          ]
      }
    } else {
      await departmentObject.destroyEmployees({transaction: transaction});
      await departmentObject.destroy({transaction: transaction});

      await transaction.commit();
      let {id, name} = department;
      return {id, name};
    }
  } catch (e) {
    await transaction.rollback();
    throw e
  }

}

async function updateDepartment(department) {
  await Department.update(department, {where: {id: department.id}});
  let dep = await Department.find({where: {id: department.id}});
  let {id, name} = dep.dataValues;
  return {id, name};
}

async function getDepartments() {
  return await sequelize.query(
      `SELECT departments.id,
              departments.name,
              IFNULL(AVG(employees.pay), 0) as averagePayment,
              COUNT(employees.id)           as employeeCount
       from departments
              LEFT JOIN employees on departments.id = employees.department
       GROUP BY departments.id`,
    {
      type: sequelize.QueryTypes.SELECT,
    });

}

module.exports = {
  addDepartment,
  removeDepartment,
  updateDepartment,
  getDepartments,
};
