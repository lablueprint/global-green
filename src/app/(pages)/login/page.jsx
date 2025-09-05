'use client';

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';
import SignInLogo from '@/app/components/logos/signInLogo';
import GoogleLogo from '@/app/components/logos/googleLogo';

// WHY IS IT CALLED EXAMPLE HUUUUUUUUUH (pls change)
function Example() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { data: session } = useSession();

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async (provider) => {
    signIn(provider).catch((error) => {
      alert(error.error);
      console.error('Login error', error);
    });
  };

  const submitLog = (event) => {
    event.preventDefault();

    if (userName === '' || password === '') {
      alert('Input a username and/or password!!!');
    } else {
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
      if (!session.user.verified) {
        window.location.href = '/verifyemail';
      } else {
        window.location.href = '/landing';
      }
    }
  }, [session]);

  return (
    <section className={styles.pageContent}>
      <div className={styles.topLeft}>
        <SignInLogo />
      </div>
      <div className={styles.mainContainer}>
        <h1 className={styles.mainTitle}>Sign In</h1>
        <form className={styles.userForm} onSubmit={submitLog}>
          <label htmlFor="username" className={styles.userLabel}>
            Email:
          </label>
          <div className={styles.passwordContainer}>
            <input
              type="text"
              id="username"
              name="username"
              value={userName}
              onChange={usernameChange}
              className={styles.userInput}
            />
          </div>

          <label htmlFor="pass" className={styles.userLabel}>
            Password:
          </label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="pass"
              name="pass"
              value={password}
              onChange={passwordChange}
              className={styles.userInput}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className={styles.passwordIcon}
              onClick={togglePasswordVisibility}
            />
          </div>

          <a href="/forgot-password" className={styles.forgotPassword}>
            Forgot Password?
          </a>

          <button type="submit" className={styles.submitButton}>
            Sign in
          </button>
        </form>

        <p className={styles.signUpPrompt}>
          Don’t have an account?{' '}
          <a href="/signup" className={styles.signUpLink}>
            Create an account
          </a>
        </p>

        <hr className={styles.divider} />

        {/* <button
          type="button"
          className={styles.googleButton}
          onClick={() => login('google')}
        >
          <GoogleLogo />
          <span>Sign in with Google</span>
        </button> */}
      </div>
    </section>
  );
}

export default Example;
