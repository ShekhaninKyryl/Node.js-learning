import {
  addDepartment,
  removeDepartment,
  updateDepartment,
  getDepartments,
} from '../src/models/department/DepartmentService'
require('regenerator-runtime/runtime');

// const {Employee} = require('../src//models/employee/Employee');
// const {Department} = require('../src/models/department/Department');
// const {Logger} = require('../src/models/logger/Logger');
// require('../src/utilities/associations');


expect.extend({
  compare(received, expected) {
    const options = {
      comment: 'Object.is equality',
      isNot: this.isNot,
      promise: this.promise,
    };

    let pass = false;
    let message;

    let {id: resId, ...resRest} = received;
    let {id: depId, ...depRest} = expected;
    pass = JSON.stringify(resRest) === JSON.stringify(depRest) && resId > 1110;
    pass ? message = '' : message = () =>
      `Add department
      Expected: ${this.utils.printExpected(expected)}
      Received: ${this.utils.printReceived(received)}\n
      Differences:\n${this.utils.diff(expected, received)}`;
    return {message, pass};
  }
});

let departments = [];
beforeAll(() => {
  departments = [
    {
      id: '',
      name: '1',
      averagePayment: '0.0000',
      employeeCount: 0
    },
    {
      id: '',
      name: '2',
      averagePayment: '0.0000',
      employeeCount: 0
    }
  ];
});
afterAll(() => {
  departments = [];
});
//todo clear db after test
describe('Add departments', () => {
  test('Add department[0]', async () => {
    let data = await addDepartment(departments[0]);
        let b = expect(data).compare(departments[0]);
        console.error('BBB', b);
        removeDepartment(data);
  });


  test('Add department[0] again', async () => {
    let {id, ...dep} = departments[0];
    return expect(addDepartment({...dep, id: ''}))
      .rejects.toThrow('Department name must be unique!');
  });
  test('Add other department[1]', async () => {
    return addDepartment(departments[1])
      .then(data => {
        let {id: resId, ...resRest} = data;
        let {id: depId, ...depRest} = departments[1];
        departments[1] = data;
        expect(resRest).toEqual(depRest);
        expect(resId).toBeGreaterThan(0);
      });
  });
});
describe('Get departments', () => {
  test('Get departments', async () => {
    return getDepartments()
      .then(data => {
        expect(JSON.stringify(data)).toBe(JSON.stringify(departments));
      })
  })
});
describe('Update departments', () => {
  test('Update department[0]', async () => {
    departments[0].name = '3';
    let {name, id} = departments[0];
    return updateDepartment({name, id})
      .then(data => {
        expect(data).toEqual({name, id});
      })
  });
  test('Duplicate Update department[1]', async () => {
    departments[1].name = '3';
    let {name, id} = departments[1];
    return expect(updateDepartment({name, id}))
      .rejects.toThrow('Department name must be unique!');
  });
});
describe('Remove departments', () => {
  test('Remove department[0]', async () => {
    let {name, id} = departments[0];
    return removeDepartment(departments[0])
      .then(data => {
        expect(data).toEqual({name, id});
      })
  });

  test('Remove department[0] again', async () => {
    let {name, id} = departments[0];
    return expect(removeDepartment({name, id}))
      .rejects.toEqual({errors: expect.any(Object)});

  });

  test('Remove department[1]', async () => {
    let {name, id} = departments[1];
    return removeDepartment(departments[1])
      .then(data => {
        expect(data).toEqual({name, id});
      })
  });
});
describe('Get departments again ', () => {
  test('Get empty array', async () => {
    return getDepartments()
      .then(data => {
        expect(data).toEqual([]);
      })
  })
});

