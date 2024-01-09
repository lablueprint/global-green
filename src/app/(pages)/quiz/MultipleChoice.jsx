import React from 'react';
import styles from './page.module.css';

function MultipleChoiceQuiz({ question, options, handleAnswer }) {
  return (
    <div>
      <p>{question}</p>
      <div className={styles.options}>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            style={{ margin: '5px', padding: '20px 30px' }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MultipleChoiceQuiz;
