const initialState = [];

const GET_DEPARTMENT = 'GET_DEPARTMENT';
const PUT_DEPARTMENT = 'PUT_DEPARTMENT';
const POST_DEPARTMENT = 'POST_DEPARTMENT';
const DELETE_DEPARTMENT = 'DELETE_DEPARTMENT';


export default function apiDepartments(state = initialState, action) {
  let {type, ...result} = action;
  switch (type) {
    case GET_DEPARTMENT: {
      return action.result;
    }
    case PUT_DEPARTMENT: {
      return [
        ...state,
        result
      ];
    }
    case POST_DEPARTMENT: {
      let departments = [...state];
      let index = departments.findIndex(element => element.id === action.id);
      departments[index] = result;
      return departments
    }
    case DELETE_DEPARTMENT: {
      let departments = [...state];
      let index = departments.findIndex(element => element.id === action.id);
      departments.splice(index, 1);
      return departments;
    }
  }
  return state;
}
