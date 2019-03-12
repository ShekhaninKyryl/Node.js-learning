const {Employee} = require('../employee/Employee');
const {Department} = require('../department/Department');

Department.hasMany(Employee, {foreignKey: 'department', onUpdate: 'CASCADE', onDelete: 'RESTRICT'});
