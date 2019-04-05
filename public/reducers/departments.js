const initialState = [];

const GET_DEPARTMENT = 'GET_DEPARTMENT';
const PUT_DEPARTMENT = 'PUT_DEPARTMENT';
const POST_DEPARTMENT = 'POST_DEPARTMENT';
const DELETE_DEPARTMENT = 'DELETE_DEPARTMENT';


export default function apiDepartments(state = initialState, action) {
  let {type, response} = action;

  switch (type) {
    case GET_DEPARTMENT: {
      return response;
    }
    case PUT_DEPARTMENT: {
      return [
        ...state,
        response
      ];
    }
    case POST_DEPARTMENT: {
      let departments = [...state];
      let index = departments.findIndex(element => element.id === response.id);
      departments[index].name = response.name;
      return departments
    }
    case DELETE_DEPARTMENT: {
      let departments = [...state];
      let index = departments.findIndex(element => element.id === response.id);
      departments.splice(index, 1);
      return departments;
    }
  }
  return state;
}
