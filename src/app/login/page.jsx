'use client';

import React, { useEffect, useState } from 'react';
// import styles from './page.module.css';

function Example() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accounts, setAccounts] = useState({});

  async function fetchUserData() {
    if (localStorage.getItem('accounts')) {
      const data = JSON.parse(localStorage.getItem('accounts'));
      setAccounts(data);
    } else {
      const response = await fetch('/api/users');
      const allUsers = await response.json();
      const data = allUsers.users;
      setAccounts(data);
      localStorage.setItem('accounts', JSON.stringify(data));
      // eslint-disable-next-line no-console
      console.log('data', data);
    }
  }

  useEffect(
    () => {
      if (!accounts.length) {
        fetchUserData();
      }
    },
    [accounts],
  );

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitLog = (event) => {
    event.preventDefault();

    if (username === '' || password === '') {
      // eslint-disable-next-line no-alert
      alert('Input a username and/or password!!!');
    } else {
      let validEntries = false;
      for (let i = 0; i < accounts.length; i += 1) {
        if ((accounts[i].userName === username || accounts[i].email === username)
         && accounts[i].password === password) {
          validEntries = true;
        }
      }
      if (validEntries) {
        // eslint-disable-next-line no-alert
        alert('Login Successful!');
        window.location.href = '/profile';
      } else {
        // eslint-disable-next-line no-alert
        alert('Invalid username and/or password!');
      }
    }
  };
  return (
    <div>
      <form>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label name="username">Username or Email:</label>
        <input type="text" id="username" name="username" onChange={usernameChange} />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label name="pass">Password:</label>
        <input type="password" id="pass" name="pass" onChange={passwordChange} />
        {/* <input type="email" id="email" name="email" required />
        <input type="submit" value="Submit" /> */}
        <button type="submit" onClick={submitLog}>Submit</button>
      </form>

    </div>
  );
}

export default Example;
