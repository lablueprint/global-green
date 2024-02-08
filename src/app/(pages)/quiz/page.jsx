'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import MultipleChoice from './MultipleChoice';
import Quizzes from './data'; // Assuming this is the path to your Quizzes data
import LinearWithValueLabel from './progressBar';
import Results from './results';

function Quiz() {
  // may need setCurrentQuizIndex function in the future
  // eslint-disable-next-line no-unused-vars
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [points, setPoints] = useState(0);
  const [showResults, setShowResults] = useState(false);
  // eslint-disable-next-line max-len
  const [attempted, setAttempted] = useState(false); // New state to track if a question has been attempted

  const currentQuiz = Quizzes[currentQuizIndex];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const goToNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < currentQuiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else if (currentQuizIndex < Quizzes.length - 1) {
      setShowResults(true);
      // setCurrentQuizIndex(currentQuizIndex + 1);
      // setCurrentQuestionIndex(0);
      // setProgress(0);
    }
    setAttempted(false); // Reset attempt state
  };

  const handleAnswer = (isCorrect, selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));
    if (isCorrect) {
      // eslint-disable-next-line max-len
      setProgress((prevProgress) => Math.min(prevProgress + (100 / currentQuiz.totalQuestions), 100));
      setPoints((prevPoints) => prevPoints + 1);
      goToNextQuestion();
    } else {
      // Mark as attempted but incorrect
      setAttempted(true);
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
          {' '}
          {currentQuestionIndex + 1}
          {' '}
          of
          {currentQuiz.totalQuestions}
        </div>
        <div>
          <strong>
            Points:
            {points}
          </strong>
        </div>
        <MultipleChoice
          key={currentQuestion.id}
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.answer}
          // eslint-disable-next-line max-len
          handleAnswer={handleAnswer} // This might be kept for legacy reasons but won't be used directly for checking answers anymore
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          isAttempted={attempted}
          onCheckAnswer={checkAnswer} // Pass the checkAnswer function here
        />
        <div className={styles.buttonsContainer}>
          <button type="button" className={styles.skipButton} onClick={goToNextQuestion}>
            Skip
          </button>
          {!attempted && (
            <button type="button" className={styles.checkButton} onClick={() => setAttempted(true)}>
              Check
            </button>
          )}
          {attempted && (
            <button type="button" className={styles.tryAgainButton} onClick={() => setAttempted(false)}>
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
