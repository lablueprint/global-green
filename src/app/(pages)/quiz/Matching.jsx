import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import LeaderLine from 'react-leader-line';

function Matching({ prompt, options }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [matches, setMatches] = useState([]);

  // checks that there is match and creates a line connection
  const checkForMatch = () => {
    let line;
    if (selectedAnswer && selectedQuestion) {
      line = new LeaderLine(
        document.getElementById(`answer-${selectedAnswer.id}`),
        document.getElementById(`question-${selectedQuestion.id}`),
      );

      line.setOptions({
        color: '#00B353',
        size: 2,
        startPlug: 'disc',
        endPlug: 'disc',
        path: 'straight',
      });

      setMatches((prevMatches) => [...prevMatches,
        {
          answerId: selectedAnswer.id,
          questionId: selectedQuestion.id,
          lineObj: line,
        }]);

      setSelectedAnswer(null);
      setSelectedQuestion(null);
    }
  };

  // checks the answers are correct when submit button is clicked
  const checkAnswers = () => {
    matches.forEach((match) => {
      if (match.answerId === match.questionId) {
        console.log('correct!');
      } else {
        console.log('wrong');
      }
    });
  };

  // checks if option is matched
  const isOptionMatched = (option) => matches.some(
    (match) => match.answerId === option.id || match.questionId === option.id,
  );

  // unmatches the answer and question pair
  const unmatchOption = (option, type) => {
    setMatches((prevMatches) => {
      prevMatches.forEach((match) => {
        if (match[`${type}Id`] === option.id) {
          if (match.lineObj) {
            match.lineObj.remove();
            match.lineObj = null;
          }
        }
      });
      return prevMatches.filter((match) => match[`${type}Id`] !== option.id);
    });
  };

  // handles clicking an answer choice
  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    if (selectedAnswer === option) {
      setSelectedAnswer(null);
      return;
    }
    if (isOptionMatched(option)) {
      unmatchOption(option, 'answer');
    }
    checkForMatch();
  };

  // handles clicking a question choice
  const handleQuestionClick = (option) => {
    setSelectedQuestion(option);
    if (selectedQuestion === option) {
      setSelectedQuestion(null);
      return;
    }
    if (isOptionMatched(option)) {
      unmatchOption(option, 'question');
    }
    checkForMatch();
  };

  // constantly checks for matches
  useEffect(() => {
    checkForMatch();
  }, [selectedAnswer, selectedQuestion, checkForMatch]);

  return (
    <div>
      <p>{prompt}</p>
      <div style={{ display: 'flex' }}>
        <div>
          {options.map((option) => (
            <div
              onClick={() => handleAnswerClick(option)}
              key={`answer-${option.id}`}
              id={`answer-${option.id}`}
              style={{
                margin: '30px',
                padding: '10px 10px',
                border: '1px solid black',
                backgroundColor: matches.some((match) => match.answerId === option.id) ? '#808080' : (selectedAnswer === option ? '#00B353' : 'white'),
              }}
            >
              {option.answer}
            </div>
          ))}
        </div>
        <div>
          {options.map((option) => (
            <div
              key={`question-${option.id}`}
              id={`question-${option.id}`}
              onClick={() => handleQuestionClick(option)}
              style={{
                margin: '30px',
                padding: '10px 10px',
                border: '1px solid black',
                backgroundColor: matches.some((match) => match.questionId === option.id) ? '#808080' : (selectedQuestion === option ? '#00B353' : 'white'),
              }}
            >
              {option.question}
            </div>
          ))}
        </div>
      </div>
      <button onClick={checkAnswers}>SUBMIT</button>
    </div>
  );
}
Matching.propTypes = {
  prompt: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Matching;
