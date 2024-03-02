import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import styles from './page.module.css';

// In MultipleChoice.jsx
function MultipleChoice({
  question,
  options,
  selectedAnswer = '',
  isAttempted = false,
  onOptionSelect, // Renamed from handleSelect for clarity
}) {
  const [selected, setSelected] = useState(selectedAnswer); // Define the selected state

  useEffect(() => {
    setSelected(selectedAnswer);
  }, [selectedAnswer]);

  function handleSelect(option) {
    onOptionSelect(option); 
  }

  return (
    <div>
      <p className={styles.questionText}>
        {question}
      </p>
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
                  outline: selected === option ? '2px solid #1D594B' : '1px solid #D9D9D9',
                  backgroundColor: selected === option ? '#D5EDE0' : 'white',
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

MultipleChoice.propTypes = {
  onOptionSelect: PropTypes.func.isRequired, 
};

MultipleChoice.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedAnswer: PropTypes.string,
  isAttempted: PropTypes.bool,
};

export default MultipleChoice;