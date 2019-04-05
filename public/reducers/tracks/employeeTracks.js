import is401 from "../../components/utilities/authorizationService";
import axios from "axios";

const getEmployees = (departmentId) => {
  return dispatch => {
    axios.get(`/api/departments/${departmentId}`)
      .then(response => response.data)
      .then(response => {
        dispatch({type: 'REFRESH_ERROR'});
        dispatch({type: 'GET_EMPLOYEES', response});
      })
      .catch(error => {
        console.log('Get employees error:', error);
        if (is401(error)) {
          dispatch({type: 'SET_LOGOUT'})
        }
        console.log('GET_EMPLOYEES err:', error);
        let err = error.response.data.message;
        let {id} = error.response.data;
        dispatch({type: 'SET_ERROR', ...err, id});
      });
  }
};
const putEmployee = (employee) => {
  return dispatch => {
    let {department} = employee;
    return axios.put(`/api/departments/${department}/employee`, employee)
      .then(response => response.data)
      .then(response => {
        dispatch({type: 'REFRESH_ERROR'});
        dispatch({type: 'PUT_EMPLOYEES', response});
        return true;
      })
      .catch(error => {
        if (is401(error)) {
          dispatch({type: 'SET_LOGOUT'})
        }
        console.log('PUT_EMPLOYEES err:', error);
        let err = error.response.data.message;
        let {id} = error.response.data;
        dispatch({type: 'SET_ERROR', ...err, id});
        return false;
      });
  }
};
const postEmployee = (employee) => {
  return dispatch => {
    let {id, department} = employee;
    axios.post(`/api/departments/${department}/employee/${id}`, employee)
      .then(response => response.data)
      .then(response => {
        dispatch({type: 'REFRESH_ERROR'});
        dispatch({type: 'POST_EMPLOYEES', response});
      })
      .catch(error => {
        if (is401(error)) {
          dispatch({type: 'SET_LOGOUT'})
        }
        console.log('POST_EMPLOYEES err:', error);
        let err = error.response.data.message;
        let {id} = error.response.data;
        dispatch({type: 'SET_ERROR', ...err, id});
      });
  }
};
const deleteEmployee = (employee) => {
  return dispatch => {
    let {id, department} = employee;
    axios.delete(`/api/departments/${department}/employee/${id}`, {data: employee})
      .then(response => response.data)
      .then(response => {
        dispatch({type: 'REFRESH_ERROR'});
        dispatch({type: 'DELETE_EMPLOYEES', response})
      })
      .catch(error => {
        if (is401(error)) {
          dispatch({type: 'SET_LOGOUT'})
        }
        console.log('DELETE_EMPLOYEES err:', error);
        let err = error.response.data.message;
        let {id} = error.response.data;
        dispatch({type: 'SET_ERROR', ...err, id});
      });
  }
};


export {
  getEmployees,
  putEmployee,
  postEmployee,
  deleteEmployee
}


