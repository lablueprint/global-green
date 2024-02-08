'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import MultipleChoiceQuiz from './MultipleChoice';
import MatchingQuiz from './Matching';
import Quizzes from './data'; // Assuming this is the path to your Quizzes data
import LinearWithValueLabel from './progressBar';
import Results from './results';

function Quiz() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [points, setPoints] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuiz = Quizzes[currentQuizIndex];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const handleAnswer = (isCorrect, selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }
    ));
    setShowNext(true);
    if (isCorrect) {
      setProgress((prevProgress) => Math.min(prevProgress + (100 / currentQuiz.totalQuestions), 100));
      setPoints((prevPoints) => prevPoints + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < currentQuiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setShowNext(selectedAnswers[nextQuestionIndex] !== undefined);
    } else if (currentQuizIndex < Quizzes.length - 1) {
      handleNextQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    const previousQuestionIndex = currentQuestionIndex - 1;
    if (previousQuestionIndex >= 0) {
      setCurrentQuestionIndex(previousQuestionIndex);
      setShowNext(selectedAnswers[previousQuestionIndex] !== undefined);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < Quizzes.length - 1) {
      setShowResults(true); // Show results instead of next quiz
    } else {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setCurrentQuestionIndex(0);
      setProgress(0);
      setShowNext(false);
      setSelectedAnswers({});
      setPoints(0);
    }
  };

  if (showResults) {
    return <Results points={points} totalQuestions={currentQuiz.totalQuestions} />;
  }

  const handlePreviousQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
      setCurrentQuestionIndex(0);
      setProgress(0);
      setShowNext(false);
      setSelectedAnswers({});
      setPoints(0);
    }
  };

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
          {' '}
          {currentQuiz.totalQuestions}
        </div>
        <div>
          <strong>
            Points:
            {points}
          </strong>
        </div>
        {/* <MultipleChoiceQuiz
          key={currentQuestion.id}
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.answer}
          handleAnswer={handleAnswer}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
        /> */}
        <MatchingQuiz
          key={currentQuestion.id}
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.answer}
          handleAnswer={handleAnswer}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
        />
        <div className={currentQuestionIndex > 0 ? styles.buttonsContainerWithBack : styles.buttonsContainer}>
          {currentQuestionIndex > 0 && (
            <button className={styles.backButton} onClick={handlePreviousQuestion}>
              Back
            </button>
          )}
          {showNext && (
            <button className={styles.nextButton} onClick={handleNextQuestion}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
