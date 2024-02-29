import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import styles from './page.module.css';

// In MultipleChoice.jsx
function MultipleChoice({
  question,
  options,
  selectedAnswer,
  isAttempted,
  onOptionSelect, // Renamed from handleSelect for clarity
}) {
  const [selected, setSelected] = useState(selectedAnswer); // Define the selected state

  useEffect(() => {
    setSelected(selectedAnswer);
  }, [selectedAnswer]);

  // Updated to call onOptionSelect, which is now passed from Quiz component
  function handleSelect(option) {
    onOptionSelect(option); // This will be provided by the Quiz component
  }

  return (
    <div>
      <p style={{ fontSize: '17px', color: 'black' }}>{question}</p>
      <div className={styles.choiceContainer}>
        {options.reduce((acc, option, index) => {
          if (index % 2 === 0) acc.push(options.slice(index, index + 2));
          return acc;
        }, []).map((optionPair, pairIndex) => (
          <div className={styles.choiceRow} key={pairIndex}>
            {optionPair.map((option) => (
              <button
                type="button"
                className={styles.choiceButton}
                key={option}
                onClick={() => handleSelect(option)}
                disabled={isAttempted}
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
    </div>
  );
}

// Update PropTypes accordingly
MultipleChoice.propTypes = {
  // Correct propTypes definitions
  onOptionSelect: PropTypes.func.isRequired, // This replaces onCheckAnswer
};

// Update defaultProps if necessary


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