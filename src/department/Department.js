const {sequelize, Sequelize} = require('../utilities/sequelizeConnector');

const {Employee} = require('../employee/Employee');

const Department = sequelize.define('department',
  {
    id: {type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    name: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: 'Department name must be unique!'
      },
      validate: {
        is: {
          args: /^[a-zA-Z0-9_.@-]+$/i,
          msg: 'Department name must be not empty, without whitespace!'
        },
      }
    }
  }, {
    scopes: {
      employees: function (departmentId) {
        return {where: {id: departmentId}}
      }
    },
    tableName:
      'departments',
  });

Department.prototype.destroyEmployees = function (options) {
  return Employee.destroy({where: {department: this.id}, ...options});
};

module.exports = {
  Department
};
