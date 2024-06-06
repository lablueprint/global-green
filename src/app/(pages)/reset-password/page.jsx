'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState('');
  const [canChange, setCanChange] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }

    if (newPassword === confirmPassword) {
      if (newPassword.length >= 15 || (newPassword.length >= 8 && /\d/.test(newPassword) && /[a-zA-Z]/.test(newPassword))) {
        setCanChange(true);
      } else {
        setCanChange(false);
      }
    } else {
      setCanChange(false);
    }
  }, [newPassword, confirmPassword]);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('api/users/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });
      console.log(response);
      if (response.status === 400) {
        alert('User not found');
        return;
      }
      if (response.status === 403) {
        alert('Token expired');
        return;
      }

      const data = await response.json();
      console.log(data.message);

      if (response.ok) {
        window.location.href = '/profile';
      }
      alert('Got it');
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <>
      <div className={styles.topLeft}>
        <Image src="/logo.svg" width={50} height={50} />
        <span>Global Green Scholar</span>
      </div>
      <div className={styles.forgotPasswordContainer}>
        <h1 className={styles.title}>Reset Password</h1>
        <p className={styles.resetInstructions}>Please enter your new password</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="new-password" className={styles.label}>
            <div className={styles.labelNames}>Password:</div>
            <div className={styles.passwordContainer}>
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="new-password"
                name="new-password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className={styles.input}
                placeholder="Password"
              />
              <FontAwesomeIcon
                icon={showNewPassword ? faEyeSlash : faEye}
                className={styles.passwordIcon}
                onClick={toggleNewPasswordVisibility}
              />
            </div>
          </label>
          <label htmlFor="confirm-password" className={styles.label}>
            <div className={styles.labelNames}>Confirm Password:</div>
            <div className={styles.passwordContainer}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={styles.input}
                placeholder="Confirm Password"
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className={styles.passwordIcon}
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </label>
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={`${styles.submitButton} ${canChange ? styles.enabledButton : styles.disabledButton}`}
            >
              Reset Password
            </button>
          </div>
          <a href="/login" className={styles.backToLogin}> Back to login</a>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
