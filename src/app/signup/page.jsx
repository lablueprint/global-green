'use client';

import React, { useState, useEffect } from 'react';
// import styles from './page.module.css';

function Example() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emails, setEmails] = useState('');
  const [userName, setUserName] = useState('');

  async function fetchUserData() {
    if (localStorage.getItem('emails')) {
      const data = JSON.parse(localStorage.getItem('emails'));
      setEmails(data);
    } else {
      const response = await fetch('/api/users');
      const allUsers = await response.json();
      const data = Array.from(allUsers.users, (user) => user.email);
      setEmails(data);
      localStorage.setItem('emails', JSON.stringify(data));
      // eslint-disable-next-line no-console
      console.log('data', data);
    }
  }
  useEffect(
    () => {
      if (!emails) {
        fetchUserData();
      }
    },
    [emails],
  );

  const firstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const userNameChange = (e) => {
    setUserName(e.target.value);
  };
  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitLog = (event) => {
    event.preventDefault();
    let validEntries = true;

    // check if email already exists
    if (emails.includes(email)) {
      // eslint-disable-next-line no-alert
      alert('Email already exists!');
      validEntries = false;
      return;
    }
    // for email input format validation
    const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    if (firstName === '' || lastName === '') {
      // eslint-disable-next-line no-alert
      alert('Name is required!');
      validEntries = false;
      return;
    }
    if (!regex.test(email)) {
      // eslint-disable-next-line no-alert
      alert('Invalid email!');
      validEntries = false;
      return;
    }
    if (password === '') {
      // eslint-disable-next-line no-alert
      alert('Password is required!');
      validEntries = false;
      return;
    }
    if (password.length < 8) {
      // eslint-disable-next-line no-alert
      alert('Password needs to be at least 8 characters');
      validEntries = false;
      return;
    }
    if (confirmPassword !== password) {
      // eslint-disable-next-line no-alert
      alert('Password and confirm password fields need to match');
      validEntries = false;
      return;
    }
    if (validEntries) {
      const data = {
        firstName,
        lastName,
        email,
        password,
        userName,
        rank: 0,
        courses: [], // here we can put default starter courses
        badges: [],
      };
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 201) {
          // eslint-disable-next-line no-alert
          alert('Account created!');
          window.location.href = '/profile';
        } else {
          // eslint-disable-next-line no-alert
          alert('Error creating account!');
        }
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error:', error);
      });
    }
  };
  return (
    <div>
      <form>
        <label htmlFor="firstName">
          First name:
          {' '}
          <br />
          <input type="text" id="firstName" name="firstName" onChange={firstNameChange} />
        </label>
        <br />
        <label htmlFor="lastName">
          Last name:
          <br />
          <input type="text" id="lastName" name="lastName" onChange={lastNameChange} />
          <br />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label type="eAddress">
          Email Address:
          <br />

          <input type="email" id="email" name="email" onChange={emailChange} />
          <br />
        </label>
        <label htmlFor="userName">
          Username:
          <br />
          <input type="text" id="userName" name="userName" onChange={userNameChange} />
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
