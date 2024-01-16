'use client';
import React, { useEffect, useState } from 'react';
// import styles from './page.module.css';

function Example() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accounts, setAccounts] = useState({});

  useEffect(() => {
    if (!accounts.length) {
      async function fetchUserData() {
        if (localStorage.getItem('accounts')) {
          const data = JSON.parse(localStorage.getItem('accounts'));
          setAccounts(data);
          return;
        }
        else {
        const response = await fetch('/api/users');
        const all_users = await response.json();
        const data = all_users['users'];
        setAccounts(data);
        localStorage.setItem('accounts', JSON.stringify(data));
        console.log('data', data);
        }
      }
      fetchUserData();
    }
  }
  , [accounts]);

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitLog = (event) => {
    event.preventDefault();

    if (username === '' || password === '') {
      alert('Input a username and/or password!!!');
    } else {

      let validEntries = false;
      for (let i = 0; i < accounts.length; i++) {
        console.log(accounts[i].userName);
        if ((accounts[i].userName === username || accounts[i].email === username )&& accounts[i].password === password) {
          validEntries = true;
        }
      }
      if (validEntries) {
        alert('Login Successful!');
        window.location.href = '/profile';
      } else {
        alert('Invalid username and/or password!');
      }

    }
  };
  return (
    <div>
      <form>
        <label name="username">Username or Email:</label>
        <input type="text" id="username" name="username" onChange={usernameChange} />
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
