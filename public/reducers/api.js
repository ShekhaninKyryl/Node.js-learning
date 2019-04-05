
const initialState = {
  isLogin: true,
  isFetching: false,
  departmentId: 0
};

const SET_LOGIN = 'SET_LOGIN';
const SET_LOGOUT = 'SET_LOGOUT';
const SET_FETCHING = 'SET_FETCHING';
const SET_UNFETCHING = 'SET_UNFETCHING';
const SET_DEPARTMENTID = 'SET_DEPARTMENTID';

export default function apiActions(state = initialState, action) {
  let {isLogin, isFetching, departmentId} = state;
  switch (action.type) {
    case SET_LOGIN: {
      return {...state, isLogin: true};
    }
    case SET_LOGOUT: {
      return {...state, isLogin: false};
    }
    case SET_FETCHING: {
      return {...state, isFetching: true};
    }
    case SET_UNFETCHING: {
      return {...state, isFetching: false};
    }
    case SET_DEPARTMENTID: {
      return {...state, departmentId: action.departmentId};
    }
  }
  return state;
}
