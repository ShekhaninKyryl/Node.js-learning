var Schema = require('async-validator');
var mysql = require('../utilities/mySqlConnector');


var connect = mysql.connect;
var logEmitter = mysql.logEmitter;

var descriptor = {
  name: [
    {
      type: "string",
      required: true,
      whitespace: true,
      pattern: /\S[\w _.@-]+\S/,
      range: {min: 1, max: 32},
    },
    {
      validator(rule, value, callback, source, options) {
        var errors = [];
        var sql = getSql('SELECT');
        connect.query(sql, function (err, res) {
          for (var i = 0; i < res.length; i++) {
            if (value === res[i].name) {
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

var tableName = 'departments';
var render = 'departments';

var getSql = function (stringCommand) {
  switch (stringCommand) {
    case 'INSERT': {
      return `INSERT INTO ${tableName} SET name = ?`;
    }
    case 'DELETE': {
      return `DELETE FROM ${tableName} WHERE  id = ?`;
    }
    case 'SELECT': {
      return `SELECT * FROM ${tableName}`;
    }
    case 'UPDATE': {
      return `UPDATE ${tableName} 
              SET name = ?
              WHERE id = ?`;
    }
    default:
      break;
  }
};

function addDepartment(department, cb) {
  var source = Object.assign({}, department);
  validator.validate(source, function (errors, fields) {
    if (errors) {
      getDepartments(errors, department, cb);
    } else {
      var sql = getSql('INSERT');
      var queryArray = [
        department.name
      ];
      connect.query(sql, queryArray, function (err, res) {
        if (err) {
          err.type = 'sql';
        } else {
          department.id = -1;
        }
        logEmitter.emit('log', 'department', 'add', `department id - ${res ? res.insertId : 0}`, err);
        getDepartments(err, department, cb);
      });
    }
  });
}

function removeDepartment(department, cb) {
  var sql = getSql('DELETE');
  var queryArray = [
    department.id,
  ];
  connect.query(sql, queryArray, function (err, res) {
    if (err) {
      err.type = 'sql';
    }
    logEmitter.emit('log', 'department', 'remove', `department id - ${department.id}`, err);
    getDepartments(err, department, cb);
  });
}

function updateDepartment(department, cb) {
  var source = Object.assign({}, department);
  validator.validate(source, function (errors, fields) {
    if (errors) {
      getDepartments(errors, department, cb);
    } else {
      var sql = getSql('UPDATE');
      var queryArray = [
        department.name,
        department.id,
      ];
      connect.query(sql, queryArray, function (err, res) {
        if (err) {
          err.type = 'sql';
        }
        logEmitter.emit('log', 'department', 'update', `department id - ${department.id}`, err);
        getDepartments(err, department, cb);
      });
    }
  });
}

function getDepartments(error, department, cb) {
  var sql = getSql('SELECT');
  connect.query(sql, function (err, res) {
    if (err) {
      err.type = 'sql';
      error.push(err);
    }
    var queryRes = [];
    for (var i = 0; i < res.length; i++) {
      queryRes.push(res[i]);
    }
    cb(error, queryRes, department, render);
  });
}

function renameTableName(newTablename) {
  tableName = newTablename;
}

// todo validator DONE

module.exports = {
  addDepartment,
  removeDepartment,
  updateDepartment,
  getDepartments,
  renameTableName
};
