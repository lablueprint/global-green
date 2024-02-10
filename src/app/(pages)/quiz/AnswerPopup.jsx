import React from 'react';
import PropTypes from 'prop-types';
import styles from './popup.module.css';

function AnswerPopup({ message, onClose }) {
  return (
    <>
        <div>{message}</div>
        <button type="button" onClick={onClose}>
          Continue
        </button>
    </>

  );
}

export default AnswerPopup;

AnswerPopup.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
