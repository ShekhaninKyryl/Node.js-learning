const initialState = [];

const GET_EMPLOYEES = 'GET_EMPLOYEES';
const PUT_EMPLOYEES = 'PUT_EMPLOYEES';
const POST_EMPLOYEES = 'POST_EMPLOYEES';
const DELETE_EMPLOYEES = 'DELETE_EMPLOYEES';


export default function apiDepartments(state = initialState, action) {
  let {type, ...result} = action;

  switch (type) {
    case GET_EMPLOYEES: {
      return result;
    }
    case PUT_EMPLOYEES: {
      return [
        ...state,
        result
      ];
    }
    case POST_EMPLOYEES: {
      let employees = [...state];
      let index = employees.findIndex(element => element.id === action.id);
      employees[index] = result;
      return employees
    }
    case DELETE_EMPLOYEES: {
      let employees = [...state];
      let index = employees.findIndex(element => element.id === action.id);
      employees.splice(index, 1);
      return employees;
    }
  }
  return state;
}
