'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';
import SignInLogo from '@/app/components/logos/signInLogo';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { data: session } = useSession();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('api/users/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 400) {
        alert('User not found');
        return;
      }

      const data = await response.json();
      console.log(data.message);

      if (response.ok) {
        window.location.href = '/login';
        alert('Email sent');
      }
    } catch (error) {
      console.log('Error: ', error);
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
    <div className={styles.overallContainer}>
      <div className={styles.topLeft}>
        <SignInLogo />
      </div>
      <div className={styles.pageContent}>
        <div className={styles.forgotPasswordContainer}>
          <div className={styles.contentText}>
            <h1 className={styles.title}>Forgot Password?</h1>
            <div className={styles.resetInstructions}>
              We will send you reset instructions
            </div>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="email" className={styles.label}>
              <div className={styles.email}> Email</div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className={styles.input}
              />
            </label>
          </form>
          <div>
            <button type="submit" className={styles.submitButton}>
              Reset Password
            </button>
            <a href="/login" className={styles.backToLogin}>
              {' '}
              Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
