'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

function Example() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    // login function. This will call upon /api/users/login
    // and send the username and password to the backend
    // if the login is successful, redirect to the profile page
    try {
      setLoading(true);
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });
      const data = await response.json();

      if (data.error) {
        // eslint-disable-next-line no-alert
        alert(data.error);
        throw new Error(data.error);
      } else {
        // redirect to the profile page
        window.location.href = '/profile';
      }

      // eslint-disable-next-line no-console
      console.log('Login success', response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitLog = (event) => {
    event.preventDefault();

    if (userName === '' || password === '') {
      // eslint-disable-next-line no-alert
      alert('Input a username and/or password!!!');
    } else {
      onLogin();
    }
  };
  return (
    <div className={styles.exampleContainer}>
      <form className={styles.exampleForm}>
      <h1 className={styles.exampleTitle}>Sign In</h1>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.exampleLabel}>Username or Email:</label>
          <input type="text" id="username" name="username" onChange={usernameChange} className={styles.exampleInput} placeholder="Enter your username" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="pass" className={styles.exampleLabel}>Password:</label>
          <input type="password" id="pass" name="pass" onChange={passwordChange} className={styles.exampleInput} placeholder="Enter your password" />
        </div>
        <button type="submit" onClick={submitLog} className={styles.exampleSubmitButton}>Sign In</button>
      </form>
    </div>
  );
}

export default Example;