import React, { useState } from 'react';

function TrueFalse({
  question, options, correctAnswer, handleAnswer,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleClick = (option) => {
    setSelectedAnswer(option);
    handleAnswer(option === correctAnswer);
  };

  return (
    <div>
      <p>{question}</p>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleClick(option)}
          style={{
            margin: '5px',
            padding: '10px 10px',
            backgroundColor: selectedAnswer === option ? (option === correctAnswer ? '#00B353 ' : '#FF474C') : 'white',
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default TrueFalse;
