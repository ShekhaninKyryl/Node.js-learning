import React from 'react';
import {shallow, mount} from 'enzyme';
import {Header} from '../public/components/Header/Header.jsx';
import {BrowserRouter} from "react-router-dom";
import renderer from 'react-test-renderer'
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import Logout from "../public/components/LoginLogout/Logout";

describe('header testing', () => {
  let header;
  let initialState;


  beforeEach(() => {
    initialState = {
      login: {
        isLogin: false
      },
      user: {
        id: 0,
        name: 'Guest',
        email: ''
      },
      getUser: jest.fn(),
      logout: jest.fn()
    };

    header = mount(<BrowserRouter><Header  {...initialState}/></BrowserRouter>);
  });

  it('init props', () => {
    expect(header.html()).not.toMatch('Logout');
  });
  it('set isLogin true', () => {
    header.setProps({
      children: React.cloneElement(header.props().children, {login: {isLogin: true}}),
    });
    expect(header.html()).toMatch('Logout');
  });


  it('getUser init called times', () => {
    expect(initialState.getUser).toHaveBeenCalledTimes(1);
  });
  it('logout simulate click', () => {
    header.setProps({
      children: React.cloneElement(header.props().children, {login: {isLogin: true}}),
    });
    header.find(Logout).simulate('click');
    expect(initialState.logout).toHaveBeenCalledTimes(1);
  });

  it('check props header INIT', () => {
    expect(header.find(Header).props()).toEqual({...initialState});
  });
  it('check props logout INIT - Logout Disabled', () => {
    expect(header.find(Logout).length).toBe(0);
  });
  it('check props logout after INIT - Logout Enabled', () => {
    header.setProps({
      children: React.cloneElement(header.props().children, {login: {isLogin: true}}),
    });
    expect(header.find(Logout).props()).toEqual({logout: initialState.logout});
  });
});
