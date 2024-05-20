'use client';

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import styles from './page.module.css';

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
    if (session?.user) {
      if (!session.user.verified)
      {window.location.href = '/verifyemail';}
      else
      {window.location.href = '/profile';}
    }


  }, [session]);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.mainTitle}>Sign In</h1>
      <form className={styles.userForm} onSubmit={submitLog}>
  
        <label htmlFor="username" className={styles.userLabel}>Email:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userName}
          onChange={usernameChange}
          className={styles.userInput}
          placeholder="Email"
        />
  
        <label htmlFor="pass" className={styles.userLabel}>Password:</label>
        <input
          type="password"
          id="pass"
          name="pass"
          value={password}
          onChange={passwordChange}
          className={styles.userInput}
          placeholder="Password"
        />
        
        <a href="/forgot-password" className={styles.forgotPassword}>
          Forgot Password?
        </a>
  
        <button 
          type="submit" 
          className={styles.submitButton}
        >
          Sign in
        </button>
      </form>
  
      <p className={styles.signUpPrompt}>
        Don’t have an account? <a href="/signup" className={styles.signUpLink}>Create an account</a>
      </p>
      
      <hr className={styles.divider} />
  
      <button 
        type="button" 
        className={styles.googleButton}
        onClick={() => login('google')}
      >
        Sign in with Google
      </button>
    </div>
  );  
}

export default Example;
