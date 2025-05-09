'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import MultipleChoiceQuiz from './MultipleChoice';
import TrueFalseQuiz from './TrueFalse';
import Matching from './Matching';
import LinearWithValueLabel from './progressBar';
import Results from './results';
import Check from './CheckAllThatApply';
import Loading from '../loading';

function Quiz() {
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
  const [usedHint, setUsedHint] = useState(false);
  const [questionResults, setQuestionResults] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState({});

  // ***IMPORTANT***
  // change Key here to access the different quizzes in mongoDB
  // right now the key is for the quiz corresponding to Course 1 Lesson 1

  const getQuiz = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseKey = urlParams.get('courseKey');
    const stage = urlParams.get('stage');
    const key = `${courseKey}_${stage}`;
    console.log(key);
    const res = await fetch(`/api/quizzes?key=${encodeURIComponent(key)}`);
    const data = await res.json();
    return data.res.questions;
  };

  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getQuiz().then((res) => {
      setCurrentQuiz({ totalQuestions: res.length, questions: res });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (showAnswerPopup) {
      const timeoutId = setTimeout(() => {
        selectedMatches.forEach((match) => {
          if (match.lineObj && typeof match.lineObj.position === 'function') {
            match.lineObj.position();
          }
        });
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [showAnswerPopup, selectedMatches]);

  if (loading) {
    return <Loading />;
    // return <div>Loading...</div>;
  }

  if (!currentQuiz) {
    return <div>No quiz data available.</div>;
  }
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
            options={question.options}
            answers={question.answer}
            selectedMatches={selectedMatches}
            setSelectedMatches={setSelectedMatches}
            matchedPairs={matchedPairs}
            setMatchedPairs={setMatchedPairs}
            isAttempted={attempted}
          />
        );
      case 'checkbox':
      case 'selectall':
        return (
          <Check
            question={question.question}
            options={question.options}
            selectedAnswers={
              Array.isArray(selectedOption) ? selectedOption : []
            }
            onUpdateAnswer={setSelectedOption}
          />
        );
      default:
        return <div>Question type not supported</div>;
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowHint(false);
    }
  };

  const handleHint = () => {
    if (currentQuestion.hint) {
      setPopupMessage(currentQuestion.hint);
      setShowHint(true);
      setUsedHint(true);
    }
    // setPopupMessage(currentQuestion.hint || 'This is a hint for the question.');
    // setShowHint(true);
  };

  const goToNextQuestion = () => {
    setIsCurrentAnswerCorrect(null);
    setShowCheckButton(true);
    if (currentQuestion.type === 'matching') {
      selectedMatches.forEach((match) => match.lineObj.remove());
      setSelectedMatches([]);
    }

    let nextQuestionIndex = -1;

    if (
      currentQuestionIndex + 1 < currentQuiz.questions.length &&
      !selectedAnswers.hasOwnProperty(currentQuestionIndex + 1) &&
      !skippedQuestions.includes(currentQuestionIndex + 1)
    ) {
      nextQuestionIndex = currentQuestionIndex + 1;
    } else {
      for (let i = 0; i < currentQuiz.questions.length; i++) {
        if (
          !selectedAnswers.hasOwnProperty(i) &&
          !skippedQuestions.includes(i)
        ) {
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
    setShowAnswerPopup(true);
    setTotalProgress((prevProgress) =>
      Math.min(prevProgress + 100 / currentQuiz.questions.length, 100)
    );

    const newResult = {
      questionId: currentQuestionIndex,
      isCorrect,
      selectedAnswer: selectedOption,
      correctAnswer: currentQuestion.answer,
      questionText: currentQuiz.questions[currentQuestionIndex].question,
    };

    setQuestionResults([...questionResults, newResult]);

    if (isCorrect) {
      setPopupMessage('Correct!');
      setCorrectProgress((prevProgress) =>
        Math.min(prevProgress + 100 / currentQuiz.questions.length, 100)
      );
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
    goToNextQuestion();
  };

  if (currentQuestion.type === 'matching') {
    console.log(`Matched Pairs: ${matchedPairs}`);
    console.log(`Options${currentQuestion.options}`);
    console.log(`Answers ${currentQuestion.answer}`);
  }

  function transformToMatchedPairs(options, answers) {
    const matchedPairs = {};
    options.forEach((option, index) => {
      matchedPairs[option] = answers[index];
    });
    return matchedPairs;
  }

  // Function to check the selected answer
  const checkAnswer = (selectedOption) => {
    setShowCheckButton(false); // Hide the Check button
    if (currentQuestion.type === 'matching') {
      const correctPairs = transformToMatchedPairs(
        currentQuestion.options,
        currentQuestion.answer
      );

      const isCorrect =
        Object.keys(matchedPairs).length === Object.keys(correctPairs).length &&
        Object.keys(matchedPairs).every(
          (key) => matchedPairs[key] === correctPairs[key]
        );

      handleAnswer(isCorrect, JSON.stringify(matchedPairs));
      setAttempted(true);
    } else if (currentQuestion.type === 'checkAllThatApply') {
      // Sort to ensure order does not affect comparison
      const sortedSelectedOptions = selectedOption.sort();
      const sortedCorrectAnswers = currentQuestion.answer.sort();
      const isCorrect =
        JSON.stringify(sortedSelectedOptions) ===
        JSON.stringify(sortedCorrectAnswers);
      handleAnswer(isCorrect, sortedSelectedOptions.join(', '));
    } else {
      const isCorrect = selectedOption === currentQuestion.answer;
      handleAnswer(isCorrect, selectedOption);
    }
    setShowCheckButton(false);
  };

  if (showResults) {
    return (
      <Results
        skips={skipCount}
        usedHint={usedHint}
        points={points}
        totalQuestions={currentQuiz.questions.length}
        questionResults={questionResults}
      />
    );
  }

  const urlParams = new URLSearchParams(window.location.search);
  const course = urlParams.get('courseKey');
  const num = urlParams.get('stage');

  return (
    <div className={styles.container}>
      <div className={styles.quizContentContainer}>
        <div className={styles.quizTitleContainer}>
          {num === '6' ? 'Final Quiz' : `Quiz ${num - 1}`}
        </div>
        <div className={styles.progressbarandhintcontainer}>
          <div
            className={styles.xButton}
            onClick={() =>
              router.push(`/lesson?courseKey=${course}&stage=${num}`)
            }
          >
            &#10005;
          </div>
          <LinearWithValueLabel
            value={TotalProgress}
            x={currentQuestionIndex + 1}
            y={currentQuiz.questions.length}
          />
          {num !== '6' ? (
            <button
              type="button"
              className={styles.hintButton}
              onClick={handleHint}
            />
          ) : (
            ''
          )}
          {showHint && (
            <div className={styles.hintOverlay} onClick={handleOverlayClick}>
              <HintPopup
                hintMessage={popupMessage}
                onClose={() => setShowHint(false)}
              />
            </div>
          )}
        </div>
        <div className={styles.questionTypeandPointscontainer}>
          <div
            style={{
              fontSize: '14px',
              padding: '8px 16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor:
                currentQuestion.type === 'matching'
                  ? '#FFE9F0'
                  : currentQuestion.type === 'multiple'
                  ? '#E3F8F1'
                  : currentQuestion.type === 'truefalse'
                  ? '#FFE6C9'
                  : currentQuestion.type === 'checkbox'
                  ? '#EDE2F7'
                  : 'none',
            }}
          >
            {currentQuestion.type === 'matching'
              ? 'Matching'
              : currentQuestion.type === 'multiple'
              ? 'Multiple Choice'
              : currentQuestion.type === 'truefalse'
              ? 'True and False'
              : currentQuestion.type === 'checkbox'
              ? 'Select All'
              : ''}
          </div>
          {/* <div style={{padding: '10px 20px'}}> Previously Skipped </div> */}
          {/* <div style={{padding: '10px 5px'}}> / </div> */}
          <div className={styles.points}>20 points</div>
        </div>
        {/* <div className={styles.quizQuestionNumber}>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</div> */}
        {/* <div><strong>Points: {points}</strong></div> */}
        {renderQuestionComponent(currentQuestion)}
      </div>
      <div
        className={styles.buttonsContainer}
        style={{
          backgroundColor: 'white',
          justifyContent:
            currentQuestionIndex === currentQuiz.questions.length - 1
              ? 'flex-end'
              : 'space-between',
        }}
      >
        {currentQuestionIndex < currentQuiz.questions.length - 1 &&
          !disableSkipButton && (
            <button
              type="button"
              className={styles.skipButton}
              onClick={handleSkip}
              disabled={skipCount >= 3}
            >
              {' '}
              Skip ({3 - skipCount} left)
            </button>
          )}
        {showCheckButton && (
          <button
            type="button"
            className={`${styles.checkButton} ${
              (currentQuestion.type !== 'matching' && selectedOption) ||
              (currentQuestion.type === 'matching' &&
                selectedMatches.length === currentQuestion.options.length)
                ? styles.checkButtonEnabled
                : ''
            }`}
            onClick={() => checkAnswer(selectedOption)}
            disabled={
              currentQuestion.type !== 'matching'
                ? !selectedOption || attempted
                : selectedMatches.length !== currentQuestion.options.length ||
                  attempted
            }
          >
            Check
          </button>
        )}
        {!showCheckButton && <div style={{ height: '43px' }}> hello</div>}
      </div>
      {showAnswerPopup && (
        <AnswerPopup
          message={popupMessage}
          onClose={() => {
            setShowAnswerPopup(false);
            setSkipButton(false);
            goToNextQuestion();
          }}
          isCorrect={isCurrentAnswerCorrect}
          currentQuestion={currentQuestion}
        />
      )}
    </div>
  );
}

function AnswerPopup({ message, onClose, isCorrect, currentQuestion }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: '1',
        width: '100%',
        height: '10rem',
        padding: '0 6.25rem',
        backgroundColor: isCorrect ? '#e0f5d9' : '#fef8e2',
        boxSizing: 'border-box',
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}
    >
      <div
        style={{
          textAlign: 'left',
          flex: 1,
          maxWidth: '300px',
        }}
      >
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '18px',
            color: 'black',
          }}
        >
          {message}
          {isCorrect && (
            <span
              style={{
                fontWeight: 'bold',
                color: '#00B353',
                fontSize: '14px',
                marginLeft: '20px',
              }}
            >
              +10 XP 🎉
            </span>
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
      <button
        type="button"
        className={styles.nextButton}
        onClick={onClose}
        style={{
          padding: '12px 32px',
          width: '160px',
          borderRadius: '40px',
          color: isCorrect ? 'white' : 'black',
          backgroundColor: isCorrect ? '#519546' : '#f8d87c',
          whiteSpace: 'nowrap',
          position: 'relative',
          zIndex: '10',
        }}
      >
        Continue
      </button>
    </div>
  );
}

function HintPopup({ hintMessage, onClose }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '300px',
        maxWidth: '500px',
        borderRadius: '24px',
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        padding: '32px',
      }}
    >
      <div
        style={{
          padding: '50px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            fontSize: '20px',
            color: '#454545',
          }}
          onClick={onClose}
        >
          &#10005;
        </div>
        <div
          style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'flex-start',
          }}
        >
          <Image src="/hint_figure.svg" width={200} height={200} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '14px',
              color: '#454545',
              lineHeight: '1.4',
              justifyContent: 'center',
              alignItems: 'flex-start',
              height: '100%',
              minHeight: '25vh',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '24px',
                marginBottom: '10px',
              }}
            >
              {' '}
              Hint{' '}
            </div>
            <div style={{ textAlign: 'left' }}> {hintMessage} </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
