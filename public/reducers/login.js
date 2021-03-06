import {
  SET_LOGIN,
  SET_LOGOUT
} from './actionsList';
import Cookies from 'js-cookie';


const initialState = {
  isLogin: !!Cookies.get('token'),
};
export default function Login(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN: {
      return {...state, isLogin: true};
    }
    case SET_LOGOUT: {
      return {...state, isLogin: false};
    }
    default: {
      return state;
    }
  }
}
