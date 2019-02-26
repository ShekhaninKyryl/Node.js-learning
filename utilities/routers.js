var parse = require('querystring');
var ejs = require('ejs');
var DepartmentController = require('../department/DepartmentController');
var EmployeeController = require('../employee/EmployeeController');
var errorHandler = require('./errorHandler');
var crypto = require('./crypto');

var handlers = {
  'departmentsadd': {
    fn: DepartmentController.addDepartment,
    needRedirect: true,
    regExp: /\/departments\/action_add/,
    additionalParse: false
  },
  'departmentsremove': {
    fn: DepartmentController.removeDepartment,
    needRedirect: true,
    regExp: /\/departments\/[0-9]{1,10}\/action_remove/,
    additionalParse: false
  },
  'departmentssave': {
    fn: DepartmentController.updateDepartment,
    needRedirect: true,
    regExp: /\/departments\/[0-9]{1,10}\/action_save/,
    additionalParse: false
  },
  'departments': {
    fn: DepartmentController.getDepartments,
    needRedirect: false,
    regExp: /\/departments/,
    additionalParse: false
  },

  'employeeadd': {
    fn: EmployeeController.addEmployee,
    needRedirect: true,
    regExp: /\/departments\/[0-9]{1,10}\/employee\/action_add/,
    additionalParse: false
  },
  'employeeremove': {
    fn: EmployeeController.removeEmployee,
    needRedirect: true,
    regExp: /\/departments\/[0-9]{1,10}\/employee\/[0-9]{1,10}\/action_remove/,
    additionalParse: false
  },
  'employeesave': {
    fn: EmployeeController.editEmployee,
    needRedirect: true,
    regExp: /\/departments\/[0-9]{1,10}\/\employee\/[0-9]{1,10}\/action_save/,
    additionalParse: false
  },
  'employee': {
    fn: DepartmentController.showEmployees,
    needRedirect: false,
    regExp: /\/departments\/[0-9]+\/employee/,
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
var instances = [
  'employee',
  'departments'
];

function serverConfig(req, res) {
  var requestData = '';
  req.needRedirect = false;
  req.on('data', chunk => {
    requestData += chunk.toString();
  });
  req.on('end', serverLogic);

  function serverLogic() {
    var requestObject = parseUrl(req.url);
    if (req.method === 'POST') {
      handlers[requestObject.action].fn(requestObject.object, render);
    } else if (req.method === 'GET') {
      if (instances.includes(requestObject.action)) {
        handlers[requestObject.action].fn(requestObject.object, render);
      } else {
        render({type: '404'});
      }
    } else {
      render({type: '404'});
    }
  }

  function render(err, result, myError, renderPath) {
    if (err) {
      myError = errorHandler.errorParse(err, myError);
      if (err.type === '404') {
        renderPath = '404';
      }
    }
    ejs.renderFile(ejsFilePath[renderPath], {objects: result, error: myError}, function (err, html) {
      if (err) {
        err.type = 'ejs';
        res.end(errorHandler.errorParse(err, myError));
      }
      if (req.needRedirect) {
        var locationString = `http://${req.headers['host']}/departments`;
        if (renderPath === 'employee') {
          locationString += `/${myError.department}/employee`;
        }
        if (myError.error) {
          var queryString = JSON.stringify(myError);
          queryString = crypto.Encrypt(queryString);
          locationString += `?${queryString}`;
        }
        res.setHeader('Location', locationString);
        res.writeHead(303);
        res.end();
      } else {

        res.end(html);
      }

    });
  }


  function parseUrl(url) {
    var arrayJSON = url.split('?');
    url = arrayJSON[0];

    var request = {
      action: '404',
      object: null
    };

    if (arrayJSON.length === 2) {
      try {
        var decr = crypto.Decrypt(arrayJSON[1]);
        var objJSON = JSON.parse(decr);
      } catch (e) {
        return request;
      }
    }

    request.object = objJSON ? objJSON : parse.parse(requestData);
    delete request.object.button;
    for (var key in handlers) {
      var matchedArray = url.match(handlers[key].regExp);
      if (matchedArray) {
        if (url.length === matchedArray[0].length) {
          request.action = key;
          req.needRedirect = handlers[key].needRedirect;
          if (handlers[key].additionalParse) {
            request.object[handlers[key].parse.property] = url.match(handlers[key].parse.regExp)[0];
          }
          return request;
        }
      }
    }
    return request;

  }
}

module.exports = {
  serverConfig
};
