'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import MultipleChoice from './MultipleChoice';
import TrueFalse from './TrueFalse';
import Select from './Select';
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
      {/* <div className={styles.quiz}>Quiz</div> */}
      {quizData.questions.map((question) => (
        question.type === 'select'
          ? (
            <Select
              key={question.id}
              prompt={question.prompt}
              options={question.options}
            />

          ) : ''
      //  (
        //   <MultipleChoice
        //     key={question.id}
        //     question={question.question}
        //     options={question.options}
        //     correctAnswer={question.answer}
        //     handleAnswer={(isCorrect) => handleAnswer(question.id, isCorrect)}
        //   />
        // )
      ))}
    </div>
  );
}

export default Quiz;
