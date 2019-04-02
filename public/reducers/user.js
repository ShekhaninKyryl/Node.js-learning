const initialState = {
  id: 0,
  name: 'Guest',
  email: ''
};

const SET_USER = 'SET_USER';

export default function apiUser(state = initialState, action) {
  let {id, name, email} = state;
  switch (action.type) {
    case SET_USER: {
      return {id, name, email};
    }
  }
  return state;
}
