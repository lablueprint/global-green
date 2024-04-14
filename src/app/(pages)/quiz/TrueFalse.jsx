import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation

function TrueFalse({
  question,
  options,
  selectedAnswer,
  isAttempted,
  onOptionSelect, // Renamed from handleSelect for clarity
  isCorrect, // Add this prop to determine if the answer is correct
}) {
  const [selected, setSelected] = useState(selectedAnswer); // Define the selected state

  useEffect(() => {
    setSelected(selectedAnswer);
  }, [selectedAnswer]);

  function handleSelect(option) {
    onOptionSelect(option); // This will be provided by the Quiz component
  }

  return (
    <div>
      <p className={styles.questionText}>{question}</p>
      <div className={styles.choiceContainerTrueandFalse}>
        {options.map((option) => {
          let backgroundColor = 'white';
          if (isAttempted && selected === option) {
            backgroundColor = isCorrect ? '#D5EDE0' : '#FFF3C0'; // correct, incorrect
          }
          return (
            <button
              type="button"
              className={styles.choiceButton}
              key={option}
              onClick={() => handleSelect(option)}
              disabled={isAttempted}
              style={{
                outline: selected === option ? '3px solid #6DAAE0' : '1px solid lightgrey',
                backgroundColor: selected === option ? 'var(--Blue-20, #6DAAE0)' : '',
                backgroundImage: selected === option ? 'linear-gradient(0deg, rgba(255, 255, 253, 0.80) 0%, rgba(255, 255, 253, 0.80) 100%)' : '',
                color: isAttempted ? 'black' : 'inherit', // Keep text color black after disabling
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

TrueFalse.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedAnswer: PropTypes.string,
  isAttempted: PropTypes.bool,
  onOptionSelect: PropTypes.func.isRequired,
  isCorrect: PropTypes.bool, // Add the isCorrect prop type
};

export default TrueFalse;
