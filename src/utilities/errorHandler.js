function errorParse(error, include) {
  let returnedError = Object.assign({}, wrapper(include));

  if (error) {
    returnedError.error = true;
    if (error.type) {
      returnedError.type = error.type;
    }
    if (error.sql) {
      returnedError = errorParseSql(error.original, returnedError);
    }
    if (error.errors) {
      while (error.errors.length) {
        returnedError.message[error.errors[0].path] += error.errors[0].message + ' ';
        if(error.errors[0].message === 'Department not found'){
          returnedError.id = '0';
        }
        error.errors.shift();
      }
    }
  }
  return returnedError;
}

function errorParseSql(error, errorWrapper) {
  if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    errorWrapper.message.department += 'Department not found! '
  }
  return errorWrapper;
}

function wrapper(include) {
  const obj = {
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
    for (let key in obj) {
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
