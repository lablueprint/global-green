import React from 'react';
import styles from './page.module.css';

const ConfirmDeletePopup = ({ onClose, onConfirm }) => (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <h1>Confirm Account Deletion</h1>
      <p>Are you sure you want to delete your account? <br/> This action cannot be undone.</p>
      <div className={styles.buttons}>
        <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
        <button className={styles.confirmButton} onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

export default ConfirmDeletePopup;
