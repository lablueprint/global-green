'use client'

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
  
  const currentQuiz = Quizzes;
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  console.log(Quizzes)
  console.log(currentQuestion)

  const renderQuestionComponent = (question) => {
    switch (question.type) {
      case 'multiple':
        return (
          <MultipleChoiceQuiz
            question={question.question}
            options={question.options}
            selectedAnswer={selectedOption}
            isAttempted={attempted}
            onOptionSelect={setSelectedOption}
          />
        );
      case 'truefalse':
        return (
          <TrueFalseQuiz
            question={question.question}
            options={question.options}
            selectedAnswer={selectedOption}
            isAttempted={attempted}
            onOptionSelect={setSelectedOption}
          />
        );
      case 'select':
        return (
          <MatchingQuiz
            prompt={question.prompt}
            options={question.options}
          />
        );
      default:
        return <div>Question type not supported</div>;
    }
  };
  

  function HintPopup({ message, onClose }) {
    return (
      <div className={styles.hintPopup}>
        <div className={styles.hintContent}>
          {message}
          <button type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  const closeHintPopup = () => {
    setShowHint(false); // Hide the hint popup
  };

  // This function is called when the overlay is clicked
  const handleOverlayClick = (event) => {
    // If the clicked element is not the popup box itself,
    // and not any of its descendants, then close the popup
    if (event.target === event.currentTarget) {
      closeHintPopup();
    }
  };

  const handleHint = () => {
    // You can set a specific message for the hint or use the current question's hint
    setPopupMessage(currentQuestion.hint || 'This is a hint for the question.');
    setShowHint(true); // Show the hint popup
  };

  const goToNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < currentQuiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else if (currentQuizIndex < Quizzes.length - 1) {
      // Move to next quiz or show results
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
      setCurrentQuestionIndex(0); // Reset for next quiz
    } else {
      setShowResults(true); // End of all quizzes
    }
    setSelectedOption(''); // Reset selected option for next question
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
    setShowAnswerPopup(true); // Show popup

    if (isCorrect) {
      setPopupMessage('Correct!');
      setProgress((prevProgress) => Math.min(prevProgress + (100 / currentQuiz.questions.length), 100));
      setPoints((prevPoints) => prevPoints + 1);
    } else {
      setPopupMessage('Incorrect!');
    }
    setAttempted(true); // Mark as attempted
  };

  const checkAnswer = (selectedOption) => {
    const isCorrect = selectedOption === currentQuestion.answer;
    handleAnswer(isCorrect, selectedOption);
  };

  // Rendering the results component if quiz is finished
  if (showResults) {
    return <Results points={points} totalQuestions={currentQuiz.questions.length} />;
  }

  // Main Quiz component render
  return (
    <div className={styles.container}>
      <div className={styles.quizContainer}>
        <div className={styles.progressbarandhintcontainer}>
        <LinearWithValueLabel value={progress} />
        <button type="button" onClick={handleHint}>Hint</button>
    {showHint && (
      <div className={styles.hintOverlay} onClick={handleOverlayClick}>
        <div className={styles.hintPopup}>
        <div className={styles.hintContent}>
            <div className={styles.hintContentColumns}>
              <div>Hint</div>
            </div>
            <div className={styles.hintContentColumns}>
              <div> wehfuwehfuwe9fhweu uhwefweiuhfweuifhweiufhwe ihwefui hwefiuwehfwieufhwiu ehweiufhwuifhweifuh</div>
            </div>
          </div>
          <button 
            className={styles.closeButton} 
            onClick={closeHintPopup}
          >
          </button>
        </div>
      </div>
        )}
        </div>
        <div className={styles.quizQuestionNumber}>
          Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
        </div>
        <div><strong>Points: {points}</strong></div>
        {renderQuestionComponent(currentQuestion)}
        <div className={styles.buttonsContainer}>
          <button
            type="button"
            className={styles.skipButton}
            onClick={goToNextQuestion}
          >
            Skip
          </button>
          <button
            type="button"
            className={styles.checkButton}
            onClick={() => checkAnswer(selectedOption)}
            disabled={!selectedOption || attempted}
          >
            Check
          </button>
                  {showAnswerPopup && (
                <AnswerPopup
                  message={popupMessage}
                  onClose={closePopupAndProceed}
                />
              )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
