'use client'

// Assuming React and necessary hooks are already imported
import React, { useState } from 'react';
import styles from './page.module.css'; // Path to your CSS module
import MultipleChoiceQuiz from './MultipleChoice'; // Adjust the import path as necessary
// Import other quiz types as needed, like MatchingQuiz
import Quizzes from './data'; // Assuming this is the path to your quizzes data
import LinearWithValueLabel from './progressBar'; // Your progress bar component
import Results from './results'; // Your results component
import AnswerPopup from './AnswerPopup'; // Popup component for correct/incorrect answers

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
  const [selectedOption, setSelectedOption] = useState(''); // State to store selected option
  const [showHint, setShowHint] = useState(false); // State to control hint popup visibility


  const currentQuiz = Quizzes[currentQuizIndex];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

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
              {/* Column 2 content */}
              <div> wehfuwehfuwe9fhweu uhwefweiuhfweuifhweiufhwe ihwefui hwefiuwehfwieufhwiu ehweiufhwuifhweifuh</div>
              {/* ... Add more items as needed */}
            </div>
            {/* ... Add more columns as needed */}
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
        <MultipleChoiceQuiz
          key={currentQuestion.id}
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedAnswer={selectedOption}
          isAttempted={attempted}
          onOptionSelect={setSelectedOption} // Function to update selectedOption state
        />
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
