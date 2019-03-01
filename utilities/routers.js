var bodyParser = require('body-parser');
var express = require('express');
var winston = require('winston');
var ejs = require('ejs');

var DepartmentController = require('../department/DepartmentController');
var EmployeeController = require('../employee/EmployeeController');
var errorHandler = require('./errorHandler');
var crypto = require('./crypto');

var router = express();
var handlers = {
  'departmentsadd': {
    fn: DepartmentController.addDepartment,
    needRedirect: true,
    method: 'post',
    regExp: /^\/departments\/action_add$/,
    additionalParse: false
  },
  'departmentsremove': {
    fn: DepartmentController.removeDepartment,
    needRedirect: true,
    method: 'post',
    regExp: /^\/departments\/[0-9]{1,10}\/action_remove$/,
    additionalParse: false
  },
  'departmentssave': {
    fn: DepartmentController.updateDepartment,
    needRedirect: true,
    method: 'post',
    regExp: /^\/departments\/[0-9]{1,10}\/action_save$/,
    additionalParse: false
  },
  'departments': {
    fn: DepartmentController.getDepartments,
    needRedirect: false,
    method: 'get',
    regExp: /^\/departments$/,
    additionalParse: false
  },

  'employeeadd': {
    fn: EmployeeController.addEmployee,
    needRedirect: true,
    method: 'post',
    regExp: /^\/departments\/[0-9]{1,10}\/employee\/action_add$/,
    additionalParse: false
  },
  'employeeremove': {
    fn: EmployeeController.removeEmployee,
    needRedirect: true,
    method: 'post',
    regExp: /^\/departments\/[0-9]{1,10}\/employee\/[0-9]{1,10}\/action_remove$/,
    additionalParse: false
  },
  'employeesave': {
    fn: EmployeeController.editEmployee,
    needRedirect: true,
    method: 'post',
    regExp: /^\/departments\/[0-9]{1,10}\/\employee\/[0-9]{1,10}\/action_save$/,
    additionalParse: false
  },
  'employee': {
    fn: DepartmentController.showEmployees,
    needRedirect: false,
    method: 'get',
    regExp: '/departments/:department/employee?',
    additionalParse: true,
    parse: {
      property: 'department',
      regExp: /[0-9]+/
    }
  }
};
var ejsFilePath = {
  'employee': './views/Employee.ejs',
  'departments': './views/Department.ejs',
  '404': './views/Error404.ejs'
};

var customFormat = winston.format(function (info,opts) {
//  var message = Symbol('message');
  var message = Symbol.for('message');
  var str = '';
  str += `${info.timestamp}: `;
  str += `${info.instance.toUpperCase()}: `;
  for(var key in info.message){
    if(info.message[key]){
      str += `"${info[key]}" - ${info.message[key]};`;
    }
  }
  info[message] = str;

  return info;
});


var logger = winston.createLogger({
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


for (var key in handlers) {
  router[handlers[key].method](handlers[key].regExp, option(handlers[key]));
}

// todo 404 middleware DONE
router.all('*', function (req, res, next) {
  render.call(undefined, res, req, next, [{type: '404'}]);
});

router.use(loggerFunction);


function option(handler) {
  return function (req, res, next) {
    var queryObj = req.body;
    delete queryObj.button;
    //todo :id DONE
    if (handler.additionalParse) {
      queryObj[handler.parse.property] = req.params[handler.parse.property];
    }

    var arrayJSON = req.url.split('?');
    if (arrayJSON.length === 2) {
      try {
        var decr = crypto.Decrypt(arrayJSON[1]);
        queryObj = JSON.parse(decr);
      } catch (e) {
        console.log(e.message);
      }
    }

    res.locals.needRedirect = handler.needRedirect;
    var rendering = render.bind(undefined, res, req, next);
    handler.fn(queryObj, rendering);


  };
}

function render(res, req, next, err, result, instanceObject, renderPath) {
  var error = errorHandler.errorParse(err, instanceObject);
  error.instance = renderPath;
  if (error.type === '404') {
    renderPath = '404';
    next(error);
  }
  ejs.renderFile(ejsFilePath[renderPath], {objects: result, error: error}, function (err, html) {
    if (err) {
      err.type = 'ejs';
      res.end(errorHandler.errorParse(err, instanceObject));
      next(errorHandler.errorParse(err, instanceObject));

    }
    if (res.locals.needRedirect) {
      var locationString = `http://${req.headers['host']}/departments`;
      if (renderPath === 'employee') {
        locationString += `/${error.department}/employee`;
      }
      if (error.error) {
        var queryString = JSON.stringify(error);
        queryString = crypto.Encrypt(queryString);
        locationString += `?${queryString}`;
        next(error);
      }
      res.setHeader('Location', locationString);
      res.writeHead(303);
      res.end();
    } else {
      res.end(html);
    }
  });
}

//todo log lib (morgan || winston) DONE maybe
function loggerFunction(err, req, res, next) {

  logger.log(
    'error',
    err
  );
}

module.exports = router;
