import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

function MultipleChoiceQuiz({
  question, options, correctAnswer, handleAnswer, selectedAnswer
}) {
  const [isCorrectAnswerChosen, setIsCorrectAnswerChosen] = useState(selectedAnswer === correctAnswer);
  const [isQuestionAttempted, setIsQuestionAttempted] = useState(false);
  const [selected, setSelected] = useState(selectedAnswer);

  useEffect(() => {
    setSelected(selectedAnswer);
    setIsCorrectAnswerChosen(selectedAnswer === correctAnswer);
  }, [selectedAnswer, correctAnswer]);

  const handleClick = (option) => {
    setSelected(option);
    const isCorrect = option === correctAnswer;
    setIsQuestionAttempted(true);
    setIsCorrectAnswerChosen(isCorrect);
    handleAnswer(isCorrect, option);
  };
 
  return (
    <div>
      <p style={{ fontSize: '20px', color: 'black'}}>{question}</p>
      <div className={styles.choiceContainer}>
        {options.reduce((acc, option, index) => {
          // For every two options, we create a new array
          if (index % 2 === 0) acc.push(options.slice(index, index + 2));
          return acc;
        }, []).map((optionPair, index) => (
          // Wrap each pair of options in a .choiceRow container
          <div className={styles.choiceRow} key={index}>
            {optionPair.map((option, index) => (
              <button
                className={styles.choiceButton}
                key={index}
                onClick={() => handleClick(option)}
                disabled={isQuestionAttempted}
                style={{
                  margin: '5px',
                  padding: '10px 10px', 
                  backgroundColor: selected === option ? (option === correctAnswer ? 'green' : 'red') : 'white',
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

export default MultipleChoiceQuiz;
