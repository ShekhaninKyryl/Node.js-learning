import {
  SET_ERROR,
  REFRESH_ERROR
} from './actionsList';


const initialState = {};

export default function errorActions(state = initialState, action) {
  let {type, ...rest} = action;
  switch (type) {
    case SET_ERROR: {
      return rest;
    }
    case REFRESH_ERROR: {
      return {};
    }
    default: {
      return state;
    }
  }
}
