import React from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';

function Check({ question, options, selectedAnswers, onUpdateAnswer }) {
  const handleChange = (option) => {
    const newSelectedAnswers = selectedAnswers.includes(option)
      ? selectedAnswers.filter((answer) => answer !== option)
      : [...selectedAnswers, option];
    onUpdateAnswer(newSelectedAnswers);
  };

  return (
    <>
      <div className={styles.questionText}>
        <p>{question}</p>
      </div>
      <div className={styles.optionGridContainer}>
        {options.map((option, index) => (
          <label key={index} className={styles.optionLabel}>
            <input
              type="checkbox"
              name={`option-${index}`}
              value={option}
              checked={selectedAnswers.includes(option)}
              onChange={() => handleChange(option)}
              className={styles.optionCheckbox}
            />
            {option}
          </label>
        ))}
      </div>
    </>
  );
}

Check.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpdateAnswer: PropTypes.func.isRequired,
};

export default Check;
