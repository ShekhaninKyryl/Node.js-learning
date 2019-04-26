import React from 'react';
import {shallow, mount} from 'enzyme';

import ChatMessages from "../public/components/Chat/ChatMessages";

require('regenerator-runtime/runtime');

describe('header testing', () => {
  let componentMessages;
  let initialState;
  let user = {
    "id": 1,
    "name": "user1",
    "email": "1@1.com"
  };
  let users = [
    {
      "id": 1,
      "name": "user1",
      "pay": 1000,
      "email": "1@1.com",
      "department": 1
    },
    {
      "id": 2,
      "name": "user2",
      "pay": 100,
      "email": "2@2.com",
      "department": 30
    },
  ];
  let messages = [
    {
      "text": "i`m User2",
      "user": "1"
    },
    {
      "text": "i`m User2",
      "user": "2"
    }
  ];
  let joinToRoom;


  beforeEach(() => {
    joinToRoom = jest.fn();
    componentMessages = mount(
      <ChatMessages
        users={users}
        user={user}
        messages={messages}
        joinToRoom={joinToRoom}/>);
  });

  it('init', () => {
    expect(componentMessages.length).toBe(1);
  });
  it('have 2 message', () => {
    expect(componentMessages.find('.chat-one-message').length).toBe(2);
  });
  it('have 1 user`s message', () => {
    expect(componentMessages.find('.chat-one-message-my').length).toBe(1);
  });

  it('change user to unsender and check my-message', () => {
    let user = {
      "id": -1,
      "name": "user1",
      "email": "1@1.com"
    };
    componentMessages.setProps({user});
    expect(componentMessages.find('.chat-one-message-my').length).toBe(0);
  });

  it('do show is a user name and text', () => {
    let text = componentMessages.text();
    for (let i = 0; i < messages.length; i++) {
      let userId = messages[i].user;
      let user = users.find(u => +u.id === +userId ? u : false);
      expect(text).toMatch(user.name);
      expect(text).toMatch(messages[i].text);
    }
  });
  it('do show is a removed user name and text', () => {
    let users = [...users];
    users.pop();
    componentMessages.setProps({users: users});
    let text = componentMessages.text();
    for (let i = 0; i < messages.length; i++) {
      let userId = messages[i].user;
      let user = users.find(u => +u.id === +userId ? u : false);
      expect(text).toMatch(user ? user.name : 'removedUser');
      expect(text).toMatch(messages[i].text);
    }
  });
  it('join room simulate click', () => {
    componentMessages.find('.chat-message-user').at(0).simulate('click');
    expect(joinToRoom).toHaveBeenCalledTimes(1);
  });

});
