import React from 'react';
import {shallow, mount} from 'enzyme';
import thunk from "redux-thunk";
import Header from '../public/components/Header/Header.jsx';
import Logout from '../public/components/LoginLogout/Logout.jsx';
import configureStore from 'redux-mock-store'
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import sinon from 'sinon';




const initialState = {
  login: {
    isLogin: false
  },
  user: {
    id: 0,
    name: 'Guest',
    email: ''
  }
};
const mockStore = configureStore([thunk]);
let store;
let provider;
let header;
let logout;


beforeEach(() => {

  store = mockStore(initialState);
  header = mount(<Provider store={store}><Router><Header/></Router></Provider>);
});


it('isLogin - false', () => {
  // sinon.spy(Header.prototype, 'componentDidMount');
  // expect(Header.prototype.componentDidMount).to.have.property('callCount', 1);
  expect(header.render()).toMatchSnapshot();
});

it('isLogin - true', () => {
  const initialState = {
    login: {
      isLogin: true
    },
    user: {
      id: 1,
      name: '1',
      email: '1@1.com'
    }
  };
  store = mockStore(initialState);
  header = mount(<Provider store={store}><Router><Header/></Router></Provider>);
  expect(header.render()).toMatchSnapshot();
});
