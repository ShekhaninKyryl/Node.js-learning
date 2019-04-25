import {
  GET_EMPLOYEES,
  PUT_EMPLOYEE,
  POST_EMPLOYEE,
  DELETE_EMPLOYEE,
  RESET_EMPLOYEE
} from './actionsList';

const initialState = [];
export default function Employees(state = initialState, action) {
  let {type, response} = action;
  switch (type) {
    case GET_EMPLOYEES: {
      return [...response];
    }
    case PUT_EMPLOYEE: {
      return [
        ...state,
        response
      ];
    }
    case POST_EMPLOYEE: {
      return state.map(emp => {
        if (emp.id === response.id) {
          let newEmp = Object.assign({}, emp);
          newEmp.name = response.name;
          newEmp.pay = response.pay;
          newEmp.email = response.email;
          return newEmp;
        } else {
          return emp;
        }
      });
    }
    case DELETE_EMPLOYEE: {
      return state.filter(emp => emp.id !== response.id);
    }
    case RESET_EMPLOYEE: {
      return initialState
    }
    default: {
      return state
    }
  }
}
