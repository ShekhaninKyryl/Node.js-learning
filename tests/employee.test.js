import {
  addEmployee,
  removeEmployee,
  updateEmployee,
  wrappedGetEmployees,
} from '../src/models/employee/EmployeeService'
import {
  addDepartment,
  removeDepartment
} from '../src/models/department/DepartmentService'

require('regenerator-runtime/runtime');

// const {Employee} = require('../src//models/employee/Employee');
// const {Department} = require('../src/models/department/Department');
// const {Logger} = require('../src/models/logger/Logger');
// require('../src/utilities/associations');


let employees = [];
let department = {
  name: '1',
  id: ''
};

beforeAll(async () => {
  return await addDepartment(department)
    .then(data => {
      department = data
    })
    .then(() => {
      employees = [
        {
          id: 0,
          name: '1',
          pay: 1,
          email: '1@1.com',
          department: department.id,
        },
        {
          id: 0,
          name: '2',
          pay: 2,
          email: '2@2.com',
          department: department.id,
        }
      ]

    });
});
afterAll(() => {
  return removeDepartment(department)
    .then(() => {
      department = {};
      employees = [];
    });
});
describe('Add employees', () => {
  test('Add employee[0]', async () => {
    return addEmployee(employees[0])
      .then(data => {

        let {id: resId, ...resRest} = data;
        let {id: depId, ...depRest} = employees[0];
        employees[0] = data;
        expect(resRest).toEqual(depRest);
        expect(resId).toBeGreaterThan(0);
      });
  });
  test('Add other employee[1]', async () => {
    return addEmployee(employees[1])
      .then(data => {
        let {id: resId, ...resRest} = data;
        let {id: depId, ...depRest} = employees[1];
        employees[1] = data;
        expect(resRest).toEqual(depRest);
        expect(resId).toBeGreaterThan(0);
      });
  });
  test('Add employee[0] again', async () => {
    let {id, ...dep} = employees[0];
    return expect(addEmployee({...dep, id: ''}))
      .rejects.toThrow('Email must be unique!');
  });
  test('Add empty employee', async () => {
    let emptyEmployee = {
      name: '',
      pay: '',
      email: '',
    };
    return expect(addEmployee(emptyEmployee))
      .rejects.toThrow(/Validation error:/);
  });
  test('Add incorrect name', async () => {
    let emptyEmployee = {
      name: '',
      pay: '100',
      email: '100@100.com',
    };
    return expect(addEmployee(emptyEmployee))
      .rejects.toThrow(/Validation error:/);
  });
  test('Add incorrect pay', async () => {
    let emptyEmployee = {
      name: '100',
      pay: 'dfgdfg',
      email: '100@100.com',
    };
    return expect(addEmployee(emptyEmployee))
      .rejects.toThrow(/Validation error:/);
  });
  test('Add incorrect email', async () => {
    let emptyEmployee = {
      name: '100',
      pay: 'dfgdfg',
      email: '100@100.com',
    };
    return expect(addEmployee(emptyEmployee))
      .rejects.toThrow(/Validation error:/);
  });
});
describe('Get employees', () => {
  test('Get correct departmentId employee', async () => {
    return wrappedGetEmployees({department: department.id.toString()})
      .then(data => {
        expect(JSON.stringify(data)).toBe(JSON.stringify(employees));
      })
  });
  test('Get incorrect departmentId employee', async () => {
    return expect(wrappedGetEmployees({department: (department.id + 1).toString()}))
      .rejects.toEqual({errors: expect.any(Object)});
  })
});
describe('Update employees', () => {
  test('Update employee[0]', async () => {
    employees[0].email = '3@3.com';
    return updateEmployee(employees[0])
      .then(data => {
        expect(data).toEqual(employees[0]);
      })
  });
  test('Duplicate Update employee[1]', async () => {
    employees[1].email = '3@3.com';
    return expect(updateEmployee(employees[1]))
      .rejects.toThrow('Email must be unique!');
  });
  test('Update empty', async () => {
    let emptyEmployee = {
      name: '',
      pay: '',
      email: '',
      department: department.id,
      id: employees[1].id
    };
    return expect(updateEmployee(emptyEmployee))
      .rejects.toThrow(/Validation error:/);
  });
  test('Update incorrect name', async () => {
    let emptyEmployee = {
      name: '',
      pay: '1',
      email: '100@100.com',
      department: department.id,
      id: employees[1].id
    };
    return expect(updateEmployee(emptyEmployee))
      .rejects.toThrow(/Validation error:/);
  });
  test('Update incorrect pay', async () => {
    let emptyEmployee = {
      name: '1',
      pay: '100000000000000000000000000000000000',
      email: '100@100.com',
      department: department.id,
      id: employees[1].id
    };
    return expect(updateEmployee(emptyEmployee))
      .rejects.toThrow(/Validation error:/);
  });
  test('Update incorrect email', async () => {
    let emptyEmployee = {
      name: '1',
      pay: '100',
      email: '100@111',
      department: department.id,
      id: employees[1].id
    };
    return expect(updateEmployee(emptyEmployee))
      .rejects.toThrow(/Validation error:/);
  });
  test('Update incorrect department', async () => {
    let emptyEmployee = {
      name: '1',
      pay: '100',
      email: '100@100.com',
      department: 0,
      id: employees[1].id
    };
    return expect(updateEmployee(emptyEmployee))
      .rejects.toThrow(/Cannot add or update a child row:/);
  });
  test('Update incorrect id', async () => {
    let emptyEmployee = {
      name: '1',
      pay: '100',
      email: '100@100.com',
      department: department.id,
      id: 0
    };
    return expect(updateEmployee(emptyEmployee))
      .rejects.toThrow(/Cannot read property 'dataValues' of null/);
  });
});
describe('Remove employees', () => {
  test('Remove employee[0]', async () => {
    return removeEmployee(employees[0])
      .then(data => {
        expect(data).toEqual(employees[0]);
      })
  });

  test('Remove employee[0] again', async () => {
    return expect(removeEmployee(employees[0]))
      .rejects.toEqual({errors: expect.any(Object)});
  });

  test('Remove employee[1]', async () => {
    return removeEmployee(employees[1])
      .then(data => {
        expect(data).toEqual(employees[1]);
      })
  });
});
describe('Get employees again ', () => {
  test('Get empty array', async () => {
    return wrappedGetEmployees({department: department.id.toString()})
      .then(data => {
        expect(data).toEqual([]);
      })
  });
});

