import  {combineReducers} from "redux";

import api from './api';
import user from './user';

import departments from './departments'
import employees from './employees'
//todo redux-form
//todo redux-thunk
export default combineReducers({
  api,
  user,
  departments,
  employees
})
