function errorParse(err, include, instance) {
  let {error, type, ...returnedError} = Object.assign({}, wrapper(include));
  returnedError.instance = instance;
  if (err) {
    returnedError.error = true;
    if (err.type) {
      returnedError.type = err.type;
      switch (returnedError.type) {
        case '401': {
          returnedError.message.name = err.message;
          returnedError.instance = 'guest';
          break;
        }
        case  '404': {
          returnedError.instance = '404';
          returnedError.message.email = err.message;
          break;
        }
      }
    }
    if (err.sql) {
      returnedError = errorParseSql(err.original, returnedError);
    }
    if (err.errors) {
      while (err.errors.length) {
        returnedError.message[err.errors[0].path] += err.errors[0].message + ' ';
        if(err.errors[0].message === 'Department not found'){
          returnedError.id = '0';
        }
        err.errors.shift();
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
