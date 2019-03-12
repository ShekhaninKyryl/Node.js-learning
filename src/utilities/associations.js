var {Employee} = require('../employee/Employee');
var {Department} = require('../department/Department');

Department.hasMany(Employee, {foreignKey: 'department', onUpdate: 'CASCADE', onDelete: 'RESTRICT'});
