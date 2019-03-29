import React, {useState, useEffect} from 'react';
import Logout from './Logout.jsx';
import axios from "axios";


function Header(props) {
  let {
    login,
    logoutFn,
    getUser
  } = props;
  const [id, setId] = useState(0);
  const [name, setName] = useState('Guest');
  const [email, setEmail] = useState('');

  const IsLogout = (isLogout) => {
    let {logoutFn} = isLogout;
    if (logoutFn) {
      return (
        <Logout logoutFn={logoutFn}/>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    axios.get('/api/user')
      .then(response => {
        console.log('Get user :', response.data);
        let {name, email, id} = response.data;
        setId(id);
        setName(name);
        setEmail(email);
        getUser(true);
      })
      .catch(error => {
        setId(0);
        setName('Guest');
        setEmail('');
        getUser(false);
        console.log('Get user error:', error.response);
      });
  }, [login]);

  return (
    <div>
      <span>
      {`Hello ${name}. ${email ? 'email: ' + email : ''}`}
      </span>
      <span >
        <IsLogout logoutFn={logoutFn}/>
      </span>
    </div>
  )

}

export default Header;
