import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

function MultipleChoiceQuiz({
  question, options, correctAnswer, handleAnswer, selectedAnswer
}) {
  // Initialize 'isCorrectAnswerChosen' based on whether 'selectedAnswer' is correct
  const [isCorrectAnswerChosen, setIsCorrectAnswerChosen] = useState(selectedAnswer === correctAnswer);
  const [isQuestionAttmped, setIsQuestionAttemped] = useState(false)
  const [selected, setSelected] = useState(selectedAnswer);

  useEffect(() => {
    setSelected(selectedAnswer);
    // Update 'isCorrectAnswerChosen' if 'selectedAnswer' changes
    setIsCorrectAnswerChosen(selectedAnswer === correctAnswer);
  }, [selectedAnswer]);

  const handleClick = (option) => {
    setSelected(option);
    const isCorrect = option === correctAnswer;
    setIsQuestionAttemped(true)
    setIsCorrectAnswerChosen(isCorrect);
    handleAnswer(isCorrect, option);
  };

  return (
    <div>
      <p>{question}</p>
      {options.map((option, index) => (
        <button className = {styles.choiceButton}
          key={index}
          onClick={() => handleClick(option)}
          disabled = {isQuestionAttmped}
          style={{
            margin: '5px',
            padding: '10px 10px',
            backgroundColor: selected === option ? (option === correctAnswer ? '#00B353' : '#FF474C') : 'white',
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default MultipleChoiceQuiz;
