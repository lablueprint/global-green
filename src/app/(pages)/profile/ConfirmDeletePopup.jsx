import React from 'react';
import styles from './page.module.css';

const ConfirmDeletePopup = ({ onClose, onConfirm }) => (
  <div className={styles.overlay}>
    <div className={styles.passPopUp}>
      <h1>Confirm Account Deletion</h1>
      <p>
        Are you sure you want to delete your account? <br /> This action cannot
        be undone.
      </p>
      <div className={styles.buttons}>
        <button className={styles.passPopCancelButton} onClick={onClose}>
          Cancel
        </button>
        <button className={styles.deleteButton} onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmDeletePopup;
