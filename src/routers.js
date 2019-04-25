/*
NPM modules
 */
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const winston = require('winston');
const ejs = require('ejs');
const path = require('path');
//test comment

/*
Project modules
 */
const DepartmentService = require('./models/department/DepartmentService');
const EmployeeService = require('./models/employee/EmployeeService');
const {logEmitter} = require('./models/logger/LoggerService');
const {
  authorizationGetLoginToken,
  authorizationSetPassword,
  getAuthorizedUser,
  isAuthorizedUser
} = require('./models/authorization/authorizationService');

/*
Utilities
 */
const MyError = require('./utilities/MyError');
const errorHandler = require('./utilities/errorHandler');
const {authorization} = require('./middlewares/authorization');
const config = require('./config');
const crypto = require('./utilities/crypto');
require('./utilities/associations');


const router = express();
const handlers = {
  'guestlogin': {
    fn: authorizationGetLoginToken,
    needRedirect: true,
    method: 'post',
    regExp: '/api/guest/login',
    additionalParse: false,
    render: 'guest'
  },
  'guestregistration': {
    fn: authorizationSetPassword,
    needRedirect: true,
    method: 'put',
    regExp: '/api/guest/registration',
    additionalParse: false,
    render: 'guest'
  },
  'guest': {
    fn: isAuthorizedUser,
    needRedirect: false,
    method: 'get',
    regExp: '/api/islogin',
    additionalParse: false,
    render: 'guest'
  },
  'getuser': {
    fn: getAuthorizedUser,
    needRedirect: true,
    method: 'get',
    regExp: '/api/user',
    additionalParse: false,
    render: 'guest'
  },


  'departmentsadd': {
    fn: DepartmentService.addDepartment,
    needRedirect: true,
    method: 'put',
    regExp: '/api/departments',
    additionalParse: false,
    render: 'departments'
  },
  'departmentsremove': {
    fn: DepartmentService.removeDepartment,
    needRedirect: true,
    method: 'delete',
    regExp: '/api/departments/:id',
    additionalParse: false,
    render: 'departments'
  },
  'departmentssave': {
    fn: DepartmentService.updateDepartment,
    needRedirect: true,
    method: 'post',
    regExp: '/api/departments/:id',
    additionalParse: false,
    render: 'departments'
  },
  'departments': {
    fn: DepartmentService.getDepartments,
    needRedirect: false,
    method: 'get',
    regExp: '/api/departments',
    additionalParse: false,
    render: 'departments'
  },

  'employeeadd': {
    fn: EmployeeService.addEmployee,
    needRedirect: true,
    method: 'put',
    regExp: '/api/departments/:department/employee',
    additionalParse: false,
    render: 'employee'
  },
  'employeeremove': {
    fn: EmployeeService.removeEmployee,
    needRedirect: true,
    method: 'delete',
    regExp: '/api/departments/:department/employee/:id',
    additionalParse: false,
    render: 'employee'
  },
  'employeesave': {
    fn: EmployeeService.updateEmployee,
    needRedirect: true,
    method: 'post',
    regExp: '/api/departments/:department/employee/:id',
    additionalParse: false,
    render: 'employee'
  },
  'employee': {
    fn: EmployeeService.wrappedGetEmployees,
    needRedirect: false,
    method: 'get',
    regExp: '/api/departments/:department',
    additionalParse: true,
    render: 'employee',
    parse: {
      property: 'department',
      regExp: /[0-9]+/
    }
  }
};
const ejsFilePath = {
  'employee': './views/Employee.ejs',
  'departments': './views/Department.ejs',
  'guest': './views/login.ejs',
  '401': './views/login.ejs',
  '404': './views/Error404.ejs'

};
const customFormat = winston.format(function (info) {
  const message = Symbol.for('message');
  try {
    let str = `${info.timestamp}: ${info.instance.toUpperCase()}: `;
    for (let key in info.message) {
      if (info.message.hasOwnProperty(key)) {
        if (info.message[key]) {
          str += info[key] ? `${info[key]} - ` : '';
          str += `${info.message[key]};`;
        }
      }
    }
    info[message] = str;
  } catch {
    throw new Error(info.message);
  }
  return info;
});
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.json(),
    customFormat()
  ),
  transports: [
    new winston.transports.File({filename: 'log.txt'}),
    new winston.transports.Console()
  ]
});
const expired = config.JWT.EXPIRES;

// const expired = 10000;


let {guestregistration, guestlogin, getuser, guest, ...other} = handlers;

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use(cookieParser());

/*
* Before Auth
* */
registrationMiddleWare(guestregistration);
registrationMiddleWare(guestlogin);

router.get('/api/logout', function (req, res) {
  res.clearCookie('token');
  res.json('ok');
});

/*
* Auth
* */
router.use(authorization);


/*
* After Auth
* */
registrationMiddleWare(guest);
registrationMiddleWare(getuser);
for (let middleWare in other) {
  registrationMiddleWare(other[middleWare])
}
router.all('*', function (req, res) {
  console.log(`Request: [${req.method}]`, req.originalUrl);
  res.sendFile('index.html', {root: path.join(__dirname, '../dist')});
});
router.use(loggerFunction);


function registrationMiddleWare(handler) {
  router[handler.method](handler.regExp, option(handler));
}

function option(handler) {
  return async function (req, res, next) {
    let queryObj = req.body;
    delete queryObj.button;
    if (handler.additionalParse) {
      queryObj[handler.parse.property] = req.params[handler.parse.property];
    }

    const arrayJSON = req.url.split('?');
    if (arrayJSON.length === 2) {
      try {
        const decr = crypto.Decrypt(arrayJSON[1]);
        queryObj = JSON.parse(decr);
      } catch (e) {
        console.log(e.message);
      }
    }

    res.locals.needRedirect = handler.needRedirect;

    let instanceObject = queryObj;
    let renderPath = handler.render;
    let result = null;
    let emitterError = null;
    let err;
    let status = 400;


    try {
      result = await handler.fn(queryObj, res.locals.user);
      status = 200;
      try {
        if (result.type === 'token') {
          res.cookie('token', result.token, {maxAge: expired});
          result = 'ok';
          renderPath = 'departments';
        }
      } catch {
      }
    } catch (e) {
      emitterError = new MyError(e);
    }
    if (handler.method !== 'get') {
      await logEmitter.emit('log', handler.render, handler.fn.name, emitterError ? emitterError : result, emitterError);
    }
    err = emitterError ? errorHandler.errorParse(emitterError, instanceObject, renderPath) : null;
    await res.status(status).json(err ? err : result);
    err ? next(err) : false;
  };
}

function loggerFunction(err, req, res, next) {
  logger.log('error', err);
}

module.exports = router;
