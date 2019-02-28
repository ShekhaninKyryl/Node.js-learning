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
    regExp: '/departments/:department/employee',
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


var logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
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
  render.call(undefined, res, req, next, {type: '404'});
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

function render(res, req, next, err, result, myError, renderPath) {
  if (err) {
    myError = errorHandler.errorParse(err, myError);
    if (err.type === '404') {
      renderPath = '404';
      next(myError);

    }
  }
  ejs.renderFile(ejsFilePath[renderPath], {objects: result, error: myError}, function (err, html) {
    if (err) {
      err.type = 'ejs';
      res.end(errorHandler.errorParse(err, myError));
      next(errorHandler.errorParse(err, myError));

    }
    if (res.locals.needRedirect) {
      var locationString = `http://${req.headers['host']}/departments`;
      if (renderPath === 'employee') {
        locationString += `/${myError.department}/employee`;
      }
      if (myError.error) {
        var queryString = JSON.stringify(myError);
        queryString = crypto.Encrypt(queryString);
        locationString += `?${queryString}`;
        next(myError);
      }
      res.setHeader('Location', locationString);
      res.writeHead(303);
      res.end();
    } else {
      res.end(html);
    }
  });
}

//todo log lib (morgan || winston) DONE
function loggerFunction(err, req, res, next) {
  var time = new Date();
  var str = `${time.toUTCString()}: ${JSON.stringify(err.message)}`;
  logger.log({
    level: 'info',
    message: str
  });
}
module.exports = router;
