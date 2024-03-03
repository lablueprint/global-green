'use client';

import React, { useEffect, useState } from 'react';
// import styles from './page.module.css';
import { signIn, useSession } from 'next-auth/react';

function Example() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = React.useState(false);
  const { data: session } = useSession();

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

  const login = async (provider) => {
    // Call signIn function from next-auth, passing the provider name
    signIn(provider).catch((error) => {
      alert(error.error);
      console.error('Login error', error);
    });
  };

  useEffect(() => {
    if (session?.user?.verified) {
      window.location.href = '/profile';
    }
  }, [session]);

  return (
    <div>
      <h1>{loading ? 'Processing' : 'Login'}</h1>
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
      <p>
        Don't have an account?
        <a href="/signup">Sign Up</a>
      </p>
      <button type="button" onClick={() => login('google')}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Example;
