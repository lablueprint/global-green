import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import styles from './page.module.css';

function MultipleChoiceQuiz({
  question,
  options,
  correctAnswer,
  handleAnswer,
  selectedAnswer,
}) {
  const [isCorrectAnswerChosen, setIsCorrectAnswerChosen] = useState(selectedAnswer === correctAnswer);
  const [isQuestionAttempted, setIsQuestionAttempted] = useState(false);
  const [selected, setSelected] = useState(selectedAnswer);

  useEffect(() => {
    setSelected(selectedAnswer);
    setIsCorrectAnswerChosen(selectedAnswer === correctAnswer);
  }, [selectedAnswer, correctAnswer]);

  const handleClick = (option) => {
    const isCorrect = option === correctAnswer;
    setSelected(option);
    setIsQuestionAttempted(true);
    setIsCorrectAnswerChosen(isCorrect);
    handleAnswer(isCorrect, option);
  };

  return (
    <div>
      <p style={{ fontSize: '20px', color: 'black' }}>{question}</p>
      <div className={styles.choiceContainer}>
        {options.reduce((acc, option, index) => {
          if (index % 2 === 0) acc.push(options.slice(index, index + 2));
          return acc;
        }, []).map((optionPair, index) => (
          <div className={styles.choiceRow} key={index}>
            {optionPair.map((opt, idx) => (
              <button
                className={styles.choiceButton}
                key={idx}
                onClick={() => handleClick(opt)}
                disabled={isQuestionAttempted}
                style={{
                  margin: '5px',
                  padding: '10px 10px',
                  backgroundColor: selected === opt
                    ? (opt === correctAnswer ? 'green' : 'red')
                    : (isQuestionAttempted && opt === correctAnswer ? 'lightgreen' : 'white'),
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
