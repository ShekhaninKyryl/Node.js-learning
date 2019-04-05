import is401 from "../../components/utilities/authorizationService";
import axios from "axios";
import {SubmissionError} from "redux-form";

const getEmployees = (departmentId) => {
  return dispatch => {
    return axios.get(`/api/departments/${departmentId}`)
      .then(response => response.data)
      .then(response => {
        dispatch({type: 'GET_EMPLOYEES', response});
        dispatch({type: 'REFRESH_ERROR'});
      })
      .catch(error => {

        if (is401(error)) {
          console.log('401 err:', error);
          dispatch({type: 'SET_LOGOUT'})
        }
        throw error.response.data.message;
      });
  }
};
const putEmployee = (employee) => {
  return dispatch => {
    let {department} = employee;
    return axios.put(`/api/departments/${department}/employee`, employee)
      .then(response => response.data)
      .then(response => {
        dispatch({type: 'PUT_EMPLOYEES', response});
      })
      .catch(error => {
        if (is401(error)) {
          dispatch({type: 'SET_LOGOUT'})
        }
        let err = error.response.data.message;
        throw new SubmissionError(err);
      });
  }
};
const postEmployee = (employee) => {
  return dispatch => {
    let {id, department} = employee;
    return axios.post(`/api/departments/${department}/employee/${id}`, employee)
      .then(response => response.data)
      .then(response => {
        dispatch({type: 'POST_EMPLOYEES', response});
      })
      .catch(error => {
        if (is401(error)) {
          dispatch({type: 'SET_LOGOUT'})
        }
        let err = error.response.data.message;
        throw new SubmissionError(err);
      });
  }
};
const deleteEmployee = (employee) => {
  return dispatch => {
    let {id, department} = employee;
    return axios.delete(`/api/departments/${department}/employee/${id}`, {data: employee})
      .then(response => response.data)
      .then(response => {
        dispatch({type: 'DELETE_EMPLOYEES', response})
      })
      .catch(error => {
        if (is401(error)) {
          dispatch({type: 'SET_LOGOUT'})
        }
        let err = error.response.data.message;
        throw new SubmissionError(err);
      });
  }
};


export {
  getEmployees,
  putEmployee,
  postEmployee,
  deleteEmployee
}


