'use client';

import React, { useState } from 'react';
// import styles from './page.module.css';

function Example() {
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  let accounts = {};
  accounts = {
    fname: 'testing',
    lname: 'testing',
    username: 'testing',
    password: 'testing',
    confirmPassword: 'testing',

  };
  const fnameChange = (e) => {
    setFName(e.target.value);
  };
  const lnameChange = (e) => {
    setLName(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  const usernameChange = (e) => {
    setUsername(e.target.value);
  };
  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitLog = (event) => {
    event.preventDefault();
    let validEntries = true;
    const email = document.getElementById('email').value;

    // for email input format validation
    const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    if (fname === '' || lname === '') {
      // eslint-disable-next-line no-alert
      alert('Name is required!');
      validEntries = false;
    }
    if (!regex.test(email)) {
      // eslint-disable-next-line no-alert
      alert('Invalid email!');
      validEntries = false;
    }
    if (password === '') {
      // eslint-disable-next-line no-alert
      alert('Password is required!');
      validEntries = false;
    }
    if (password.length < 8) {
      // eslint-disable-next-line no-alert
      alert('Password needs to be at least 8 characters');
      validEntries = false;
    }
    if (confirmPassword !== password) {
      // eslint-disable-next-line no-alert
      alert('Password and confirm password fields need to match');
      validEntries = false;
    }

    if (validEntries === true) {
      accounts.fname = fname;
      accounts.lname = lname;
      accounts.username = username;
      accounts.password = password;
      console.log(accounts);
    }
  };
  return (
    <div>
      <form>
        <label htmlFor="fname">
          First name:
          {' '}
          <br />
          <input type="text" id="fname" name="fname" onChange={fnameChange} />
        </label>
        <br />
        <label htmlFor="lname">
          Last name:
          <br />
          <input type="text" id="lname" name="lname" onChange={lnameChange} />
          <br />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label type="eAddress">
          Email Address:
          <br />

          <input type="email" id="email" name="email" onChange={usernameChange} required />
          <br />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label name="pass">
          Password:
          <br />
          <input type="password" id="pass" name="pass" onChange={passwordChange} />
          <br />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label name="confirmPass">
          Confirm Password:
          <br />
          <input type="password" id="confirmPass" name="confirmPass" onChange={confirmPasswordChange} />
          <br />
        </label>

        <input type="submit" value="Submit" onClick={submitLog} />
        <br />
      </form>
    </div>
  );
}
export default Example;
