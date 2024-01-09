'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import MultipleChoice from './MultipleChoice';
import TrueFalse from './TrueFalse';
import DragDrop from './DragDrop';
import quizData from './data';

function Quiz() {
  const [userAnswers, setUserAnswers] = useState({});

  const handleAnswer = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <div className={styles.quiz}>Quiz</div>
      {quizData.questions.map((question) => (
        <MultipleChoice
          key={question.id}
          question={question.question}
          options={question.options}
          handleAnswer={(answer) => handleAnswer(question.id, answer)}
        />
      ))}
      {/* <div>
        <p>User's Answers:</p>
        <pre>{JSON.stringify(userAnswers, null, 2)}</pre>
      </div> */}
    </div>
  );
}

export default Quiz;
