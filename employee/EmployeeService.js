var Schema = require('async-validator');
var mysql = require('../utilities/mySqlConnector');

var connect = mysql.connect;
var logEmitter = mysql.logEmitter;

var descriptor = {
  name: {
    type: 'string',
    required: true,
    whitespace: true,
    pattern: /\S[\w _.@-]+\S/,
    range: {min: 1, max: 32}
  },
  pay: {
    type: 'string',
    required: true,
    whitespace: true,
    pattern: /^[1-9][0-9]*$/,
    range: {min: 1, max: 10}
  },
  email: [
    {
      type: 'email',
      required: true,
      whitespace: true,
      pattern: /[a-zA-Z0-9._-]+@[[a-zA-Z0-9._-]+/,
      range: {min: 3, max: 32}
    },
    {
      validator(rule, value, callback, source, options) {
        var errors = [];
        var sql = getSql('SELECT ALL');
        connect.query(sql, function (err, res) {
          for (var i = 0; i < res.length; i++) {
            if (value === res[i].email) {
              errors.push(new Error(`'${value}' duplicate value`));
              break;
            }
          }
          callback(errors);
        });
      }
    }
  ]
};
var validator = new Schema(descriptor);

var tableName = 'employees';
var render = 'employee';

var getSql = function (stringCommand) {
  switch (stringCommand) {
    case 'SELECT': {
      return `SELECT * FROM ${tableName} WHERE department = ?`;
    }
    case 'SELECT ALL': {
      return `SELECT * FROM ${tableName}`;
    }
    case 'INSERT': {
      return `INSERT INTO ${tableName} 
              SET name = ?, pay = ?, email = ?, department = ?`;
    }
    case 'DELETE': {
      return `DELETE FROM ${tableName} WHERE  id = ?`;
    }
    case 'DELETE ALL': {
      return `DELETE FROM ${tableName} WHERE department = ?`;
    }
    case 'UPDATE': {
      return `UPDATE ${tableName} 
              SET name = ?, pay = ?, email = ?
              WHERE id = ?`;
    }
    default:
      break;
  }
};

function addEmployee(employee, cb) {
  var source = Object.assign({}, employee);
  validator.validate(source, function (errors, fields) {
    if (errors) {
      getEmployees(errors, employee, cb);
    } else {
      var sql = getSql('INSERT');
      var queryArray = [
        employee.name,
        employee.pay,
        employee.email,
        employee.department
      ];
      connect.query(sql, queryArray, function (err, res) {
        if (err) {
          err.type = 'sql';
          err = [err];
        } else {
          employee.id = -1;
        }
        logEmitter.emit('log', 'employee', 'add', `employee id - ${res ? res.insertId : 0}`, err);
        getEmployees(err, employee, cb);
      });
    }
  });
}

function removeEmployee(employee, cb) {
  var sql = getSql('DELETE');
  var queryArray = [
    employee.id
  ];
  connect.query(sql, queryArray, function (err, res) {
    if (err) {
      err.type = 'sql';
      err = [err];
    }
    logEmitter.emit('log', 'employee', 'remove', `employee id - ${employee.id}`, err);
    getEmployees(err, employee, cb);
  });
}

function removeAllEmployee(employee, cb) {
  var sql = getSql('DELETE ALL');
  var queryArray = [
    employee.department
  ];
  connect.query(sql, queryArray, function (err, res, fields) {
    if (err) {
      err.type = 'sql';
      err = [err];
      // getEmployees([err], employee, cb);
    } else {
      cb();
    }
    logEmitter.emit('log', 'employee', 'remove All', `department id - ${employee.department}`, err);
  });

}

function editEmployee(employee, cb) {
  var source = Object.assign({}, employee);
  validator.validate(source, function (errors, fields) {
    if (errors) {
      getEmployees(errors, employee, cb);
    } else {
      var sql = getSql('UPDATE');
      var queryArray = [
        employee.name,
        employee.pay,
        employee.email,
        employee.id
      ];
      connect.query(sql, queryArray, function (err, res) {
        if (err) {
          err.type = 'sql';
          err = [err];
        }
        logEmitter.emit('log', 'employee', 'update', `employee id - ${employee.id}`, err);
        getEmployees(err, employee, cb);
      });
    }
  });
}

function getEmployees(error, employee, cb) {
  var sql = getSql('SELECT');
  var queryArray = [
    employee.department
  ];
  connect.query(sql, queryArray, function (err, res) {
    if (err) {
      err.type = 'sql';
      error.push(err);
    }
    var queryRes = [];
    for (var i = 0; i < res.length; i++) {
      queryRes.push(res[i]);
    }
    cb(error, queryRes, employee, render);
  });
}

function renameTableName(newTablename) {
  tableName = newTablename;
}

// todo validator DONE

module.exports = {
  addEmployee,
  removeEmployee,
  removeAllEmployee,
  editEmployee,
  getEmployees,
  renameTableName
};
