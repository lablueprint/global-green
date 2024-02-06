import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import styles from './page.module.css';

function MultipleChoiceQuiz({
  question,
  options,
  correctAnswer,
  handleAnswer,
  selectedAnswer,
}) => {
  const [isCorrectAnswerChosen, setIsCorrectAnswerChosen] = useState(selectedAnswer === correctAnswer);
  const [isQuestionAttempted, setIsQuestionAttempted] = useState(false);
  const [selected, setSelected] = useState(selectedAnswer);

  useEffect(() => {
    setSelected(selectedAnswer);
    setIsCorrectAnswerChosen(selectedAnswer === correctAnswer);
  }, [selectedAnswer, correctAnswer]);

  function handleClick(option) {
    const isCorrect = option === correctAnswer;
    setSelected(option);
    setIsQuestionAttempted(true);
    setIsCorrectAnswerChosen(isCorrect);
    handleAnswer(isCorrect, option);
  }

  const determineBackgroundColor = (opt) => {
    if (selected === opt) {
      return opt === correctAnswer ? 'green' : 'red';
    } if (isQuestionAttempted && opt === correctAnswer) {
      return 'lightgreen';
    }
    return 'white';
  };

  return (
    <div>
      <p style={{ fontSize: '20px', color: 'black' }}>{question}</p>
      <div className={styles.choiceContainer}>
        {options.reduce((acc, option, index) => {
          if (index % 2 === 0) acc.push(options.slice(index, index + 2));
          return acc;
        }, []).map((optionPair) => (
          // Using the values of the options to generate a unique key for each row
          <div className={styles.choiceRow} key={optionPair.map((opt) => opt).join('-')}>
            {optionPair.map((opt) => (
              <button
                type="button"
                className={styles.choiceButton}
                key={opt}
                onClick={() => handleClick(opt)}
                disabled={isQuestionAttempted}
                style={{
                  margin: '5px',
                  padding: '10px 10px',
                  backgroundColor: determineBackgroundColor(opt),
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

MultipleChoiceQuiz.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string.isRequired,
  handleAnswer: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.string,
};

MultipleChoiceQuiz.defaultProps = {
  selectedAnswer: '',
};

export default MultipleChoiceQuiz;
