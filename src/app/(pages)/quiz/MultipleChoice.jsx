import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import styles from './page.module.css';

function MultipleChoice({
  question,
  options,
  // eslint-disable-next-line no-unused-vars
  correctAnswer,
  // eslint-disable-next-line no-unused-vars
  handleAnswer,
  selectedAnswer,
  isAttempted,
  onCheckAnswer, // Add a new prop for handling answer check
}) {
  const [selected, setSelected] = useState(selectedAnswer);

  useEffect(() => {
    setSelected(selectedAnswer);
  }, [selectedAnswer]);

  function handleSelect(option) {
    setSelected(option);
  }

  return (
    <div>
      <p style={{ fontSize: '20px', color: 'black' }}>{question}</p>
      <div className={styles.choiceContainer}>
        {options.map((option) => (
          <button
            type="button"
            className={styles.choiceButton}
            key={option}
            onClick={() => handleSelect(option)}
            disabled={isAttempted} // Disable options if already attempted
            style={{
              backgroundColor: selected === option ? 'lightgrey' : 'white',
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {isAttempted && (
        <div style={{ marginTop: '10px' }}>
          Incorrect!

          Selected Answer:
          {selected}
          I do not like coding
        </div>
      )}
      {/* eslint-disable-next-line max-len */}
      <button type="button" onClick={() => onCheckAnswer(selected)} disabled={!selected || isAttempted}>Check</button>
    </div>
  );
}

MultipleChoice.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string.isRequired,
  handleAnswer: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.string,
  onCheckAnswer: PropTypes.func.isRequired,
  isAttempted: PropTypes.bool,

};

MultipleChoice.defaultProps = {
  selectedAnswer: '',
  isAttempted: false,
};

export default MultipleChoice;
