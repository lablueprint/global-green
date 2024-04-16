import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaRegCheckCircle } from 'react-icons/fa';
import styles from './page.module.css';

function passwordPopup({ onClose, userPassword }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [canChange, setCanChange] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  useEffect(() => {
    if (currentPassword && newPassword && confirmPassword) {
      if (newPassword === confirmPassword && newPassword !== userPassword) {
        if (newPassword.length >= 15 || (newPassword.length >= 8 && /\d/.test(newPassword) && /[a-zA-Z]/.test(newPassword))) {
          setCanChange(true);
        }
      }
    } else {
      setCanChange(false);
    }
  }, [newPassword, confirmPassword]);

  const handleChangePassword = () => {
    setSuccess(true);
  };

  return (
    <div className={styles.overlay}>
      {success ? (
        <div className={styles.passPopUp}>
          <div className={styles.passPopClose} onClick={onClose}> x </div>
          <div className={styles.pencil}>
            <FaRegCheckCircle />
          </div>
          <div className={styles.passPopTitle}>Password Changed</div>
          <div className={styles.passPopSub}>
            {' '}
            Use a password at least 15 letters long,
            or at least 8 characters long with both letters and numbers.
            {' '}
          </div>
          <div className={styles.passPopBottom}>
            <div
              className={styles.done}
              onClick={onClose}
            >
              Done
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.passPopUp}>
          <div className={styles.passPopClose} onClick={onClose}> x </div>
          <div className={styles.pencil}>
            <FaPencilAlt />
          </div>
          <div className={styles.passPopTitle}>Change Password</div>
          <div className={styles.passPopSub}>
            {' '}
            Use a password at least 15 letters long,
            or at least 8 characters long with both letters and numbers.
            {' '}
          </div>
          <div className={styles.passPopText}>
            Enter your current password
          </div>
          <input
            type="password"
            className={styles.passInput}
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            placeholder="Current Password"
          />
          <div className={styles.passPopText}>
            Enter a new password
          </div>
          <input
            type="password"
            className={styles.passInput}
            onChange={handleNewPasswordChange}
            placeholder="New Password"

          />
          <div className={styles.passPopText}>
            Confirm your new password
          </div>
          <input
            type="password"
            className={styles.passInput}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm Password"

          />
          <div className={styles.passPopBottom}>
            <div
              className={styles.passPopButton}
              onClick={onClose}
            >
              Cancel
            </div>
            <div
              className={`${styles.passPopButton} ${canChange ? styles.enabled : styles.disabled}`}
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

export default passwordPopup;
