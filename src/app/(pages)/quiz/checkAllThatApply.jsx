import React from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';

function Check({ question, options, selectedAnswers, onUpdateAnswer }) {
  const toggleOption = (option) => {
    if (selectedAnswers.includes(option)) {
      onUpdateAnswer(selectedAnswers.filter((answer) => answer !== option));
    } else {
      onUpdateAnswer([...selectedAnswers, option]);
    }
  };

  return (
    <div className={styles.questionContainer}>
      <h2>{question}</h2>
      {options.map((option, index) => (
        <button
          key={index}
          className={`${styles.optionButton} ${selectedAnswers.includes(option) ? styles.selected : ''}`}
          onClick={() => toggleOption(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

Check.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpdateAnswer: PropTypes.func.isRequired,
};

export default Check;
