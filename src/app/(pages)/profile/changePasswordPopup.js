import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

function changePasswordPopup({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.passPopUp}>
        <div className={styles.passPopClose} onClick={onClose}> x </div>
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
          type="text"
          className={styles.passInput}
          defaultValue="Current Password"
        />
        <div className={styles.passPopText}>
          Enter a new password
        </div>
        <input
          type="text"
          className={styles.passInput}
          defaultValue="New Password"
        />
        <div className={styles.passPopText}>
          Confirm your new password
        </div>
        <input
          type="text"
          className={styles.passInput}
          defaultValue="Confirm Password"
        />
        <div className={styles.passPopBottom}>
          <div className={styles.passPopButton} onClick={onClose}>Cancel</div>
          <div className={styles.passPopButton}>Change Password</div>
        </div>
      </div>
    </div>
  );
}

export default changePasswordPopup;
