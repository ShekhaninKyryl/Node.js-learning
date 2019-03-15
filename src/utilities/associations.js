const {Employee} = require('../models/employee/Employee');
const {Department} = require('../models/department/Department');

Department.hasMany(Employee, {foreignKey: 'department', onUpdate: 'CASCADE', onDelete: 'RESTRICT'});
