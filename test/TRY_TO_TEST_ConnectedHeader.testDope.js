import React from 'react';
import {shallow, mount} from 'enzyme';
import Header from '../public/components/Header/Header.jsx';
import {Provider} from 'react-redux';
import {getUserInfo} from "../public/actions/headerTracks";
import reducer from '../public/reducers/index';
import {applyMiddleware, createStore} from 'redux';
import {BrowserRouter} from "react-router-dom";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {getIsLogin} from "../public/actions/loginTracks";
import {Logout} from "../public/components/LoginLogout/Logout";


describe('Testing', () => {
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
  let store, wrapper;
  beforeEach(() => {
    store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
    wrapper = mount(<Provider store={store}><BrowserRouter><Header/></BrowserRouter></Provider>);
  });
  it('check Prop', () => {
    console.log(wrapper.instance().props.store.getState());
    store.dispatch(getIsLogin);
    wrapper.setProps({login: {isLogin: false}});
    console.log(wrapper.instance().props.store.getState());
    expect(wrapper.find(Logout).length).toEqual(1);
    wrapper.find(Logout).simulate('click');
    console.log(wrapper.instance().props.store.getState());
  });
});
