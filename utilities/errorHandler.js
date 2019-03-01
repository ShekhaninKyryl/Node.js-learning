function errorParse(error, include) {
  var returnedError = Object.assign({}, wrapper(include));

  if (error) {
    returnedError.error = true;
    while (error.length) {
      switch (error[0].type) {
        case 'sql': {
          errorParseSql(error[0], returnedError);
          break;
        }
        case 'ejs': {
          errorParseEjs(error[0], returnedError);
          break
        }
        case '404': {
          returnedError.type = '404';
          return returnedError;
        }
        default: {
          returnedError.message[error[0].field] += error[0].message + ' ';
          break;
        }
      }
      error.shift();
    }
  }
  return returnedError;
}

function errorParseSql(error, errorWrapper) {
  var keys = [
    'name',
    'email',
    'pay'
  ];
  if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    errorWrapper.message.department += 'Department not found! '
  }
  keys.forEach(function (item, i, keys) {
    if (error.message.match(`for column '${keys[i]}'`)) {
      switch (error.code) {
        case 'ER_DUP_ENTRY': {
          errorWrapper.message[keys[i]] += 'Duplicate value! ';
          break;
        }
        case 'WARN_DATA_TRUNCATED': {
          errorWrapper.message[keys[i]] += ' Must be positive number! ';
          break;
        }
        case 'ER_WARN_DATA_OUT_OF_RANGE': {
          errorWrapper.message[keys[i]] += ' Value out of range!';
          break;
        }
        default: {
          errorWrapper.message[keys[i]] += ' SQL error!';
          break;
        }
      }
    }
    if (error.message.match(`for key '${keys[i]}'`)) {
      switch (error.code) {
        case 'ER_DUP_ENTRY': {
          errorWrapper.message[keys[i]] += 'Duplicate value! ';
          break;
        }
        case 'WARN_DATA_TRUNCATED': {
          errorWrapper.message[keys[i]] += ' Must be positive number! ';
          break;
        }
        case 'ER_WARN_DATA_OUT_OF_RANGE': {
          errorWrapper.message[keys[i]] += ' Value out of range!';
          break;
        }
        default: {
          errorWrapper.message[keys[i]] += ' SQL error!';
          break;
        }
      }
    }
  });
  return errorWrapper;
}

function errorParseEjs(error) {
  return 'Ejs error: ' + error.message;
}


function wrapper(include) {
  var obj = {
    id: 0,
    name: '',
    pay: 0,
    email: '',
    department: '',
    type: '',
    message: {
      id: '',
      name: '',
      pay: '',
      email: '',
      department: '',
    },
    error: false
  };
  if (include) {
    for (var key in obj) {
      if (include[key]) {
        obj[key] = include[key];
      }
    }
  }
  return obj;
}


module.exports = {
  errorParse
};
