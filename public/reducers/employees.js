const initialState = [];

const GET_EMPLOYEES = 'GET_EMPLOYEES';
const PUT_EMPLOYEES = 'PUT_EMPLOYEES';
const POST_EMPLOYEES = 'POST_EMPLOYEES';
const DELETE_EMPLOYEES = 'DELETE_EMPLOYEES';


export default function apiDepartments(state = initialState, action) {
  let {type, response} = action;

  switch (type) {
    case GET_EMPLOYEES: {
      return response;
    }
    case PUT_EMPLOYEES: {
      return [
        ...state,
        response
      ];
    }
    case POST_EMPLOYEES: {
      let employees = [...state];
      let index = employees.findIndex(element => element.id === response.id);
      let {name, pay, email} = response;
      employees[index].name = name;
      employees[index].pay = pay;
      employees[index].email = email;
      return employees
    }
    case DELETE_EMPLOYEES: {
      let employees = [...state];
      let index = employees.findIndex(element => element.id === response.id);
      employees.splice(index, 1);
      return employees;
    }
  }
  return state;
}
