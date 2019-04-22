import {
  SET_USER
} from './actionsList';


const initialState = {
  id: 0,
  name: 'Guest',
  email: ''
};


export default function User(state = initialState, action) {
  let {id, name, email} = action;
  switch (action.type) {
    case SET_USER: {
      return {id, name, email};
    }
    default : {
      return state
    }
  }
}
