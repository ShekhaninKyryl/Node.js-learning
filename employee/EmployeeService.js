var mysql = require('../utilities/mySqlConnector');

var connect = mysql.connect;
var logEmitter = mysql.logEmitter;

var tableName = 'employees';
var render = 'employee';
var queryRes = [];

var getSql = function (stringCommand) {
  switch (stringCommand) {
    case 'SELECT': {
      return `SELECT * FROM ${tableName} WHERE department = ?`;
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
  var myError = validate(employeeWrapper(employee));
  if (myError.error) {
    getEmployees(null, {department: employee.department}, myError, cb);
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
        err.type = 'sql'
      } else {
        myError.id = -1;
      }
      logEmitter.emit('log', 'employee', 'add', `employee id - ${res ? res.insertId : 0}`, err);
      getEmployees(err, {department: employee.department}, myError, cb);
    });
  }
}

function removeEmployee(employee, cb) {
  var myError = employeeWrapper(employee);
  var sql = getSql('DELETE');
  var queryArray = [
    employee.id
  ];
  connect.query(sql, queryArray, function (err, res) {
    if (err) {
      err.type = 'sql';
    }
    logEmitter.emit('log', 'employee', 'remove', `employee id - ${employee.id}`, err);
    getEmployees(err, {department: employee.department}, myError, cb);
  });
}

function removeAllEmployee(employee, cb) {
  var myError = employeeWrapper(employee);
  var sql = getSql('DELETE ALL');
  var queryArray = [
    employee.department
  ];
  connect.query(sql, queryArray, function (err, res, fields) {
    if (err) {
      err.type = 'sql';
      getEmployees(err, {department: employee.department}, myError, cb);
    } else {
      cb();
      console.log(`Removed employees: ${employee.department}`);
    }
    logEmitter.emit('log', 'employee', 'remove All', `department id - ${employee.department}`, err);
  });

}

function editEmployee(employee, cb) {
  var myError = validate(employeeWrapper(employee));
  if (myError.error) {
    getEmployees(null, {department: employee.department}, myError, cb);
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
      }
      logEmitter.emit('log', 'employee', 'update', `employee id - ${employee.id}`, err);
      getEmployees(err, {department: employee.department}, myError, cb);
    });
  }
}

function getEmployees(error, employee, myError, cb) {
  var sql = getSql('SELECT');
  if (!myError) {
    myError = employeeWrapper(myError);
  }
  var queryArray = [
    employee.department
  ];
  connect.query(sql, queryArray, function (err, res) {
    if (err) {
      err.type = 'sql';
    }
    queryRes = [];
    myError.department = employee.department;
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
function validate(employee) {
  var probablyKey = [
    'name',
    'pay',
    'email'
  ];
  var regExp = {
    name: /\S[\w _.@-]{0,40}\S/,
    pay: /[1-9][0-9]*/,
    email: /[a-zA-Z0-9._-]+@[[a-zA-Z0-9._-]+/
  };
  var errorMessages = {
    name: 'Name have to be not empty, won\'t start\\end space, from 2 to 40 characters, can use "-_@."! ',
    pay: 'Payment have to be not empty, won\'t start "0"! ',
    email: 'Email have to be not empty, won\'t start\\end space, "@" must be between, can use "-_."! '
  };
  for (var i = 0; i < probablyKey.length; i++) {
    var matched = employee[probablyKey[i]].match(regExp[probablyKey[i]]);
    if (!matched) {
      employee.message[probablyKey[i]] += errorMessages[probablyKey[i]];
      employee.error = true;
    } else {
      if (employee[probablyKey[i]].length !== matched[0].length) {
        employee.message[probablyKey[i]] += errorMessages[probablyKey[i]];
        employee.error = true;
      }
    }
  }
  return employee;
}

function employeeWrapper(employee) {
  var obj = {
    id: 0,
    name: '',
    pay: '',
    email: '',
    department: 0,
    message: {
      id: '',
      name: '',
      pay: '',
      email: '',
      department: '',
      sql: ''
    },
    error: false
  };
  if (employee) {
    if (employee.id) {
      obj.id = employee.id;
    }
    if (employee.name) {
      obj.name = employee.name;
    }
    if (employee.pay) {
      obj.pay = employee.pay;
    }
    if (employee.email) {
      obj.email = employee.email;
    }
    if (employee.department) {
      obj.department = employee.department;
    }
  }
  return obj;
}

module.exports = {
  addEmployee,
  removeEmployee,
  removeAllEmployee,
  editEmployee,
  getEmployees,
  renameTableName
};
