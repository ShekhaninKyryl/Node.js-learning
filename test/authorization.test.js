import {sync} from "../src/syncDb";
import {addEmployee} from '../src/models/employee/EmployeeService';
import {addDepartment} from '../src/models/department/DepartmentService';
import {
  authorizationGetLoginToken,
  authorizationSetPassword,
  getAuthorizedUser,
  isAuthorizedUser
} from '../src/models/authorization/authorizationService';


require('regenerator-runtime/runtime');
let employees = [];
let department = {
  name: '1',
  id: ''
};
afterAll(async ()=>{
  await sync();
});
beforeEach(async () => {
  await sync();
  department = await addDepartment(department);
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
  ];
  await addEmployee(employees[0]);
  await addEmployee(employees[1]);
});

describe('registration SetPassword', () => {
  test('Registration SetPassword correct', async () => {
    let {email} = employees[0];
    let token = await authorizationSetPassword({email, password: '111'});
    expect(token).toEqual({token: expect.any(String), type: 'token'});
  });
  test('Registration SetPassword again', async () => {
    try {
      let {email} = employees[0];
      await authorizationSetPassword({email, password: '111'});
      await authorizationSetPassword({email, password: '111'});
    } catch (e) {
      expect(JSON.stringify(e)).toMatch('error');
    }
  });
  test('Registration SetPassword incorrect password', async () => {
    try {
      let {email} = employees[0];
      await authorizationSetPassword({email, password: ''});
    } catch (e) {
      expect(JSON.stringify(e)).toMatch('error');
    }
  });
  test('Registration SetPassword incorrect email', async () => {
    try {
      let email = '100@100.com';
      await authorizationSetPassword({email, password: '111'});
    } catch (e) {
      expect(JSON.stringify(e)).toMatch('error');
    }
  });
});
describe('GetLoginToken', () => {
  test('GetLoginToken correct', async () => {
    let {email} = employees[0];
    let verifyingData = {email, password: '111'};
    await authorizationSetPassword(verifyingData);
    let token = await authorizationGetLoginToken(verifyingData);
    expect(token).toEqual({token: expect.any(String), type: 'token'});
  });
  test('GetLoginToken incorrect password', async () => {
    try {
      let {email} = employees[0];
      let verifyingData = {email, password: '111'};
      await authorizationSetPassword(verifyingData);
      let token = await authorizationGetLoginToken({...verifyingData, password:'222'});
    } catch (e) {
      expect(JSON.stringify(e)).toMatch('error');
    }
  });
  test('GetLoginToken incorrect email', async () => {
    try {
      let {email} = employees[0];
      let verifyingData = {email, password: '111'};
      await authorizationSetPassword(verifyingData);
      let token = await authorizationGetLoginToken({...verifyingData, email: '100@100.com'});
    } catch (e) {
      expect(JSON.stringify(e)).toMatch('error');
    }
  });
    test('GetLoginToken unAuth user', async () => {
      try {
        let {email} = employees[0];
        let verifyingData = {email, password: '111'};
        await authorizationGetLoginToken(verifyingData);
      } catch (e) {
        expect(JSON.stringify(e)).toMatch('error');
      }
  });
});

describe('getAuthorizedUser', () => {
  test('getAuthorizedUser correct', async () => {
    let {email} = employees[0];
    let verifyingData = {email, password: '111'};
    await authorizationSetPassword(verifyingData);
    let user = await getAuthorizedUser(verifyingData,employees[0]);
    expect(user).toEqual(employees[0]);
  });
  test('getAuthorizedUser user not found ', async () => {
    try {
      let {email} = employees[0];
      let verifyingData = {email, password: '111'};
      await authorizationSetPassword(verifyingData);
      await getAuthorizedUser({...verifyingData});
    } catch (e) {
      expect(JSON.stringify(e)).toMatch('error');
    }
  });
});

describe('isAuthorizedUser', () => {
  test('getAuthorizedUser correct', async () => {
    let {email} = employees[0];
    let verifyingData = {email, password: '111'};
    await authorizationSetPassword(verifyingData);
    let isAuth = await isAuthorizedUser(verifyingData,employees[0]);
    expect(isAuth).toBeTruthy();
  });
  test('isAuthorizedUser user not found', async () => {
    try {
      let {email} = employees[0];
      let verifyingData = {email, password: '111'};
      await authorizationSetPassword(verifyingData);
      await isAuthorizedUser({...verifyingData});
    } catch (e) {
      expect(JSON.stringify(e)).toMatch('error');
    }
  });

});

