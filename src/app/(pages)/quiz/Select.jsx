import Draggable from 'react-draggable';
import React, { useState, useEffect } from 'react';

export default function Select({ prompt, options }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [matches, setMatches] = useState([]);

  const handleAnswerClick = (option, index) => {
    setSelectedAnswer(option);
    checkForMatch();
  };

  const handleQuestionClick = (option, index) => {
    setSelectedQuestion(option);
    checkForMatch();
  };

  const checkForMatch = () => {
    if (selectedAnswer && selectedQuestion) {
      if (selectedAnswer.id === selectedQuestion.id) {
        console.log(selectedAnswer);
        console.log(selectedQuestion);
        setMatches((prevMatches) => [...prevMatches, { answer: selectedAnswer, question: selectedQuestion }]);
        setSelectedAnswer(null);
        setSelectedQuestion(null);
      }
    }
  };

  return (
    <div>
      <p>{prompt}</p>
      <div style={{ display: 'flex' }}>
        <div>
          {options.map((option, index) => (
            <div
              onClick={() => handleAnswerClick(option, index)}
              key={index}
              style={{
                margin: '5px',
                padding: '10px 10px',
                border: '1px solid black',
                backgroundColor: selectedAnswer === option ? '#00B353 ' : 'white',
              }}
            >
              {option.answer}
            </div>
          ))}
        </div>
        <div>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleQuestionClick(option, index)}
              style={{
                margin: '5px',
                padding: '10px 10px',
                border: '1px solid black',
                backgroundColor: selectedQuestion === option ? '#00B353 ' : 'white',
              }}
            >
              {option.question}
            </div>
          ))}
        </div>
      </div>
      <button>
        SUBMIT
      </button>
    </div>
  );
}
