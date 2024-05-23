import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LeaderLine from 'react-leader-line';
import styles from './page.module.css';

// Utility function to shuffle an array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function Matching({
  question, options, answers, selectedMatches, setSelectedMatches, matchedPairs, setMatchedPairs, isAttempted = false,
}) {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDefinition, setSelectedDefinition] = useState(null);

  useEffect(() => {
    // Shuffle the answers once when the component mounts
    setShuffledAnswers(shuffleArray(answers));
  }, [answers]);

  useEffect(() => {
    if (selectedOption !== null && selectedDefinition !== null && !isAttempted) {
      const updatedMatches = selectedMatches.filter((match) => {
        const isMatchedWithOption = match.option === selectedOption;
        const isMatchedWithDefinition = match.definition === selectedDefinition;

        // If the current match involves either the selected option or definition, remove the line
        if (isMatchedWithOption || isMatchedWithDefinition) {
          match.lineObj.remove(); // Remove the line visually
          return false; // Exclude this match from the updated array
        }

        return true;
      });

      // update the state to reflect the removal of any existing matches
      const updatedPairs = updatedMatches.reduce((acc, { option, definition }) => {
        acc[options[option]] = shuffledAnswers[definition];
        return acc;
      }, {});

      // create a new line and match
      const line = new LeaderLine(
        document.getElementById(`answer-${selectedOption}`),
        document.getElementById(`question-${selectedDefinition}`),
        {
          color: '#6DAAE0',
          size: 3,
          startPlug: 'behind',
          endPlug: 'behind',
          path: 'straight',
        },
      );

      const newMatch = {
        option: selectedOption,
        definition: selectedDefinition,
        lineObj: line,
      };

      updatedPairs[options[selectedOption]] = shuffledAnswers[selectedDefinition];
      setMatchedPairs(updatedPairs);

      setSelectedMatches([...updatedMatches, newMatch]);

      // Reset selections
      setSelectedOption(null);
      setSelectedDefinition(null);
    }
  }, [selectedOption, selectedDefinition, isAttempted, selectedMatches, options, shuffledAnswers, setMatchedPairs]);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const handleDefinitionClick = (index) => {
    setSelectedDefinition(index);
  };

  // function to determine if an item is matched
  const isMatched = (index, type) => Object.keys(matchedPairs).some((key) => (type === 'option' ? key === options[index] : matchedPairs[key] === shuffledAnswers[index]));

  return (
    <div>
      <p className={styles.questionText}>{question}</p>
      <div className={styles.matchingContainer}>
        {options.map((option, index) => (
          <div className={styles.rowContainer} key={`pair-${index}`}>
            <div
              onClick={() => handleOptionClick(index)}
              key={`answer-${index}`}
              id={`answer-${index}`}
              className={`${styles.optionBox} ${selectedOption === index ? styles.selected : ''} ${isMatched(index, 'option') ? styles.matched : ''}`}
              style={{
                outline: isMatched(index, 'option') ? '2px solid green' : '',
              }}
            >
              {option}
            </div>
            <div
              onClick={() => handleDefinitionClick(index)}
              key={`question-${index}`}
              id={`question-${index}`}
              className={`${styles.definitionBox} ${selectedDefinition === index ? styles.selected : ''} ${isMatched(index, 'definition') ? styles.matched : ''}`}
              style={{
                outline: isMatched(index, 'definition') ? '2px solid green' : '',
              }}
            >
              {shuffledAnswers[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Matching.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedMatches: PropTypes.arrayOf(PropTypes.shape({
    option: PropTypes.number.isRequired,
    definition: PropTypes.number.isRequired,
    lineObj: PropTypes.instanceOf(LeaderLine),
  })).isRequired,
  setSelectedMatches: PropTypes.func.isRequired,
  matchedPairs: PropTypes.object.isRequired,
  setMatchedPairs: PropTypes.func.isRequired,
  isAttempted: PropTypes.bool,
};

export default Matching;
