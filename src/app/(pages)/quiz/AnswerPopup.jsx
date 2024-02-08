import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import styles from './popup.module.css'; // Assuming you have styles for the popup

function AnswerPopup({ message, onClose }) {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <p>{message}</p>
        <button className={styles.popButton} type="button" onClick={onClose}>
          <button type="button" onClick={onClose}>
            Continue
          </button>
        </button>
      </div>
    </div>
  );
}

export default AnswerPopup;

AnswerPopup.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.bool.isRequired,
};
