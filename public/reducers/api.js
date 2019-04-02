const initialState = {
  isLogin: false,
  isFetching: false
};

const SET_LOGIN = 'SET_LOGIN';
const SET_LOGOUT = 'SET_LOGOUT';
const SET_FETCHING = 'SET_FETCHING';
const SET_UNFETCHING = 'SET_UNFETCHING';

export default function apiActions(state = initialState, action) {
  let {isLogin, isFetching} = state;
  switch (action.type) {
    case SET_LOGIN: {
      return {isLogin: true, isFetching};
    }
    case SET_LOGOUT: {
      return {isLogin: false, isFetching};
    }
    case SET_FETCHING: {
      return {isLogin, isFetching: true};
    }
    case SET_UNFETCHING: {
      return {isLogin, isFetching: false};
    }
  }
  return state;
}
