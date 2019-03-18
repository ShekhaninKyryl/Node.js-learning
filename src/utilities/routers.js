/*
NPM modules
 */
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const winston = require('winston');
const ejs = require('ejs');

/*
Project modules
 */
const DepartmentService = require('../models/department/DepartmentService');
const EmployeeService = require('../models/employee/EmployeeService');
const {logEmitter} = require('../models/logger/LoggerService');
const {authorizationGetLoginToken, authorizationSetPassword} = require('../models/authorization/authorizationService');

/*
Utilities
 */
const MyError = require('./MyError');
const errorHandler = require('./errorHandler');
const {authorization} = require('../middlewares/authorization');
const config = require('../config');
const crypto = require('./crypto');
require('./associations');


const router = express();
const handlers = {
  'guestlogin': {
    fn: authorizationGetLoginToken,
    needRedirect: true,
    method: 'post',
    regExp: '/guest/login',
    additionalParse: false,
    render: 'guest'
  },
  'guestregistration': {
    fn: authorizationSetPassword,
    needRedirect: true,
    method: 'post',
    regExp: '/guest/registration',
    additionalParse: false,
    render: 'guest'
  },
  'guest': {
    fn: _ => _,
    needRedirect: false,
    method: 'get',
    regExp: '/guest',
    additionalParse: false,
    render: 'guest'
  },
  'departmentsadd': {
    fn: DepartmentService.addDepartment,
    needRedirect: true,
    method: 'post',
    regExp: '/departments/action_add',
    additionalParse: false,
    render: 'departments'
  },
  'departmentsremove': {
    fn: DepartmentService.removeDepartment,
    needRedirect: true,
    method: 'post',
    regExp: '/departments/:id/action_remove',
    additionalParse: false,
    render: 'departments'
  },
  'departmentssave': {
    fn: DepartmentService.updateDepartment,
    needRedirect: true,
    method: 'post',
    regExp: '/departments/:id/action_save',
    additionalParse: false,
    render: 'departments'
  },
  'departments': {
    fn: DepartmentService.getDepartments,
    needRedirect: false,
    method: 'get',
    regExp: '/departments',
    additionalParse: false,
    render: 'departments'
  },

  'employeeadd': {
    fn: EmployeeService.addEmployee,
    needRedirect: true,
    method: 'post',
    regExp: '/departments/:department/employee/action_add',
    additionalParse: false,
    render: 'employee'
  },
  'employeeremove': {
    fn: EmployeeService.removeEmployee,
    needRedirect: true,
    method: 'post',
    regExp: '/departments/:department/employee/:id/action_remove',
    additionalParse: false,
    render: 'employee'
  },
  'employeesave': {
    fn: EmployeeService.updateEmployee,
    needRedirect: true,
    method: 'post',
    regExp: '/departments/:department/employee/:id/action_save',
    additionalParse: false,
    render: 'employee'
  },
  'employee': {
    fn: EmployeeService.getEmployees,
    needRedirect: false,
    method: 'get',
    regExp: '/departments/:department/employee',
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
  'guest': './views/Login.ejs',
  '401': './views/Login.ejs',
  '404': './views/Error404.ejs'

};
const customFormat = winston.format(function (info) {
  const message = Symbol.for('message');
  try {
    let str = `${info.timestamp}: ${info.instance.toUpperCase()}: `;
    for (let key in info.message) {
      if (info.message.hasOwnProperty(key)) {
        if (info.message[key]) {
          str += info[key]? `${info[key]} - `:'';
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



router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use(cookieParser());

let {guestregistration, guestlogin, guest, ...other} = handlers;

registrationMiddleWare(guestregistration);
registrationMiddleWare(guestlogin);
registrationMiddleWare(guest);
router.use(authorization);
router.get('/logout', function (req, res) {
  res.clearCookie('token');
  res.redirect('/guest');
});

for (let middleWare in other) {
  registrationMiddleWare(other[middleWare])
}
router.all('*', function (req, res, next) {
  let err = new MyError(`${req.originalUrl} - Page not found!`, '404');
  next({err});
});
router.use(render);
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
    let err = null;

    try {
      result = await handler.fn(queryObj);
      try {
        if (result.type === 'token') {
          res.cookie('token', result.token, {maxAge: expired});
          result = {email: queryObj.email};
          renderPath = 'departments';
        }
      } catch {
      }
    } catch (e) {
      err = new MyError(e)
    }
    if (handler.method !== 'get') {
      logEmitter.emit('log', handler.render, handler.fn.name, err ? err : result, err);
    }
    next({err, result, instanceObject, renderPath});
  };
}

async function render(ErrorResInstanceRender, req, res, next) {
  let {err, result, instanceObject, renderPath} = ErrorResInstanceRender;
  let queryString = '';
  let error = errorHandler.errorParse(err, instanceObject);

  if(error.type) {
    renderPath = error.type;
  } else {
    error.instance = renderPath;
  }

  if (error.error) {
    delete error.type;
    queryString = JSON.stringify(error);
    queryString = `?${crypto.Encrypt(queryString)}`;
    next(error);
  }

  if (res.locals.needRedirect) {
    let locationString = `http://${config.SERVER.HOST}:${config.SERVER.PORT}/`;
    switch (renderPath) {
      case 'departments': {
        locationString += `${renderPath}`;
        break;
      }
      case 'employee': {
        locationString += `departments/${error.department}/${renderPath}`;
        break;
      }
      case 'guest': {
        locationString += `${renderPath}`;
        break;
      }
      case '401': {
        locationString += `guest`;
        break;
      }
      default: {
        locationString += `guest`;
      }
    }
    locationString += queryString;
    res.redirect(locationString);
  } else {
    let html = await ejs.renderFile(ejsFilePath[renderPath], {objects: result, error: error});
    res.end(html);
  }
}

function loggerFunction(err, req, res, next) {
  logger.log('error', err);
}

module.exports = router;
