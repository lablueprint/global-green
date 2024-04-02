'use client';
import React, { useState } from 'react';
import styles from './page.module.css';

function Example() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');

  const OnSignup = async () => {
    // signup function. This will call upon /api/users/signup
    // and send the username and password to the backend
    // if the signup is successful, redirect to the profile page
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName, password, firstName, lastName, email,
        }),
      });
      const data = await response.json();

      if (data.error) {
        // eslint-disable-next-line no-alert
        alert(data.error);
        throw new Error(data.error);
      } else {
        // log the user in after signing up
        const loginResponse = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName, password }),
        });
        const loginData = await loginResponse.json();

        if (loginData.error) {
          // eslint-disable-next-line no-alert
          alert(loginData.error);
          throw new Error(loginData.error);
        } else {
          // redirect to the profile page
          window.location.href = '/profile';
        }

        // eslint-disable-next-line no-console
        console.log('Login success', loginResponse.data);
      }

      // eslint-disable-next-line no-console
      console.log('Signup success', response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Signup failed', error.message);
    }
  };

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
      OnSignup();
    }
  };
  return (
    <div className={styles.exampleContainer}>
      <div className={styles.exampleImageContainer}>
        <img
          src="signupimage.png"
          alt= "Sign Up Image"
          width={600}
          height={600}
          className={styles.alignImage} />
      </div>
      <form className={styles.exampleForm} onSubmit={submitLog}>
        <h2 className={styles.exampleTitle}>Create your account</h2>
        <label htmlFor="firstName" className={styles.exampleLabel}>
          First name:
          {' '}
          <br />
          <input type="text" id="firstName" name="firstName" className={styles.exampleInput} onChange={firstNameChange} placeholder="First Name" />
        </label>
        <br />

        <label htmlFor="lastName" className={styles.exampleLabel}>
          Last name:
          <br />
          <input type="text" id="lastName" name="lastName" className={styles.exampleInput} onChange={lastNameChange} placeholder="Last Name" />
          <br />
        </label>

        <label htmlFor="email" className={styles.exampleLabel}>
          Email Address:
          <br />
          <input type="email" id="email" name="email" className={styles.exampleInput} onChange={emailChange} placeholder="Enter Your Email Address" />
          <br />
        </label>

        <label htmlFor="userName" className={styles.exampleLabel}>
          Username:
          <br />
          <input type="text" id="userName" name="userName" className={styles.exampleInput} onChange={userNameChange} placeholder="Enter Your Username"/>
          <br />
        </label>

        <label htmlFor="pass" className={styles.exampleLabel}>
          Password:
          <br />
          <input type="password" id="pass" name="pass" className={styles.exampleInput} onChange={passwordChange} placeholder="Enter Your Password" />
          <br />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="confirmPass" className={styles.exampleLabel}>
          Confirm Password:
          <br />
          <input type="password" id="confirmPass" name="confirmPass" className={styles.exampleInput} onChange={confirmPasswordChange} placeholder="Confirm Your Password"/>
          <br />
        </label>

        <button type="submit" onClick={submitLog} className={styles.exampleSubmitButton}>Submit</button>
      </form>
    </div>
  );
}
export default Example;
