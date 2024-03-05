import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import styles from './page.module.css';

function MultipleChoice({
  question,
  options,
  selectedAnswer = '',
  isCorrect, // Added prop to indicate if the answer is correct
  isAttempted = false,
  onOptionSelect,
}) {
  const [selected, setSelected] = useState(selectedAnswer);

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
            {optionPair.map((option) => {
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
                    outline: selected === option ? '3px solid #1D594B' : '1.80px solid lightgrey',
                    backgroundColor: backgroundColor,
                    color: isAttempted ? 'black' : 'inherit', // Keep text color black after disabling
                  }}
                >
                  {option}
                </button>
              );
            })}
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