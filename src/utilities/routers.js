const bodyParser = require('body-parser');
const express = require('express');
const winston = require('winston');
const ejs = require('ejs');
require('./associations');

const DepartmentController = require('../department/DepartmentController');
const EmployeeController = require('../employee/EmployeeController');
const errorHandler = require('./errorHandler');
const crypto = require('./crypto');

const router = express();
const handlers = {
  'departmentsadd': {
    fn: DepartmentController.addDepartment,
    needRedirect: true,
    method: 'post',
    regExp: '/departments/action_add',
    additionalParse: false
  },
  'departmentsremove': {
    fn: DepartmentController.removeDepartment,
    needRedirect: true,
    method: 'post',
    regExp: '/departments/:id/action_remove',
    additionalParse: false
  },
  'departmentssave': {
    fn: DepartmentController.updateDepartment,
    needRedirect: true,
    method: 'post',
    regExp: '/departments/:id/action_save',
    additionalParse: false
  },
  'departments': {
    fn: DepartmentController.getDepartments,
    needRedirect: false,
    method: 'get',
    regExp: '/departments',
    additionalParse: false
  },

  'employeeadd': {
    fn: EmployeeController.addEmployee,
    needRedirect: true,
    method: 'post',
    regExp: '/departments/:department/employee/action_add',
    additionalParse: false
  },
  'employeeremove': {
    fn: EmployeeController.removeEmployee,
    needRedirect: true,
    method: 'post',
    regExp: '/departments/:department/employee/:id/action_remove',
    additionalParse: false
  },
  'employeesave': {
    fn: EmployeeController.updateEmployee,
    needRedirect: true,
    method: 'post',
    regExp: '/departments/:department/employee/:id/action_save',
    additionalParse: false
  },
  'employee': {
    fn: EmployeeController.getEmployees,
    needRedirect: false,
    method: 'get',
    regExp: '/departments/:department/employee',
    additionalParse: true,
    parse: {
      property: 'department',
      regExp: /[0-9]+/
    }
  }
};


const ejsFilePath = {
  'employee': './views/Employee.ejs',
  'departments': './views/Department.ejs',
  '404': './views/Error404.ejs'
};

const customFormat = winston.format(function (info) {
  const message = Symbol.for('message');
  try {
    let str = `${info.timestamp}: ${info.instance.toUpperCase()}: `;
    for (let key in info.message) {
      if (info.message.hasOwnProperty(key)) {
        if (info.message[key]) {
          str += `"${info[key]}" - ${info.message[key]};`;
        }
      }
    }
    info[message] = str;
  } catch {
    throw new Error(info.stack)
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


router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


for (let key in handlers) {
  router[handlers[key].method](handlers[key].regExp, option(handlers[key]));
}

router.all('*', function (req, res, next) {
  render.call(undefined, res, req, next, {type: '404'});
});

router.use(loggerFunction);


function option(handler) {
  return function (req, res, next) {
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
    const rendering = render.bind(undefined, res, req, next);
    handler.fn(queryObj, rendering);


  };
}

function render(res, req, next, err, result, instanceObject, renderPath) {
  const error = errorHandler.errorParse(err, instanceObject);
  error.instance = renderPath;
  if (error.type === '404') {
    renderPath = '404';
    error.instance = renderPath;
    next(error);
  }
  if (res.locals.needRedirect) {
    let locationString = `http://${req.headers['host']}/departments`;
    if (renderPath === 'employee') {
      locationString += `/${error.department}/employee`;
    }
    if (error.error) {
      let queryString = JSON.stringify(error);
      queryString = crypto.Encrypt(queryString);
      locationString += `?${queryString}`;
      next(error);
    }

    res.redirect(locationString);
  } else {
    ejs.renderFile(ejsFilePath[renderPath], {objects: result, error: error}, function (err, html) {
      if (err) {
        err.type = 'ejs';
        res.end(errorHandler.errorParse(err, instanceObject));
        next(errorHandler.errorParse(err, instanceObject));

      } else {
        res.end(html);
      }
    });
  }
}

function loggerFunction(err, req, res, next) {
  logger.log('error', err);
}

module.exports = router;
