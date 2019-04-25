import is401 from "../utilities/authorizationService";
import {SubmissionError} from "redux-form";
import axios from "axios";
import {
  GET_DEPARTMENTS,
  PUT_DEPARTMENT,
  POST_DEPARTMENT,
  DELETE_DEPARTMENT,
  RESET_DEPARTMENTS,

  SET_LOGOUT,

  REFRESH_ERROR,
  SET_ERROR,
} from '../reducers/actionsList';

const getDepartments = () => {
  return dispatch => {
    axios.get('/api/departments')
      .then(response => response.data)
      .then(response => {
        dispatch({type: GET_DEPARTMENTS, response});
        dispatch({type: REFRESH_ERROR});
      })
      .catch(error => {
        if (is401(error)) {
          dispatch({type: SET_LOGOUT});
        }
        console.log('Get departments err:', error);
        let err = error.response.data.message;
        let {id} = error.response.data;
        dispatch({type: SET_ERROR, ...err, id});
      });
  }
};

const putDepartment = (department) => {
  return dispatch => {
    let {name} = department;
    return axios.put('/api/departments', {name})
      .then(response => response.data)
      .then(response => {
        dispatch({type: PUT_DEPARTMENT, response});
      })
      .catch(error => {
        if (is401(error)) {
          dispatch({type: SET_LOGOUT})
        }
        let err = error.response.data.message;
        throw new SubmissionError(err);
      });
  }
};

const postDepartment = (department) => {
  return dispatch => {
    let {id, name} = department;
    return axios.post(`/api/departments/${id}`, {id, name})
      .then(response => response.data)
      .then((response) => {
        dispatch({type: POST_DEPARTMENT, response})
      })
      .catch(error => {
        console.log(error);
        if (is401(error)) {
          dispatch({type: SET_LOGOUT})
        }

        let err = error.response.data.message;
        throw new SubmissionError(err);
      });
  }
};

const deleteDepartment = (department) => {
  return dispatch => {
    let {id, name} = department;
    return axios.delete(`/api/departments/${id}`, {data: {id, name}})
      .then(response => response.data)
      .then(response => {
        dispatch({type: DELETE_DEPARTMENT, response})
      })
      .catch(error => {
        if (is401(error)) {
          dispatch({type: SET_LOGOUT})
        }
        let err = error.response.data.message;
        throw new SubmissionError(err);
      });
  }
};

const resetDepartments=()=>{
  return dispatch => {
    dispatch({type: RESET_DEPARTMENTS})
  }
}

export {
  getDepartments,
  putDepartment,
  postDepartment,
  deleteDepartment,
  resetDepartments
}
