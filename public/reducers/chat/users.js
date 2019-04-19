import {
  CHAT_GET_USERS
} from '../actionsList';

const initialState = [];

export default function apiChatUsers(state = initialState, action) {
  let {type, users} = action;
  switch (type) {
    case CHAT_GET_USERS: {
      return [
        ...users
      ]
    }
    default: {
      return state
    }
  }
}

