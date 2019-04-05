import  {combineReducers} from "redux";
import {reducer as formReducer} from 'redux-form';


import api from './api';
import user from './user';
import error from './error';

import departments from './departments'
import employees from './employees'
//todo redux-form
//todo redux-thunk DONE
export default combineReducers({
  api,
  user,
  departments,
  employees,
  error,
  form: formReducer
})
