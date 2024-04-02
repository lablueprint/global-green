'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { signIn, useSession } from 'next-auth/react';

function Example() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = React.useState(false);
  const { data: session } = useSession();

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async (provider) => {
    // Call signIn function from next-auth, passing the provider name
    signIn(provider).catch((error) => {
      alert(error.error);
      console.error('Login error', error);
    });
  };
  const submitLog = (event) => {
    event.preventDefault();

    if (userName === '' || password === '') {
      // eslint-disable-next-line no-alert
      alert('Input a username and/or password!!!');
    } else {
      // onLogin();
      signIn('credentials', {
        username: userName,
        password,
        callbackUrl: '/profile',
      }).catch((error) => {
        alert(error.error);
        console.error('Login error', error);
      });
    }
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
        <input
          type="text"
          id="username"
          name="username"
          onChange={usernameChange}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label name="pass">Password:</label>
        <input
          type="password"
          id="pass"
          name="pass"
          onChange={passwordChange}
        />
        {/* <input type="email" id="email" name="email" required />
        <input type="submit" value="Submit" /> */}
        <button type="submit" onClick={submitLog}>
          Submit
        </button>
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
