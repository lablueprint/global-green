'use client'

// Import necessary React components and styles
import React, { useState } from 'react';
import styles from './page.module.css';
import MultipleChoiceQuiz from './MultipleChoice';
import TrueFalseQuiz from './TrueFalse';
import Matching from './Matching'
import Quizzes from './data';
import LinearWithValueLabel from './progressBar';
import Results from './results';
// import AnswerPopup from './AnswerPopup';

function Quiz() {
  // State hooks for quiz functionality
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [TotalProgress, setTotalProgress] = useState(0);
  const [CorrectProgress, setCorrectProgress] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [points, setPoints] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [showAnswerPopup, setShowAnswerPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [disableSkipButton, setSkipButton] = useState(false);
  const [selectedMatches, setSelectedMatches] = useState([]);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [showCheckButton, setShowCheckButton] = useState(true)

  const currentQuiz = Quizzes;
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const renderQuestionComponent = (question) => {
    switch (question.type) {
      case 'multiple':
        return <MultipleChoiceQuiz
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedAnswer={selectedOption}
        isAttempted={attempted}
        onOptionSelect={setSelectedOption} 
      />
      case 'truefalse':
        return <TrueFalseQuiz 
        question={question.question} 
        options={question.options} 
        selectedAnswer={selectedOption} 
        isAttempted={attempted} 
        onOptionSelect={setSelectedOption} />;
      case 'matching':
        return <Matching 
        terms={question.terms} 
        selectedMatches={selectedMatches} 
        setSelectedMatches={setSelectedMatches} 
        isAttempted={attempted}
        />;
      default:
        return <div>Question type not supported</div>;
    }
  };

  function AnswerPopup({ message, onClose }) {
    return (
      <>
          <div>{message}</div>
          <div> 
            <button type="button" className={styles.nextButton}  onClick={onClose}>
              next
            </button>
          </div>
      </>
  
    );
  }

  function HintPopup({ message, onClose }) {
    return (
      <div className={styles.hintPopup}>
        <div className={styles.hintContent}>{message}<button type="button" onClick={onClose}>Close</button></div>
      </div>
    );
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowHint(false); 
    }
  };

  const handleHint = () => {
    setPopupMessage(currentQuestion.hint || 'This i s a hint for the question.');
    setShowHint(true); 
  };

  const goToNextQuestion = () => {
    setShowCheckButton(true); 
    if (currentQuestion.type === 'matching') {
      console.log(selectedMatches)
      selectedMatches.forEach(match => match.lineObj.remove());
      setSelectedMatches([]); 
    }


    let nextQuestionIndex = -1;
  
    if (currentQuestionIndex + 1 < currentQuiz.questions.length && !selectedAnswers.hasOwnProperty(currentQuestionIndex + 1) && !skippedQuestions.includes(currentQuestionIndex + 1)) {
      nextQuestionIndex = currentQuestionIndex + 1;
    } else {
      for (let i = 0; i < currentQuiz.questions.length; i++) {
        if (!selectedAnswers.hasOwnProperty(i) && !skippedQuestions.includes(i)) {
          nextQuestionIndex = i;
          break;
        }
      }
  
      if (nextQuestionIndex === -1 && skippedQuestions.length > 0) {
        nextQuestionIndex = skippedQuestions.shift();
      }
    }
  
    if (nextQuestionIndex !== -1) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setAttempted(false);
      setShowAnswerPopup(false);
      setPopupMessage('');
      setSelectedOption('');
      setSkipButton(false);
    } else {
      setShowResults(true);
    }
  };
  
  // Function to handle correct or incorrect answers
  const handleAnswer = (isCorrect, selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));
    setShowAnswerPopup(true); // Show answer feedback popup
    setTotalProgress((prevProgress) => Math.min(prevProgress + (100 / currentQuiz.questions.length), 100));

    if (isCorrect) {
      setPopupMessage('Correct!');
      setCorrectProgress((prevProgress) => Math.min(prevProgress + (100 / currentQuiz.questions.length), 100));
      setPoints((prevPoints) => prevPoints + 1);
    } else {
      setPopupMessage('Incorrect!');
      // setProgress((prevProgress) => Math.min(prevProgress + (100 / currentQuiz.questions.length), 100));
      // setPoints((prevPoints) => prevPoints + 1);
    }
    setAttempted(true); // Mark the question as attempted
    setSkipButton(true); // Disable the Skip button when an answer is checked
  };

  const handleSkip = () => {
    // Add the current question to the skippedQuestions array if not already added
    if (!skippedQuestions.includes(currentQuestionIndex)) {
        setSkippedQuestions([...skippedQuestions, currentQuestionIndex]);
    }
    goToNextQuestion();
};


// Function to check the selected answer
const checkAnswer = (selectedOption) => {
  setShowCheckButton(false); // Hide the Check button
  if (currentQuestion.type === 'matching') {
      console.log(selectedMatches)
      // console.log(currentQuestion.terms)

      //good
      // console.log(selectedMatches.length)
      // console.log(currentQuestion.terms.length)

      // console.log(selectedMatches.every(match => currentQuestion.terms.find(term => term.term === match.term && term.definition === match.definition)))

      
      const isCorrect = selectedMatches.length === currentQuestion.terms.length &&
      selectedMatches.every(match => 
        currentQuestion.terms[match.term].definition === currentQuestion.answer[match.definition]
      );


    handleAnswer(isCorrect, selectedMatches.map(match => match.term).join(', '));
    setAttempted(true);
    // setSelectedMatches([]); // Reset for next question
  } else {
    console.log(currentQuestion.answer)
    console.log(selectedOption)
    const isCorrect = selectedOption === currentQuestion.answer;
    handleAnswer(isCorrect, selectedOption);
  }
}
  // Render the results component if the quiz is finished
  if (showResults) {
    return <Results points={points} totalQuestions={currentQuiz.questions.length} />;
  }

  // Main Quiz component rendering
  return (
    <div className={styles.container}>
      <div className={styles.quizContainer}>
        <div className={styles.progressbarandhintcontainer}>
          <LinearWithValueLabel value={TotalProgress} />
          <button type="button" className={styles.hintButton} onClick={handleHint}></button>
          {showHint && (
            <div className={styles.hintOverlay} onClick={handleOverlayClick}>
              <HintPopup message={popupMessage} onClose={() => setShowHint(false)} />
            </div>
          )}
        </div>
        {/* <div className={styles.quizQuestionNumber}>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</div> */}
        {/* <div><strong>Points: {points}</strong></div> */}
        {renderQuestionComponent(currentQuestion)}
        <div className={styles.buttonsContainer}>
        {
          currentQuestionIndex < currentQuiz.questions.length - 1 && !disableSkipButton && (
            <button type="button" className={styles.skipButton} onClick={handleSkip}>Skip</button>
          )
        }          
            <button 
              type="button" 
              className={`${styles.checkButton} ${
                (currentQuestion.type !== 'matching' && selectedOption) ||
                (currentQuestion.type === 'matching' && selectedMatches.length === currentQuestion.terms.length) ? 
                styles.checkButtonEnabled : ''}`}
              onClick={() => checkAnswer(selectedOption)}
              disabled={currentQuestion.type !== 'matching' ? !selectedOption || attempted 
              : selectedMatches.length !== currentQuestion.terms.length || attempted}>
              Check
            </button>
          {showAnswerPopup && <AnswerPopup message={popupMessage} onClose={() => { setShowAnswerPopup(false); setSkipButton(false); goToNextQuestion(); }} />}
        </div>
      </div>
    </div>
  );
}

export default Quiz;