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
        {options.reduce((acc, option, index) => {
          if (index % 2 === 0) acc.push(options.slice(index, index + 2));
          return acc;
        }, []).map((optionPair, pairIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className={styles.choiceRow} key={pairIndex}>
            {optionPair.map((option) => (
              <button
                type="button"
                className={styles.choiceButton}
                key={option} // Fixed to use option instead of optionPair.map
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
        ))}
      </div>
      {isAttempted && (
        <div style={{ marginTop: '10px' }}>
          Incorrect! Selected Answer:
          {selected}
        </div>
      )}
      <button
        type="button"
        onClick={() => onCheckAnswer(selected)}
        disabled={!selected || isAttempted}
        style={{ marginTop: '10px' }} // Added to separate the button from the message
      >
        Check
      </button>
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
