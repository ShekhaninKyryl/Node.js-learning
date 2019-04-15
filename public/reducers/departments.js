import {
  GET_DEPARTMENTS,
  PUT_DEPARTMENT,
  POST_DEPARTMENT,
  DELETE_DEPARTMENT,

} from './actionsList';


const initialState = [];

export default function apiDepartments(state = initialState, action) {
  let {type, response} = action;
  switch (type) {
    case GET_DEPARTMENTS: {
      return [
        ...response
      ];
    }
    case PUT_DEPARTMENT: {
      return [
        ...state,
        response
      ];
    }

    case POST_DEPARTMENT: {

      return state.map(dep => {
        if (dep.id === response.id) {
          let newDep = Object.assign({}, dep);
          newDep.name = response.name;
          return newDep;
        } else {
          return dep;
        }
      });
    }
    case DELETE_DEPARTMENT: {
      return state.filter(dep => dep.id !== response.id);
    }
    default: {
      return state;
    }
  }
}
