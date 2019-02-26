function errorParse(error, errorWrapper) {
  var returnedError = Object.assign({}, errorWrapper);
  returnedError.error = true;
  switch (error.type) {
    case 'sql': {
      return errorParseSql(error, returnedError);
    }
    case 'ejs': {
      return errorParseEjs(error, returnedError);
    }
    case '404': {
      returnedError.message = 'Oops! ';
      return returnedError;
    }
    default: {
      returnedError.message += 'Something error! ';
      return returnedError;

    }
  }
}

function errorParseSql(error, errorWrapper) {
  var keys = [
    'name',
    'email',
    'pay'
  ];
  if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    errorWrapper.message.name += 'Department not found! '
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

module.exports = {
  errorParse
};
