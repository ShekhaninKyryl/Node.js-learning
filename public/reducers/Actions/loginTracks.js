import axios from "axios";
import {SubmissionError} from "redux-form";


import {
  SET_LOGIN,
  SET_LOGOUT,

  SET_ERROR,
  REFRESH_ERROR

} from '../actionsList';

const postLogin = (data) => {
  return dispatch => {
    return axios.post('/api/guest/login', data)
      .then(() => {
        dispatch({type: REFRESH_ERROR});
        dispatch({type: SET_LOGIN})
      })
      .catch(error => {
        let err = error.response.data.message;
        let errMessage = '';
        for(let key in err){
            errMessage += err[key];
        }
        throw new SubmissionError({_error: errMessage});
      });
  }
};
const putRegistration = (data) => {
  return dispatch => {
    return axios.put('/api/guest/registration', data)
      .then(() => {
        dispatch({type: REFRESH_ERROR});
        dispatch({type: SET_LOGIN})
      })
      .catch(error => {
        let err = error.response.data.message;
        let errMessage = '';
        for(let key in err){
          errMessage += err[key];
        }
        throw new SubmissionError({_error: errMessage});
      });
  }
};
const getIsLogin = () => {
  return dispatch => {
    axios.get('api/guest')
      .then(() => dispatch({type: SET_LOGIN}))
      .catch(() => dispatch({type: SET_LOGOUT}));
  }
};
const getLogout = () => {
  return dispatch => {
    axios.get('/api/logout')
      .then(() => {
        dispatch({type: SET_LOGOUT})
      })
      .catch(error => {
        let err = error.response.data.message;
        let {id} = error.response.data;
        dispatch({type: SET_ERROR, ...err, id});
      });
  }
};


export {
  postLogin,
  putRegistration,
  getIsLogin,
  getLogout,
}


