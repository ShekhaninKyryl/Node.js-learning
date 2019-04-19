import  {combineReducers} from "redux";
import {reducer as formReducer} from 'redux-form';


import api from './api';
import user from './user';
import error from './error';
import departments from './departments';
import employees from './employees';

import chat from './chat/chat';
import messages from './chat/messages';
import users from './chat/users';
import onlineusers from './chat/onlineusers';

export default combineReducers({
  api,
  user,
  departments,
  employees,
  chat,
  messages,
  users,
  onlineusers,
  error,
  form: formReducer
})
