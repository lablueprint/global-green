'use client'

// Import necessary React components and styles
import React, { useState } from 'react';
import styles from './page.module.css';
import MultipleChoiceQuiz from './MultipleChoice';
import TrueFalseQuiz from './TrueFalse';
import MatchingQuiz from './Matching';
import Quizzes from './data';
import LinearWithValueLabel from './progressBar';
import Results from './results';
import AnswerPopup from './AnswerPopup';

function Quiz() {
  // State hooks for quiz functionality
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [points, setPoints] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [showAnswerPopup, setShowAnswerPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [disableSkipButton, setSkipButton] = useState(false); // Initially Skip button is enabled

  const currentQuiz = Quizzes;
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  // Function to render the appropriate question component based on question type
  const renderQuestionComponent = (question) => {
    switch (question.type) {
      case 'multiple':
        return <MultipleChoiceQuiz question={question.question} options={question.options} selectedAnswer={selectedOption} isAttempted={attempted} onOptionSelect={setSelectedOption} />;
      case 'truefalse':
        return <TrueFalseQuiz question={question.question} options={question.options} selectedAnswer={selectedOption} isAttempted={attempted} onOptionSelect={setSelectedOption} />;
      case 'select':
        return <MatchingQuiz prompt={question.prompt} options={question.options} />;
      default:
        return <div>Question type not supported</div>;
    }
  };

  // Functions for hint popup management
  function HintPopup({ message, onClose }) {
    return (
      <div className={styles.hintPopup}>
        <div className={styles.hintContent}>{message}<button type="button" onClick={onClose}>Close</button></div>
      </div>
    );
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowHint(false); // Close hint popup if overlay is clicked
    }
  };

  const handleHint = () => {
    setPopupMessage(currentQuestion.hint || 'This is a hint for the question.');
    setShowHint(true); // Display the hint popup
  };

  // Function to proceed to the next question or quiz
  const goToNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < currentQuiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else if (currentQuizIndex < Quizzes.length - 1) {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
      setCurrentQuestionIndex(0); // Start at the first question of the next quiz
    } else {
      setShowResults(true); // Show results if all quizzes are completed
    }
    setSelectedOption(''); // Reset selected option for the next question
    setAttempted(false); // Reset attempt state
    setSkipButton(false); // Re-enable the Skip button
  };

  // Function to handle correct or incorrect answers
  const handleAnswer = (isCorrect, selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));
    setShowAnswerPopup(true); // Show answer feedback popup

    if (isCorrect) {
      setPopupMessage('Correct!');
      setProgress((prevProgress) => Math.min(prevProgress + (100 / currentQuiz.questions.length), 100));
      setPoints((prevPoints) => prevPoints + 1);
    } else {
      setPopupMessage('Incorrect!');
    }
    setAttempted(true); // Mark the question as attempted
    setSkipButton(true); // Disable the Skip button when an answer is checked
  };

  // Function to check the selected answer
  const checkAnswer = (selectedOption) => {
    const isCorrect = selectedOption === currentQuestion.answer;
    handleAnswer(isCorrect, selectedOption);
  };

  // Render the results component if the quiz is finished
  if (showResults) {
    return <Results points={points} totalQuestions={currentQuiz.questions.length} />;
  }

  // Main Quiz component rendering
  return (
    <div className={styles.container}>
      <div className={styles.quizContainer}>
        <div className={styles.progressbarandhintcontainer}>
          <LinearWithValueLabel value={progress} />
          <button type="button" onClick={handleHint}>Hint</button>
          {showHint && (
            <div className={styles.hintOverlay} onClick={handleOverlayClick}>
              <HintPopup message={popupMessage} onClose={() => setShowHint(false)} />
            </div>
          )}
        </div>
        <div className={styles.quizQuestionNumber}>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</div>
        <div><strong>Points: {points}</strong></div>
        {renderQuestionComponent(currentQuestion)}
        <div className={styles.buttonsContainer}>
          <button type="button" className={styles.skipButton} onClick={goToNextQuestion} disabled={disableSkipButton}>Skip</button>
          <button type="button" className={styles.checkButton} onClick={() => checkAnswer(selectedOption)} disabled={!selectedOption || attempted}>Check</button>
          {showAnswerPopup && <AnswerPopup message={popupMessage} onClose={() => { setShowAnswerPopup(false); setSkipButton(false); goToNextQuestion(); }} />}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
