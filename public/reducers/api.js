import {
  SET_LOGIN,
  SET_LOGOUT
} from './actionsList';

const initialState = {
  isLogin: true,
};
export default function apiActions(state = initialState, action) {
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
