'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

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

  return (
    <>
    <div className={styles.topLeft}> 
      <Image
          src="/logo.svg"
          width={50}
          height={50}
        />
        <span>Global Green Scholar</span>
    </div>    
    <div className={styles.forgotPasswordContainer}>
      <h1 className={styles.title}>Forgot Password?</h1>
      <p className={styles.resetInstructions}>We will send you reset instructions</p>
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
              placeholder="Enter your email address"
          />
        </label>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>Reset Password</button>
        </div>
        <a href="/login" className={styles.backToLogin}> Back to login</a>
      </form>
    </div>
    </>
  );
}

export default ForgotPassword;
