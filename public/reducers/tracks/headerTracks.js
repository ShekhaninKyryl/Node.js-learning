import axios from "axios";


const getUserInfo = () => {
  return dispatch => {
    axios.get('/api/user')
      .then(response => {
        let {name, email, id} = response.data;
        dispatch({type: 'REFRESH_ERROR'});
        dispatch({type: 'SET_USER', name, email, id});
      })
      .catch(error => {
        dispatch({type: 'SET_USER', name: 'Guest', email: '', id: 0});
        let err = error.response.data.message;
        let {id} = error.response.data;
        dispatch({type: 'SET_ERROR', ...err, id});
      });
  }
};


export {
  getUserInfo
}
