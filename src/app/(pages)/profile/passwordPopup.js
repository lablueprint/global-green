import React, { useState, useEffect } from 'react';
import {
  FaPencilAlt,
  FaRegCheckCircle,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import Image from 'next/image';
import styles from './page.module.css';

function PasswordPopup({ onClose, userName }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [canChange, setCanChange] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const toggleShowCurrentPassword = () =>
    setShowCurrentPassword(!showCurrentPassword);

  useEffect(() => {
    if (currentPassword && newPassword && confirmPassword) {
      if (newPassword === confirmPassword && newPassword !== 'userPassword') {
        if (
          newPassword.length >= 15 ||
          (newPassword.length >= 8 &&
            /\d/.test(newPassword) &&
            /[a-zA-Z]/.test(newPassword))
        ) {
          setCanChange(true);
        }
      }
    } else {
      setCanChange(false);
    }
  }, [newPassword, confirmPassword]);

  const handleChangePassword = async () => {
    try {
      const response = await fetch('/api/users/me/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
        throw new Error(data.error);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      console.log('change password failed', error.message);
    }
  };

  return (
    <div className={styles.overlay}>
      {success ? (
        <div className={styles.passPopUp}>
          <div className={styles.passPopClose}>
            <Image
              src="/profile/close_btn.svg"
              width={24}
              height={24}
              alt="close-btn"
              onClick={onClose}
              className={styles.passPopCloseBtn}
            />
          </div>
          <div className={styles.pencil}>
            <FaRegCheckCircle />
          </div>
          <div className={styles.passPopTitle}>Password Changed</div>
          <div className={styles.passPopBottom}>
            <div className={styles.done} onClick={onClose}>
              Done
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.passPopUp}>
          <div className={styles.passPopClose}>
            <Image
              src="/profile/close_btn.svg"
              width={24}
              height={24}
              alt="close-btn"
              onClick={onClose}
              className={styles.passPopCloseBtn}
            />
          </div>
          <div className={styles.pencil}>
            <FaPencilAlt />
          </div>
          <div className={styles.passPopTitle}>Change Password</div>
          <div className={styles.passPopSub}>
            {' '}
            Use a password at least 15 letters long, or at least 8 characters
            long with both letters and numbers.{' '}
          </div>
          <div className={styles.passPopText}>Enter your current password</div>
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            className={styles.passInput}
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            placeholder="Current Password"
          />{' '}
          <div className={styles.passPopText}>Enter a new password</div>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              className={styles.passInput}
              onChange={handleNewPasswordChange}
              placeholder="New Password"
            />
          </div>
          <div className={styles.passPopText}>Confirm your new password</div>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              className={styles.passInput}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
            />
          </div>
          <div className={styles.passPopBottom}>
            <div className={styles.passPopCancelButton} onClick={onClose}>
              Cancel
            </div>
            <div
              className={`${styles.passPopButton} ${
                canChange ? styles.enabled : styles.disabled
              }`}
              onClick={canChange ? handleChangePassword : null}
            >
              Change Password
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PasswordPopup;
