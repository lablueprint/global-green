'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import MultipleChoiceQuiz from './MultipleChoice'; 
import quizzes from './data'; // Assuming this is the path to your quizzes data
import LinearWithValueLabel from '../quiz/progressBar';


function Quiz() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [points, setPoints] = useState(0);

  const currentQuiz = quizzes[currentQuizIndex];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const handleAnswer = (isCorrect, selectedOption) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption
    }));
    if (isCorrect) {
      setShowNext(true); 
      setProgress(prevProgress => Math.min(prevProgress + (100 / currentQuiz.totalQuestions), 100));
      setPoints(prevPoints => prevPoints + 1);
    }
  };
  
  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < currentQuiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setShowNext(selectedAnswers[nextQuestionIndex] !== undefined);
    } else if (currentQuizIndex < quizzes.length - 1) {
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
    setCurrentQuizIndex(currentQuizIndex + 1);
    setCurrentQuestionIndex(0);
    setProgress(0);
    setShowNext(false);
    setSelectedAnswers({});
    setPoints(0);
  };

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
    <div style={{ textAlign: 'center', margin: '20px 0', justifyContent: 'space-evenly' }}>
      <LinearWithValueLabel value={progress} />
      <div className={styles.quiz}>
        Question {currentQuestionIndex + 1} of {currentQuiz.totalQuestions}
      </div>
      <div>
        <strong>Points: {points}</strong>
      </div>
      <MultipleChoiceQuiz
        key={currentQuestion.id}
        question={currentQuestion.question}
        options={currentQuestion.options}
        correctAnswer={currentQuestion.answer}
        handleAnswer={handleAnswer}
        selectedAnswer={selectedAnswers[currentQuestionIndex]}
        disabled={showNext !== undefined}
      />
      <div className={styles.container}>
        {currentQuestionIndex > 0 && (
          <button className={styles.backButton} onClick={handlePreviousQuestion}>Back</button>
        )}
        {showNext && (
          <button className={styles.nextButton} onClick={handleNextQuestion}>Next</button>
        )}
      </div>
      <div>
        {currentQuizIndex > 0 && (
          <button onClick={handlePreviousQuiz}>Previous Quiz</button>
        )}
        {currentQuizIndex < quizzes.length - 1 && (
          <button onClick={handleNextQuiz}>Next Quiz</button>
        )}
      </div>
    </div>
  );
}

export default Quiz;



