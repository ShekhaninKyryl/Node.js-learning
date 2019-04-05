
const initialState = {};

const SET_ERROR = 'SET_ERROR';
const REFRESH_ERROR = 'REFRESH_ERROR';

export default function errorActions(state = initialState, action) {
  let {type, ...rest} = action;
  switch (type) {
    case SET_ERROR: {
      return rest;
    }
    case REFRESH_ERROR: {
      return {};
    }
  }
  return state;
}
