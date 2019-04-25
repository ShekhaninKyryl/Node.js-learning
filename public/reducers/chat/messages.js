import {
  CHAT_GET_MESSAGE,
  CHAT_SEND_MESSAGE,
  CLEAR_MESSAGES
} from '../actionsList';

const initialState = [];

export default function apiMessages(state = initialState, action) {
  let {type, messages, message} = action;
  switch (type) {
    case CHAT_GET_MESSAGE:
    case CHAT_SEND_MESSAGE:{
      return [
        ...state,
        message
      ]
    }
    case CLEAR_MESSAGES: {
      return []
    }
    default: {
      return state
    }
  }
}

