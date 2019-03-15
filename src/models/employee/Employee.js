const {sequelize, Sequelize} = require('../../utilities/sequelizeConnector');

const Employee = sequelize.define('employee',
  {
    id: {type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    name: {
      type: Sequelize.STRING,
      validate: {
        is: {
          args: /^[a-zA-Z0-9_.@-]+$/i,
          msg: 'Name must be not empty, without whitespace!'
        }
      }
    },
    pay: {
      type: Sequelize.INTEGER,
      validate: {
        isDecimal: {
          args: true,
          msg: 'Payment must be decimal value great 0!'
        },
        min: {
          args: [0],
          msg: 'Payment must be decimal value great 0!'
        },
        max: {
          args: [1000000000],
          msg: 'Payment must be decimal value lower one billion!'
        },

      }
    },
    email: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: 'Email must be unique!'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email must be email format!'
        }
      }
    },
    password: {
      type: Sequelize.STRING,
    }
  }, {
    tableName: 'employees',
  });

module.exports = {
  Employee
};
