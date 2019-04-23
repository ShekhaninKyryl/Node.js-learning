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


// const initialState = {
//   login: {
//     isLogin: false
//   },
//   user: {
//     id: 0,
//     name: 'Guest',
//     email: ''
//   }
// };
// const mockStore = configureStore([thunk]);
// let store;
// let provider;
// let header;
// let logout;
//
// test('isLogin - true', () => {
//   const props = {
//     user: {
//       name: '123',
//       email: '1@1.com'
//     },
//     login: {
//       isLogin: true
//     },
//     getUser: function () {
//       return {
//         name: '1',
//         email: '1',
//         id: '1'
//       };
//     }
//   };
//   const header = shallow(<Header user={props.user}
//                                  login={props.login}
//                                  getUser={props.getUser}/>);
//   expect(header.contains(<Logout/>)).toEqual(true);
// });
//
// test('isLogin - false', () => {
//   const props = {
//     user: {
//       name: '123',
//       email: '1@1.com'
//     },
//     login: {
//       isLogin: false
//     },
//     getUser: function () {
//       return {
//         name: '1',
//         email: '1',
//         id: '1'
//       };
//     }
//   };
// const header = shallow(<Header user={props.user}
//                                login={props.login}
//                                getUser={props.getUser}/>);
// expect(header.contains(<Logout/>)).toEqual(false);
//   const spy = jest.spyOn(Header.prototype, 'componentDidMount');
//   const wrapper = mount(<Header {...props} />);
//   wrapper.instance().componentDidMount();
//   expect(spy).toHaveBeenCalled();
//
// });

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
    wrapper = mount(<Provider store={store}><BrowserRouter><Header/></BrowserRouter></Provider>).find(Header);
  });
  it('check Prop', () => {
    console.log(wrapper.instance(Header).props.store.getState());
    store.dispatch(getIsLogin);
    wrapper.setProps({login: {isLogin: false}});
    console.log(wrapper.instance(Header).props.store.getState());
    expect(wrapper.length).toEqual(1);
  });
});
