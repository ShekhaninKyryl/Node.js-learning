var Schema = require('validate');
var mysql = require('../utilities/mySqlConnector');

var connect = mysql.connect;
var logEmitter = mysql.logEmitter;


var tableName = 'departments';
var render = 'departments';
var queryRes = [];

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
  var myError = validate(Wrapper(department));
  if (myError.error) {
    getDepartments(null, myError, cb);
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
      getDepartments(err, myError, cb);
    });
  }
}

function removeDepartment(department, cb) {
  var myError = Wrapper(department);
  var sql = getSql('DELETE');
  var queryArray = [
    department.id,
  ];
  connect.query(sql, queryArray, function (err, res) {
    if (err) {
      err.type = 'sql';
    }
    logEmitter.emit('log', 'department', 'remove', `department id - ${department.id}`, err);
    getDepartments(err, myError, cb);
  });
}

function updateDepartment(department, cb) {
  var myError = validate(Wrapper(department));
  if (myError.error) {
    getDepartments(null, myError, cb);
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
      getDepartments(err, myError, cb);
    });
  }
}

function getDepartments(error, myError, cb) {
  var sql = getSql('SELECT');

  connect.query(sql, function (err, res) {
    if (err) {
      err.type = 'sql';
      error.push(err);
    }
    queryRes = [];
    for (var i = 0; i < res.length; i++) {
      queryRes.push(res[i]);
    }
    cb(error, queryRes, myError, render);
  });
}

function renameTableName(newTablename) {
  tableName = newTablename;
}
// todo validator
function validate(department) {
  var probablyKey = [
    'name'
  ];
  var regExp = {
    'name': /\S[\w _.@-]{0,40}\S/
  };
  var errorMessages = {
    name: 'Name have to be not empty, won\'t start\\end space, from 2 to 40 characters, can use "-_@."! '
  };

  for (var i = 0; i < probablyKey.length; i++) {
    var matched = department[probablyKey[i]].match(regExp[probablyKey[i]]);
    if (!matched) {
      department.message[probablyKey[i]] += errorMessages[probablyKey[i]];
      department.error = true;
    } else {
      if (department[probablyKey[i]].length !== matched[0].length) {
        department.message[probablyKey[i]] += errorMessages[probablyKey[i]];
        department.error = true;
      }
    }
  }
  return department;
}

function Wrapper(department) {
  var obj = {
    id: 0,
    name: '',
    message: {
      id: '',
      name: '',
      sql: ''
    },
    error: false
  };
  if (department) {
    if (department.id) {
      obj.id = +department.id;
    }
    if (department.name) {
      obj.name = department.name;
    }
  }
  return obj;
}

module.exports = {
  addDepartment,
  removeDepartment,
  updateDepartment,
  getDepartments,
  renameTableName
};
