import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import styles from './page.module.css';

function MultipleChoice({
  question,
  options,
  selectedAnswer = '',
  isCorrect,
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
          if ((index) % 2 === 0) acc.push(options.slice(index, index + 2));
          return acc;
        }, []).map((optionPair, pairIndex) => (
          <div className={styles.choiceRow} key={pairIndex}>
            {optionPair.map((option) => {
              if (!option) return null;
              let backgroundColor = '';
              if (isAttempted && selected === option) {
                backgroundColor = isCorrect ? '#D5EDE0' : '#FFF3C0';
              }
              return (
                <button
                  type="button"
                  className={styles.choiceButton}
                  key={option}
                  onClick={() => handleSelect(option)}
                  disabled={isAttempted}
                  style={{
                    outline: selected === option ? '3px solid #6DAAE0' : '0px',
                    backgroundColor: selected === option ? 'var(--Blue-20, #6DAAE0)' : '',
                    backgroundImage: selected === option ? 'linear-gradient(0deg, rgba(255, 255, 253, 0.80) 0%, rgba(255, 255, 253, 0.80) 100%)' : '',
                    color: isAttempted ? 'black' : 'inherit',
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