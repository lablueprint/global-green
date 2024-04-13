'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import MultipleChoiceQuiz from './MultipleChoice';
import TrueFalseQuiz from './TrueFalse';
import Matching from './Matching';
import Quizzes from './data';
import LinearWithValueLabel from './progressBar';
import Results from './results';
import Check from './CheckAllThatApply';

// import AnswerPopup from './AnswerPopup';

function Quiz() {
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
  const [showCheckButton, setShowCheckButton] = useState(true);
  const [isCurrentAnswerCorrect, setIsCurrentAnswerCorrect] = useState(null);
  const [skipCount, setSkipCount] = useState(0);


  const currentQuiz = Quizzes;
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const renderQuestionComponent = (question) => {
    switch (question.type) {
      case 'multiple':
        return (
          <MultipleChoiceQuiz
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedAnswer={selectedOption}
            isAttempted={attempted}
            onOptionSelect={setSelectedOption}
            isCorrect={isCurrentAnswerCorrect}
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
            isCorrect={isCurrentAnswerCorrect}
          />
        );
      case 'matching':
        return (
          <Matching
            question={question.question}
            terms={question.terms}
            selectedMatches={selectedMatches}
            setSelectedMatches={setSelectedMatches}
            isAttempted={attempted}
          />
        );
      case 'checkAllThatApply':
        return (
          <Check
            question={question.question}
            options={question.options}
            selectedAnswers={Array.isArray(selectedOption) ? selectedOption : []}
            onUpdateAnswer={setSelectedOption}
          />
        );
      default:
        return <div>Question type not supported</div>;
    }
  };

  function AnswerPopup({ message, onClose, isCorrect }) {
    return (
      <div style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%', 
        paddingTop: '30px',
        paddingLeft: '75px',
        paddingBottom:'20px',
        backgroundColor: isCurrentAnswerCorrect == null
          ? 'white'
            : isCurrentAnswerCorrect
              ? '#4ECB3A'
              : '#FFD66C'
      }}
      >
        <div style={{ textAlign: 'left', maxWidth: '300px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              color: 'black',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ flexGrow: 1 }}>
              {message}
            </div>
            {isCorrect && ( // This will only render if isCorrect is true
              <div style={{
                fontWeight: 'bold', color: '#00B353', marginLeft: 'auto', marginRight: '30px', fontSize: '14px',
              }}
              >
                +10 XP 🎉
              </div>
            )}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#454545',
            }}
          >
            {currentQuestion.explanation}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className={styles.nextButton}
            onClick={onClose}
            style={{ padding: '8px 16px', marginRight: '80px' }}
          >
            Continue &gt;
          </button>
        </div>
      </div>
    );
  }

  function HintPopup({ hintMessage, onClose }) {
    return (
      <div style={{
        position: 'absolute', // could use fixed here
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '300px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        zIndex: 1000, 
      }}
      >
        <div style={{
          padding: '20px',
          position: 'relative',
        }}
        >
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
              fontSize: '12px',
              color: '#454545',
            }}
            onClick={onClose}
          >
            &#10005;
          </div>
          <div style={{
            display: 'flex', 
            alignItems: 'flex-start', 
          }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column', 
              fontWeight: 'bold',
              fontSize: '18px',
              marginTop: '8px', 
              marginRight: '20px',
            }}
            >
              Hint
            </div>
            <div style={{
              display: 'flex', 
              flexDirection: 'column', 
              fontSize: '12px',
              color: '#454545',
              lineHeight: '1.4', 
            }}
            >
              
              {hintMessage}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowHint(false);
    }
  };

  const handleHint = () => {
    setPopupMessage(currentQuestion.hint || 'This is a hint for the question.');
    setShowHint(true);
  };

  const goToNextQuestion = () => {
    setIsCurrentAnswerCorrect(null);
    setShowCheckButton(true);
    if (currentQuestion.type === 'matching') {
      selectedMatches.forEach((match) => match.lineObj.remove());
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
    setIsCurrentAnswerCorrect(isCorrect);
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
      setPopupMessage('Incorrect');
      // setProgress((prevProgress) => Math.min(prevProgress + (100 / currentQuiz.questions.length), 100));
      // setPoints((prevPoints) => prevPoints + 1);
    }
    setAttempted(true);
    setSkipButton(true);
  };

  const handleSkip = () => {
    // Add the current question to the skippedQuestions array if not already added
    if (!skippedQuestions.includes(currentQuestionIndex)) {
      setSkippedQuestions([...skippedQuestions, currentQuestionIndex]);
    }
    setSkipCount(skipCount + 1);
    goToNextQuestion()
  };

  // Function to check the selected answer
  const checkAnswer = (selectedOption) => {
    setShowCheckButton(false); // Hide the Check button
    if (currentQuestion.type === 'matching') {
      const isCorrect = selectedMatches.length === currentQuestion.terms.length
      && selectedMatches.every((match) => currentQuestion.terms[match.term].definition === currentQuestion.answer[match.definition]);
      handleAnswer(isCorrect, selectedMatches.map((match) => match.term).join(', '));
      setAttempted(true);
    } 
    else if (currentQuestion.type === 'checkAllThatApply') {
      // Sort to ensure order does not affect comparison
      const sortedSelectedOptions = selectedOption.sort();
      const sortedCorrectAnswers = currentQuestion.answer.sort();
      const isCorrect = JSON.stringify(sortedSelectedOptions) === JSON.stringify(sortedCorrectAnswers);
      handleAnswer(isCorrect, sortedSelectedOptions.join(', '));
    }
    else {
      const isCorrect = selectedOption === currentQuestion.answer;
      handleAnswer(isCorrect, selectedOption);
    }
  };

  if (showResults) {
    return <Results points={points} totalQuestions={currentQuiz.questions.length} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.quizContainer}>
        <div className={styles.quizTitleContainer}> Quiz 3: Resin Identification Code</div>
        <div className={styles.progressbarandhintcontainer}>
          <div
            style={{
              position: 'absolute',
              cursor: 'pointer',
              fontSize: '12px',
              color: '#454545',
            }}
            onClick={() => console.log('bye bye')}
          >
            &#10005;
          </div>
          <LinearWithValueLabel
            value={TotalProgress}
            x={currentQuestionIndex + 1}
            y={currentQuiz.questions.length}
          />
          <button type="button" className={styles.hintButton} onClick={handleHint} />
          {showHint && (
            <div className={styles.hintOverlay} onClick={handleOverlayClick}>
              <HintPopup hintMessage={popupMessage} onClose={() => setShowHint(false)} />
            </div>
          )}
        </div>
        <div className={styles.questionTypeandPointscontainer}>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              backgroundColor: 
                currentQuestion.type === 'matching'
                ? '#FFE9F0' // Example pink-red shade
                : currentQuestion.type === 'multiple'
                ? '#E3F8F1' // Example orange shade
                : currentQuestion.type === 'truefalse'
                ? '#FFE6C9' // Example purple shade
                : currentQuestion.type === 'checkAllThatApply'
                ? '#EDE2F7' // Example blue shade
                : 'none',
              // Add any other styles you need for this inner container
            }}
          >
            {currentQuestion.type === 'matching'
              ? 'Matching'
              : currentQuestion.type === 'multiple'
              ? 'Multiple Choice'
              : currentQuestion.type === 'truefalse'
              ? 'True and False'
              : currentQuestion.type === 'checkAllThatApply'
              ? 'Select All'
              : ''}
          </div>
          {/* <div style={{padding: '10px 20px'}}> Previously Skipped </div> */}
          {/* <div style={{padding: '10px 5px'}}> / </div> */}
          <div style={{padding: '10px 15px', paddingRight: '5px'}}> {currentQuestion.points}</div>
          <div style={{padding: '10px 0px'}}> points </div>
        </div>
        {/* <div className={styles.quizQuestionNumber}>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</div> */}
        {/* <div><strong>Points: {points}</strong></div> */}
        {renderQuestionComponent(currentQuestion)}
        <div
          className={styles.buttonsContainer}
          style={{
            backgroundColor: 'white',
            justifyContent: currentQuestionIndex === currentQuiz.questions.length - 1 ? 'flex-end' : 'space-between',
          }}
        >
          {
          currentQuestionIndex < currentQuiz.questions.length - 1 && !disableSkipButton && (
            <button type="button" className={styles.skipButton} onClick={handleSkip} disabled={skipCount >= 3}>   Skip ({3 - skipCount} left)
            </button>
          )
          }
          {showCheckButton && (
          <button
            type="button"
            className={`${styles.checkButton} ${
              (currentQuestion.type !== 'matching' && selectedOption)
              || (currentQuestion.type === 'matching' && selectedMatches.length === currentQuestion.terms.length)
                ? styles.checkButtonEnabled : ''}`}
            onClick={() => checkAnswer(selectedOption)}
            disabled={currentQuestion.type !== 'matching' ? !selectedOption || attempted
              : selectedMatches.length !== currentQuestion.terms.length || attempted}
          >
            Check
          </button>
          )}
        </div>
        
      </div> 
      {showAnswerPopup
          && (
            <AnswerPopup
              message={popupMessage}
              onClose={() => { setShowAnswerPopup(false); setSkipButton(false); goToNextQuestion(); }}
              isCorrect={isCurrentAnswerCorrect}
            />
          )} 
    </div>
  );
}

export default Quiz;
