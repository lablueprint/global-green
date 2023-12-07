'use client';

// to do: password hidden and required username, password
import React, { useState } from 'react';
// import { bool } from 'prop-types';
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
      alert('Name is required!');
      validEntries = false;
    }
    if (!regex.test(email)) {
      alert('Invalid email!');
      validEntries = false;
    }
    if (password === '') {
      alert('Password is required!');
      validEntries = false;
    }
    if (password.length < 8) {
      alert('Password needs to be at least 8 characters');
      validEntries = false;
    }
    if (confirmPassword !== password) {
      alert('Password and confirm password fields need to match');
      validEntries = false;
    }
    //  if(password != confirmPassword || password.length < 8){
    // if(password.localeCompare(confirmPassword) != 0 || password.length < 8){
    //   alert("Password and confirm password fields need to match");
    //   validEntries = false;
    // }

    if (validEntries === true) {
      accounts.fname = fname;
      accounts.lname = lname;
      accounts.username = username;
      accounts.password = password;
      accounts.confirmPassword = confirmPassword;
      console.log(accounts);
    }
  };
  return (
    <div>
      <form>
        <label htmlFor="fname">First name:</label>
        {' '}
        <br />
        <input type="text" id="fname" name="fname" onChange={fnameChange} />
        <br />
        <label htmlFor="lname">Last name:</label>
        <br />
        <input type="text" id="lname" name="lname" onChange={lnameChange} />
        <br />
        <label type="eAddress">Email Address:</label>
        <br />

        <input type="email" id="email" name="email" required />
        <br />

        <label name="pass">Password:</label>
        <br />
        <input type="password" id="pass" name="pass" onChange={passwordChange} />
        <br />
        <label name="confirmPass">Confirm Password:</label>
        <br />
        <input type="password" id="confirmPass" name="confirmPass" onChange={confirmPasswordChange} />
        <br />
        {/* <input type="submit" value="Submit" onClick={submitLog} /><br></br> */}
        <input type="submit" value="Submit" onClick={submitLog} />
        <br />
      </form>
    </div>
  );
}
export default Example;
