'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import MultipleChoiceQuiz from './MultipleChoice';
import MatchingQuiz from './Matching';
import Quizzes from './data'; // Assuming this is the path to your Quizzes data
import LinearWithValueLabel from './progressBar';
import Results from './results';
import AnswerPopup from './AnswerPopup'; // Renamed for general use

function Quiz() {
  // eslint-disable-next-line no-unused-vars
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [points, setPoints] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [attempted, setAttempted] = useState(false);
  // eslint-disable-next-line max-len
  const [showAnswerPopup, setShowAnswerPopup] = useState(false); // For showing both correct and incorrect popups
  const [popupMessage, setPopupMessage] = useState(''); // To display appropriate message in the popup

  const currentQuiz = Quizzes[currentQuizIndex];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const goToNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < currentQuiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else if (currentQuizIndex < Quizzes.length - 1) {
      setShowResults(true);
    }
    setAttempted(false); // Reset attempt state
  };

  const closePopupAndProceed = () => {
    setShowAnswerPopup(false); // Hide popup
    goToNextQuestion();
  };

  const handleAnswer = (isCorrect, selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));
    setShowAnswerPopup(true); // Show popup for both correct and incorrect answers

    if (isCorrect) {
      setPopupMessage('Correct!');
      // eslint-disable-next-line max-len
      setProgress((prevProgress) => Math.min(prevProgress + (100 / currentQuiz.totalQuestions), 100));
      setPoints((prevPoints) => prevPoints + 1);
    } else {
      setPopupMessage('Incorrect!');
    }
  };

  const checkAnswer = (selectedOption) => {
    const isCorrect = selectedOption === currentQuestion.answer;
    handleAnswer(isCorrect, selectedOption);
  };

  if (showResults) {
    return <Results points={points} totalQuestions={currentQuiz.totalQuestions} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.quizContainer}>
        <LinearWithValueLabel value={progress} />
        <div className={styles.quizQuestionNumber}>
          Question
          {currentQuestionIndex + 1}
          of
          {' '}
          {currentQuiz.totalQuestions}
        </div>
        <div>
          <strong>
            Points:
            {points}
          </strong>
        </div>
        <MultipleChoiceQuiz
          key={currentQuestion.id}
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.answer}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          isAttempted={attempted}
          onCheckAnswer={checkAnswer}
        />
        <div className={styles.buttonsContainer}>
          <button type="button" className={styles.skipButton} onClick={goToNextQuestion}>
            Skip
          </button>
        </div>
      </div>
      {showAnswerPopup && (
        <AnswerPopup
          message={popupMessage}
          onClose={closePopupAndProceed} // Use onClose for both closing and proceeding as needed
        />
      )}
    </div>
  );
}

export default Quiz;
