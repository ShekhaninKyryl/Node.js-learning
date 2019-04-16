import React from 'react';
import {shallow} from 'enzyme';

import Header from '../public/components/Header/Header.jsx';
import Logout from '../public/components/LoginLogout/Logout.jsx';
import configureStore from 'redux-mock-store'
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';

const initialState = {
  api: {
    isLogin: false
  },
  user: {
    id: 0,
    name: 'Guest',
    email: ''
  }
};
const mockStore = configureStore();
let store;
let header;
let logout;

beforeEach(() => {
  store = mockStore(initialState);
  header = shallow(<Provider store={store}><Router><Header/></Router></Provider>);
});

it('isLogin - false', () => {
  expect(header.render()).toMatchSnapshot();
  //expect(header.render()).toEqual(true);
});

it('isLogin - true', () => {
  const initialState = {
    api: {
      isLogin: true
    },
    user: {
      id: 1,
      name: '1',
      email: '1@1.com'
    }
  };
  store = mockStore(initialState);
  header = shallow(<Provider store={store}><Router><Header/></Router></Provider>);

  expect(header.render()).toMatchSnapshot();
});
